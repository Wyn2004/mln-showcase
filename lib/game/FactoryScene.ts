import * as Phaser from "phaser";

import { calculateGameOutputs, GameLevel } from "./gameLogic";

export interface GameData {
    workers: number;
    productivity: number;
    constantCapital: number;
    variableCapital: number;
    workRatio: number;
    timeRemaining: number;
    targetSurplus: number;
    targetRate?: number;
    accumulatedSurplus: number; // NEW: Tích lũy thặng dư theo thời gian
    accumulatedOutput: number; // NEW: Tích lũy sản lượng
}

export class FactoryScene extends Phaser.Scene {
    private workers: Phaser.GameObjects.Sprite[] = [];
    private machines: Phaser.GameObjects.Rectangle[] = [];
    private productionParticles: Phaser.GameObjects.Particles.ParticleEmitter[] =
        [];
    private gameData: GameData;
    private timerText?: Phaser.GameObjects.Text;
    private statsText?: Phaser.GameObjects.Text;
    private progressBar?: Phaser.GameObjects.Graphics;
    private onUpdate?: (data: GameData) => void;
    private onGameEnd?: () => void;
    private conveyor?: Phaser.GameObjects.Graphics;
    private conveyorOffset: number = 0;
    private products: Phaser.GameObjects.Rectangle[] = [];
    private productionTimer: number = 0;

    // NEW: Game features
    private randomEventTimer: number = 0;
    private activeEvent?: {
        type: "accident" | "strike" | "bonus" | "maintenance";
        duration: number;
        effect: number;
        message: string;
    };
    private eventText?: Phaser.GameObjects.Text;
    private upgradeButtons: Phaser.GameObjects.Rectangle[] = [];
    private availableUpgrades: Array<{
        id: string;
        name: string;
        cost: number;
        effect: () => void;
        x: number;
        y: number;
    }> = [];

    constructor() {
        // Use a distinct runtime key to avoid colliding with the temporary
        // bootstrap scene (which uses the key 'FactoryScene' in the Game config).
        // The scene will be added under the 'Factory' key by the bootstrapper.
        super({ key: "Factory" });
        this.gameData = {
            workers: 3,
            productivity: 1,
            constantCapital: 100,
            variableCapital: 100,
            workRatio: 0.8,
            timeRemaining: 120,
            targetSurplus: 100,
            accumulatedSurplus: 0,
            accumulatedOutput: 0,
        };
    }

    init(data: {
        gameData: GameData;
        onUpdate?: (data: GameData) => void;
        onGameEnd?: () => void;
    }) {
        this.gameData = data.gameData;
        this.onUpdate = data.onUpdate;
        this.onGameEnd = data.onGameEnd;
    }

    create() {
        const { width, height } = this.cameras.main;

        // Background
        this.add.rectangle(0, 0, width, height, 0x1a1a2e).setOrigin(0);

        // Factory floor
        this.add.rectangle(0, height - 100, width, 100, 0x2d2d44).setOrigin(0);

        // Create conveyor belt
        this.createConveyorBelt();

        // Create machines (3 machines)
        this.createMachines();

        // Create worker pool
        this.createWorkerPool();

        // Create UI
        this.createUI();

        // Start timer
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        });

        // Production animation
        this.time.addEvent({
            delay: 100,
            callback: this.updateProduction,
            callbackScope: this,
            loop: true,
        });

        // Random events timer (every 20-40 seconds)
        this.time.addEvent({
            delay: 1000,
            callback: this.updateRandomEvents,
            callbackScope: this,
            loop: true,
        });

        // Create upgrade shop
        this.createUpgradeShop();
    }

    private createUpgradeShop() {
        const { width, height } = this.cameras.main;
        const shopY = height - 50;

        // Background for upgrade shop
        const shopBg = this.add.rectangle(
            width - 80,
            shopY,
            160,
            80,
            0x2d2d44,
            0.9
        );
        shopBg.setStrokeStyle(2, 0xffd700);

        this.add
            .text(width - 85, shopY - 30, "🏪 NÂNG CẤP", {
                fontSize: "14px",
                color: "#ffd700",
                fontStyle: "bold",
            })
            .setOrigin(0.5);

        // Upgrade buttons
        this.availableUpgrades = [
            {
                id: "speed",
                name: "⚡ +0.5 Năng suất",
                cost: 50,
                effect: () => {
                    this.gameData.productivity = Math.min(
                        this.gameData.productivity + 0.5,
                        5
                    );
                    this.updateGameData();
                },
                x: width - 130,
                y: shopY,
            },
            {
                id: "workers",
                name: "👷 +1 Công nhân",
                cost: 100,
                effect: () => {
                    if (this.workers.length < 15) {
                        this.addNewWorker();
                        // Update gameData.workers is handled in addNewWorker
                    }
                },
                x: width - 80,
                y: shopY,
            },
            {
                id: "capital",
                name: "💰 +20 Vốn",
                cost: 80,
                effect: () => {
                    this.gameData.variableCapital += 20;
                    this.gameData.constantCapital += 20;
                    this.updateGameData();
                },
                x: width - 30,
                y: shopY,
            },
        ];

        this.availableUpgrades.forEach((upgrade, index) => {
            const button = this.add.rectangle(
                upgrade.x,
                upgrade.y + 15,
                40,
                25,
                0x00aa00
            );
            button.setStrokeStyle(2, 0xffffff);
            button.setInteractive({ useHandCursor: true });
            button.setData("upgrade", upgrade);

            const buttonText = this.add
                .text(upgrade.x, upgrade.y + 15, `${upgrade.cost}💰`, {
                    fontSize: "11px",
                    color: "#ffffff",
                    fontStyle: "bold",
                })
                .setOrigin(0.5);

            button.on("pointerover", () => {
                button.setFillStyle(0x00ff00);
                button.setScale(1.1);
            });
            button.on("pointerout", () => {
                button.setFillStyle(0x00aa00);
                button.setScale(1);
            });
            button.on("pointerdown", () => {
                this.purchaseUpgrade(upgrade, button, buttonText);
            });

            this.upgradeButtons.push(button);
        });
    }

    private purchaseUpgrade(
        upgrade: (typeof this.availableUpgrades)[0],
        button: Phaser.GameObjects.Rectangle,
        buttonText: Phaser.GameObjects.Text
    ) {
        if (this.gameData.accumulatedSurplus >= upgrade.cost) {
            this.gameData.accumulatedOutput -= upgrade.cost; // Deduct from accumulated
            this.gameData.accumulatedSurplus -= upgrade.cost;
            upgrade.effect();

            // Visual feedback
            this.tweens.add({
                targets: button,
                scaleX: 1.3,
                scaleY: 1.3,
                duration: 100,
                yoyo: true,
            });

            // Show success message
            const msg = this.add
                .text(button.x, button.y - 30, "✓", {
                    fontSize: "20px",
                    color: "#00ff00",
                })
                .setOrigin(0.5);
            this.tweens.add({
                targets: msg,
                alpha: 0,
                y: msg.y - 30,
                duration: 1000,
                onComplete: () => msg.destroy(),
            });

            this.updateGameData();
        } else {
            // Show insufficient funds
            button.setFillStyle(0xff0000);
            this.tweens.add({
                targets: button,
                fillColor: 0x00aa00,
                duration: 300,
            });
        }
    }

    private addNewWorker() {
        const { width, height } = this.cameras.main;
        const poolY = 80;
        const x = 100 + this.workers.length * 80;

        // If too many workers, place them in a new row
        const actualX =
            this.workers.length < 10
                ? x
                : 100 + (this.workers.length - 10) * 80;
        const actualY = this.workers.length < 10 ? poolY : poolY + 60;

        const worker = this.add.sprite(actualX, actualY, "worker");
        worker.setDisplaySize(50, 50);
        worker.setInteractive({ draggable: true });
        worker.setData("workerId", this.workers.length);
        worker.setData("assigned", false);
        worker.setData("homeX", actualX);
        worker.setData("homeY", actualY);
        this.workers.push(worker);

        this.input.setDraggable(worker);

        // Animate appearance
        worker.setAlpha(0);
        worker.setScale(0);
        this.tweens.add({
            targets: worker,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 500,
            ease: "Back.easeOut",
        });

        // Note: gameData.workers is updated automatically via getAssignedWorkersCount()
        // when workers are assigned/unassigned, but total worker count doesn't change
        // This upgrade adds a new worker sprite but doesn't affect gameData.workers directly
        // since workers need to be assigned to machines to count
    }

    private updateRandomEvents() {
        if (this.gameData.timeRemaining <= 0) return;

        this.randomEventTimer++;

        // Trigger random event every 25-35 seconds
        if (
            !this.activeEvent &&
            this.randomEventTimer >= 25 + Math.random() * 10
        ) {
            this.triggerRandomEvent();
            this.randomEventTimer = 0;
        }

        // Update active event
        if (this.activeEvent) {
            this.activeEvent.duration--;
            if (this.activeEvent.duration <= 0) {
                this.endRandomEvent();
            } else {
                this.updateEventDisplay();
            }
        }
    }

    private triggerRandomEvent() {
        const events = [
            {
                type: "accident" as const,
                duration: 3,
                effect: -0.3,
                message: "⚠️ TAI NẠN! Năng suất -30% trong 3s",
            },
            {
                type: "strike" as const,
                duration: 5,
                effect: -0.5,
                message: "🚫 ĐÌNH CÔNG! Năng suất -50% trong 5s",
            },
            {
                type: "bonus" as const,
                duration: 3,
                effect: 0.5,
                message: "🎉 BONUS! Năng suất +50% trong 3s",
            },
            {
                type: "maintenance" as const,
                duration: 5,
                effect: -0.2,
                message: "🔧 BẢO TRÌ! Năng suất -20% trong 5s",
            },
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        this.activeEvent = { ...event };

        // Create event text display
        const { width, height } = this.cameras.main;
        if (!this.eventText) {
            this.eventText = this.add
                .text(width / 2, 50, "", {
                    fontSize: "18px",
                    color: "#ffff00",
                    fontStyle: "bold",
                    backgroundColor: "#000000",
                    padding: { x: 10, y: 5 },
                })
                .setOrigin(0.5);
        }
        this.eventText.setText(event.message);
        this.eventText.setAlpha(1);

        // Apply effect
        this.applyEventEffect();
    }

    private applyEventEffect() {
        // Effect will be applied in updateTimer via calculateGameOutputs
        // We just mark that there's an active event
    }

    private updateEventDisplay() {
        if (this.activeEvent && this.eventText) {
            const remaining = this.activeEvent.duration;
            const message = this.activeEvent.message.replace(
                /\d+s/,
                `${remaining}s`
            );
            this.eventText.setText(message);
        }
    }

    private endRandomEvent() {
        if (this.activeEvent && this.eventText) {
            this.eventText.setAlpha(0);
            // Reset any temporary effects
        }
        this.activeEvent = undefined;
    }

    private createConveyorBelt() {
        const { width, height } = this.cameras.main;
        this.conveyor = this.add.graphics();

        // Draw conveyor belt
        this.conveyor.fillStyle(0x4a4a5e, 1);
        this.conveyor.fillRect(50, height - 200, width - 100, 60);

        // Conveyor lines (animated)
        this.conveyor.lineStyle(2, 0xffd700, 0.5);
        for (let i = 0; i < 20; i++) {
            const x = 50 + i * 50;
            this.conveyor.lineBetween(x, height - 200, x + 30, height - 140);
        }
    }

    private createMachines() {
        const { width, height } = this.cameras.main;
        const machineY = height - 300;
        const spacing = (width - 200) / 3;

        for (let i = 0; i < 3; i++) {
            const x = 100 + i * spacing;

            // Machine body
            const machine = this.add.rectangle(x, machineY, 120, 150, 0x8b4513);
            machine.setStrokeStyle(4, 0x654321);
            machine.setData("machineId", i);
            machine.setData("assignedWorkers", 0);
            machine.setInteractive();
            this.machines.push(machine);

            // Hover effect
            machine.on("pointerover", () => {
                machine.setStrokeStyle(4, 0xffd700);
            });
            machine.on("pointerout", () => {
                machine.setStrokeStyle(4, 0x654321);
            });

            // Machine top (funnel)
            const funnel = this.add.triangle(
                x,
                machineY - 75,
                0,
                30,
                -40,
                -30,
                40,
                -30,
                0xa0522d
            );
            funnel.setStrokeStyle(3, 0x654321);

            // Machine label
            this.add
                .text(x, machineY + 100, `Máy ${i + 1} (Max: 3 CN)`, {
                    fontSize: "14px",
                    color: "#ffd700",
                    fontStyle: "bold",
                })
                .setOrigin(0.5);

            // Worker count badge
            const badge = this.add.circle(x + 50, machineY - 60, 15, 0xff0000);
            const badgeText = this.add
                .text(x + 50, machineY - 60, "0", {
                    fontSize: "14px",
                    color: "#ffffff",
                    fontStyle: "bold",
                })
                .setOrigin(0.5);
            badge.setData("badgeText", badgeText);
            machine.setData("badge", badge);

            // Particle emitter for production
            const particles = this.add.particles(x, machineY + 75, "particle", {
                speed: { min: 50, max: 100 },
                angle: { min: 60, max: 120 },
                scale: { start: 0.5, end: 0 },
                lifespan: 1000,
                frequency: 500,
                tint: [0xffd700, 0xffa500, 0xff6347],
                emitting: false,
            });
            this.productionParticles.push(particles);
        }
    }

    private createWorkerPool() {
        const { width, height } = this.cameras.main;
        const poolY = 80;

        // Worker pool background
        this.add
            .rectangle(width / 2, poolY, width - 100, 100, 0x2d2d44, 0.8)
            .setStrokeStyle(3, 0xffd700);
        this.add
            .text(
                width / 2,
                poolY - 40,
                "👷 Kho Công Nhân (Kéo vào máy | Click để bỏ ra)",
                {
                    fontSize: "18px",
                    color: "#ffd700",
                    fontStyle: "bold",
                }
            )
            .setOrigin(0.5);

        // Create worker sprites
        for (let i = 0; i < 10; i++) {
            const x = 100 + i * 80;
            const worker = this.add.sprite(x, poolY, "worker");
            worker.setDisplaySize(50, 50);
            worker.setInteractive({ draggable: true });
            worker.setData("workerId", i);
            worker.setData("assigned", false);
            worker.setData("homeX", x);
            worker.setData("homeY", poolY);
            this.workers.push(worker);

            // Drag events
            this.input.setDraggable(worker);
        }

        // Drag handlers
        this.input.on(
            "drag",
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Sprite,
                dragX: number,
                dragY: number
            ) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
                gameObject.setScale(1.2);
                gameObject.setTint(0x00ff00); // Green tint while dragging
            }
        );

        this.input.on(
            "dragend",
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Sprite
            ) => {
                gameObject.setScale(1);
                gameObject.clearTint();

                // If already assigned, try to unassign
                if (gameObject.getData("assigned")) {
                    this.unassignWorker(gameObject);
                    return;
                }

                const assigned = this.tryAssignWorkerToMachine(gameObject);

                if (!assigned) {
                    // Return to pool with bounce effect
                    this.tweens.add({
                        targets: gameObject,
                        x: gameObject.getData("homeX"),
                        y: gameObject.getData("homeY"),
                        duration: 300,
                        ease: "Back.easeOut",
                    });
                }
            }
        );

        // Click to unassign
        this.input.on(
            "gameobjectdown",
            (
                pointer: Phaser.Input.Pointer,
                gameObject: Phaser.GameObjects.Sprite
            ) => {
                if (
                    this.workers.includes(gameObject) &&
                    gameObject.getData("assigned")
                ) {
                    // Flash effect
                    this.tweens.add({
                        targets: gameObject,
                        alpha: 0.5,
                        duration: 100,
                        yoyo: true,
                        repeat: 1,
                    });
                }
            }
        );
    }

    private tryAssignWorkerToMachine(
        worker: Phaser.GameObjects.Sprite
    ): boolean {
        for (let i = 0; i < this.machines.length; i++) {
            const machine = this.machines[i];
            const distance = Phaser.Math.Distance.Between(
                worker.x,
                worker.y,
                machine.x,
                machine.y
            );

            if (distance < 100) {
                const currentWorkers = machine.getData("assignedWorkers") || 0;
                if (currentWorkers < 3) {
                    // Max 3 workers per machine
                    machine.setData("assignedWorkers", currentWorkers + 1);
                    worker.setData("assigned", true);
                    worker.setData("machineId", i);

                    // Position worker near machine
                    const angle = (currentWorkers * Math.PI * 2) / 3;
                    const offsetX = Math.cos(angle) * 70;
                    const offsetY = Math.sin(angle) * 70;

                    this.tweens.add({
                        targets: worker,
                        x: machine.x + offsetX,
                        y: machine.y + offsetY,
                        duration: 300,
                        ease: "Back.easeOut",
                    });

                    // Update badge
                    const badge = machine.getData("badge");
                    const badgeText = badge.getData("badgeText");
                    badgeText.setText(String(currentWorkers + 1));

                    // Change badge color based on workers
                    if (currentWorkers + 1 === 3) {
                        badge.setFillStyle(0x00ff00); // Green when full
                    } else if (currentWorkers + 1 >= 2) {
                        badge.setFillStyle(0xffa500); // Orange
                    }

                    // Update game data
                    this.gameData.workers = this.getAssignedWorkersCount();
                    this.updateGameData();

                    // Start production particles
                    this.productionParticles[i].start();

                    // Success feedback
                    this.tweens.add({
                        targets: machine,
                        scaleX: 1.1,
                        scaleY: 1.1,
                        duration: 100,
                        yoyo: true,
                    });

                    return true;
                } else {
                    // Machine is full - shake effect
                    this.tweens.add({
                        targets: machine,
                        x: machine.x + 5,
                        duration: 50,
                        yoyo: true,
                        repeat: 3,
                    });

                    // Show warning text
                    const warningText = this.add
                        .text(machine.x, machine.y - 100, "ĐẦY!", {
                            fontSize: "20px",
                            color: "#ff0000",
                            fontStyle: "bold",
                        })
                        .setOrigin(0.5);

                    this.tweens.add({
                        targets: warningText,
                        alpha: 0,
                        y: machine.y - 150,
                        duration: 1000,
                        onComplete: () => warningText.destroy(),
                    });
                }
            }
        }
        return false;
    }

    private unassignWorker(worker: Phaser.GameObjects.Sprite) {
        const machineId = worker.getData("machineId");
        if (machineId === undefined) return;

        const machine = this.machines[machineId];
        const currentWorkers = machine.getData("assignedWorkers") || 0;

        if (currentWorkers > 0) {
            machine.setData("assignedWorkers", currentWorkers - 1);
            worker.setData("assigned", false);
            worker.setData("machineId", undefined);

            // Update badge
            const badge = machine.getData("badge");
            const badgeText = badge.getData("badgeText");
            badgeText.setText(String(currentWorkers - 1));

            // Update badge color
            if (currentWorkers - 1 === 0) {
                badge.setFillStyle(0xff0000); // Red when empty
            } else if (currentWorkers - 1 === 1) {
                badge.setFillStyle(0xff0000); // Red
            } else if (currentWorkers - 1 === 2) {
                badge.setFillStyle(0xffa500); // Orange
            }

            // Return to pool
            this.tweens.add({
                targets: worker,
                x: worker.getData("homeX"),
                y: worker.getData("homeY"),
                duration: 300,
                ease: "Back.easeOut",
            });

            // Update game data
            this.gameData.workers = this.getAssignedWorkersCount();
            this.updateGameData();

            // Stop production particles if no workers
            if (currentWorkers - 1 === 0) {
                this.productionParticles[machineId].stop();
            }
        }
    }

    private getAssignedWorkersCount(): number {
        return this.workers.filter((w) => w.getData("assigned")).length;
    }

    private createUI() {
        const { width, height } = this.cameras.main;

        // Timer
        this.timerText = this.add
            .text(width - 20, 20, "", {
                fontSize: "24px",
                color: "#ff0000",
                fontStyle: "bold",
                backgroundColor: "#000000",
                padding: { x: 10, y: 5 },
            })
            .setOrigin(1, 0);

        // Stats panel - moved further left to avoid covering workers
        this.statsText = this.add
            .text(2, -5, "", {
                fontSize: "12px", // Slightly smaller
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: { x: 8, y: 4 },
            })
            .setOrigin(0);

        // Progress bar
        this.progressBar = this.add.graphics();

        // Instructions
        this.add
            .text(
                width / 2,
                height - 50,
                "💡 Mẹo: Kéo công nhân vào máy để tăng sản xuất | Điều chỉnh sliders bên dưới để tối ưu hóa",
                {
                    fontSize: "12px",
                    color: "#ffd700",
                    backgroundColor: "#000000",
                    padding: { x: 10, y: 5 },
                }
            )
            .setOrigin(0.5);

        this.updateUI();
    }

    private updateTimer() {
        if (this.gameData.timeRemaining > 0) {
            this.gameData.timeRemaining--;

            // TÍCH LŨY SẢN LƯỢNG MỖI GIÂY
            // Apply event modifier if active
            const eventModifier = this.activeEvent?.effect || 0;
            const outputs = calculateGameOutputs({
                ...this.gameData,
                eventModifier: eventModifier,
            });

            // Mỗi giây sản xuất → Tăng output
            // outputValue là giá trị sản xuất MỖI GIÂY (chưa trừ c, v)
            this.gameData.accumulatedOutput += outputs.outputValue;

            // Tính surplus = Tổng output tích lũy - c - v
            this.gameData.accumulatedSurplus =
                this.gameData.accumulatedOutput -
                this.gameData.constantCapital -
                this.gameData.variableCapital;

            this.updateUI();

            if (this.onUpdate) {
                this.onUpdate(this.gameData);
            }

            if (this.gameData.timeRemaining === 0) {
                this.endGame();
            }
        }
    }

    private updateProduction() {
        // Animate conveyor
        this.conveyorOffset += 2;
        if (this.conveyorOffset > 50) this.conveyorOffset = 0;

        // Spawn products based on productivity
        this.productionTimer += 0.1;
        const productionRate =
            this.gameData.workers *
            this.gameData.productivity *
            this.gameData.workRatio;

        if (this.productionTimer > 10 / Math.max(productionRate, 0.1)) {
            this.spawnProduct();
            this.productionTimer = 0;
        }

        // Move products along conveyor
        this.products.forEach((product, index) => {
            product.x += 2;
            if (product.x > this.cameras.main.width) {
                product.destroy();
                this.products.splice(index, 1);
            }
        });
    }

    private spawnProduct() {
        const { height } = this.cameras.main;
        const product = this.add.rectangle(60, height - 170, 30, 30, 0xffd700);
        product.setStrokeStyle(2, 0xffa500);
        this.products.push(product);
    }

    private updateUI() {
        if (!this.timerText || !this.statsText || !this.progressBar) return;

        // Timer
        const minutes = Math.floor(this.gameData.timeRemaining / 60);
        const seconds = this.gameData.timeRemaining % 60;
        this.timerText.setText(
            `⏱️ ${minutes}:${seconds.toString().padStart(2, "0")}`
        );

        // Stats - Hiển thị giá trị TÍCH LŨY
        const outputs = calculateGameOutputs(this.gameData);
        const statsLines = [
            `👷 Công nhân: ${this.gameData.workers}`,
            `⚡ Năng suất: ${this.gameData.productivity.toFixed(1)}x`,
            `💰 Sản xuất/giây: ${outputs.outputValue.toFixed(1)}`,
            `📈 Thặng dư tích lũy: ${this.gameData.accumulatedSurplus.toFixed(
                0
            )}`,
            `🎯 Mục tiêu: ${this.gameData.targetSurplus}`,
        ];
        this.statsText.setText(statsLines.join("\n"));

        // Progress bar - Dùng TÍCH LŨY thay vì tức thời
        this.progressBar.clear();
        const progress = Math.min(
            this.gameData.accumulatedSurplus / this.gameData.targetSurplus,
            1
        );
        const barWidth = 300;
        const barHeight = 20;
        const barX = 0; // Moved left to match stats panel
        const barY = 150;

        this.progressBar.fillStyle(0x333333);
        this.progressBar.fillRect(barX, barY, barWidth, barHeight);

        const color =
            progress >= 1 ? 0x00ff00 : progress >= 0.5 ? 0xffd700 : 0xff0000;
        this.progressBar.fillStyle(color);
        this.progressBar.fillRect(barX, barY, barWidth * progress, barHeight);

        this.progressBar.lineStyle(2, 0xffffff);
        this.progressBar.strokeRect(barX, barY, barWidth, barHeight);
    }

    private updateGameData() {
        if (this.onUpdate) {
            this.onUpdate(this.gameData);
        }
        this.updateUI();
    }

    private endGame() {
        if (this.onGameEnd) {
            this.onGameEnd();
        }
    }

    public setProductivity(value: number) {
        this.gameData.productivity = value;
        this.updateUI(); // Force UI update
        this.updateGameData();
    }

    public setWorkRatio(value: number) {
        this.gameData.workRatio = value;
        this.updateUI(); // Force UI update
        this.updateGameData();
    }

    public setConstantCapital(value: number) {
        this.gameData.constantCapital = value;
        this.updateUI(); // Force UI update
        this.updateGameData();
    }

    public setVariableCapital(value: number) {
        this.gameData.variableCapital = value;
        this.updateUI(); // Force UI update
        this.updateGameData();
    }
}
