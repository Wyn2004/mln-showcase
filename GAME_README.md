# Factory Shift - Dây Chuyền Sản Xuất

## 🎮 Giới Thiệu

**Factory Shift** là game mô phỏng quản lý dây chuyền sản xuất dựa trên lý thuyết kinh tế chính trị Mác-Lênin. Game giúp người chơi hiểu rõ về:

- **Giá trị thặng dư (s)**: Phần giá trị mới do lao động tạo ra vượt quá giá trị sức lao động
- **Tỷ suất thặng dư (m')**: s / v × 100%
- **Tỷ suất lợi nhuận (p')**: s / (c + v) × 100%
- **Các yếu tố sản xuất**: L (lao động), P (năng suất), c (tư bản bất biến), v (tư bản khả biến)

## 🎯 Mục Tiêu Game

1. Đạt **giá trị thặng dư (s)** mục tiêu trong thời gian giới hạn
2. Tối ưu hóa **tỷ suất thặng dư (m')** và **tỷ suất lợi nhuận (p')**
3. Hoàn thành càng nhanh để nhận điểm thưởng thời gian

## 🕹️ Cách Chơi

### Điều Khiển

1. **Số Công Nhân (L)**: Điều chỉnh số lượng công nhân làm việc
   - Tăng công nhân → Tăng giá trị sản phẩm
   - Cần cân bằng với tư bản khả biến (v)

2. **Năng Suất (P)**: Nâng cấp năng suất lao động
   - Tăng năng suất → Tăng giá trị sản phẩm mạnh mẽ
   - Cách hiệu quả nhất để tăng giá trị thặng dư

3. **Tỷ Lệ Làm Việc**: Điều chỉnh thời gian làm việc (0-100%)
   - Ảnh hưởng trực tiếp đến giá trị sản phẩm
   - Quá cao có thể làm giảm hiệu suất

4. **Tư Bản**:
   - **c (Tư bản bất biến)**: Chi phí máy móc, nguyên vật liệu
   - **v (Tư bản khả biến)**: Chi phí tiền lương công nhân

### Công Thức Tính Toán

```
Giá trị sản phẩm = 50 × L × P × Tỷ lệ làm việc
s = Giá trị sản phẩm - c - v
m' = s / v × 100%
p' = s / (c + v) × 100%
```

## 🏆 Hệ Thống Điểm

- **+100 điểm**: Đạt mục tiêu giá trị thặng dư (s)
- **+50 điểm**: Thưởng thời gian (tối đa nếu hoàn thành nhanh)
- **+10 điểm**: Mỗi hành động đúng
- **-2 điểm**: Mỗi lần sử dụng gợi ý/cheat
- **+Bonus**: Vượt mục tiêu (mỗi 10 đơn vị thặng dư thêm = +1 điểm)

## 📊 Cấp Độ

### Cấp 1: Khởi Đầu
- **Thời gian**: 120 giây
- **Mục tiêu s**: 100
- **Công nhân tối đa**: 5
- **Năng suất tối đa**: 2x

### Cấp 2: Tăng Năng Suất
- **Thời gian**: 150 giây
- **Mục tiêu s**: 200
- **Mục tiêu m'**: ≥ 150%
- **Công nhân tối đa**: 8
- **Năng suất tối đa**: 3x

### Cấp 3: Thách Thức
- **Thời gian**: 180 giây
- **Mục tiêu s**: 350
- **Mục tiêu m'**: ≥ 200%
- **Công nhân tối đa**: 10
- **Năng suất tối đa**: 4x

## 💡 Mẹo Chơi

1. **Tăng năng suất (P)** là cách hiệu quả nhất để tăng giá trị thặng dư
2. Giảm **tư bản khả biến (v)** sẽ tăng m' nhưng có thể giảm động lực công nhân
3. Cân bằng giữa **số công nhân** và **năng suất** để tối ưu
4. Theo dõi **tỷ lệ làm việc** - quá cao có thể làm giảm hiệu suất
5. Ưu tiên đạt mục tiêu s trước, sau đó tối ưu m' và p'

## 🏅 Thành Tích

- **Người Mới**: Chơi 1 trận
- **Người Chơi Thường Xuyên**: Chơi 10 trận
- **Cao Thủ**: Đạt 200 điểm
- **Huyền Thoại**: Đạt 300 điểm

## 🛠️ Công Nghệ Sử Dụng

- **Next.js 16**: Framework React
- **Phaser 3**: Game engine
- **Zustand**: State management với localStorage persistence
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components

## 📁 Cấu Trúc Code

```
app/game/
  └── page.tsx                 # Main game page

components/game/
  ├── GameCanvas.tsx           # Game UI và controls
  ├── Tutorial.tsx             # Hướng dẫn chơi
  └── Leaderboard.tsx          # Bảng xếp hạng

lib/game/
  └── gameLogic.ts             # Game logic và formulas

lib/store/
  └── gameStore.ts             # Zustand store với localStorage
```

## 🎨 Thiết Kế UI

Game được thiết kế với phong cách **retro-modern**:
- Màu sắc chủ đạo: Đỏ, vàng, xanh (theo chủ đề Mác-Lênin)
- Border dày, box shadow offset
- Gradient backgrounds
- Smooth animations
- Responsive design (mobile-friendly)

## 🚀 Truy Cập Game

- **URL**: `/game`
- **Navigation**: Click nút "🎮 Game" trên header
- **Home page**: Click card "Factory Shift Game" ở phần Nội Dung Học Tập

## 📝 Ghi Chú Kỹ Thuật

- Điểm số được lưu tự động vào localStorage
- Top 10 điểm cao nhất được giữ lại
- Game state được persist giữa các sessions
- Responsive design hoạt động tốt trên mobile và desktop

