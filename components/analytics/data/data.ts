// Data structure for Law of Value simulation

export interface Factor {
    id: string;
    symbol: string;
    name: string;
    fullName: string;
    description: string;
    relationship: string;
    icon: string;
    color: string;
    examples?: string[];
}

export interface Formula {
    id: string;
    name: string;
    formula: string;
    description: string;
    variables: { symbol: string; meaning: string }[];
}

export interface MarketCondition {
    condition: string;
    supply: string;
    demand: string;
    priceVsValue: string;
    result: string;
    action: string;
}

export interface Example {
    id: string;
    title: string;
    factor: string;
    scenarios: {
        description: string;
        value: string;
        result: string;
    }[];
    conclusion: string;
}

export interface Impact {
    title: string;
    description: string;
    details: string[];
    icon: string;
}

// Introduction
export const introduction = {
    title: "Mô Phỏng Quy Luật Giá Trị",
    subtitle: "trong Kinh Tế Chính Trị Mác-Lênin",
    description:
        "uy luật giá trị là quy luật kinh tế cơ bản của sản xuất hàng hóa trong kinh tế chính trị Mác-Lênin, quy định rằng việc sản xuất và trao đổi hàng hóa phải căn cứ vào hao phí lao động xã hội cần thiết để tạo ra hàng hóa đó. Quy luật này hoạt động thông qua sự vận động của giá cả xoay quanh trục giá trị dưới tác động của quan hệ cung-cầu trên thị trường.",
};

// Four main factors: L, P, D, Q
export const factors: Factor[] = [
    {
        id: "L",
        symbol: "L",
        name: "Lao Động",
        fullName: "Lao Động Xã Hội Cần Thiết",
        description:
            "Lao động xã hội cần thiết là thời gian lao động cần thiết để sản xuất ra một hàng hóa trong điều kiện bình thường của xã hội, với trình độ kỹ thuật trung bình, trình độ khéo léo trung bình và cường độ lao động trung bình.",
        relationship:
            "Lao động xã hội cần thiết tỷ lệ thuận với giá trị hàng hóa. Khi thời gian lao động tăng, giá trị hàng hóa tăng theo.",
        icon: "⏱️",
        color: "red",
        examples: [
            "Thời gian sản xuất tăng → Giá trị tăng",
            "Điều kiện sản xuất bình thường",
        ],
    },
    {
        id: "P",
        symbol: "P",
        name: "Phức Tạp",
        fullName: "Phức Tạp Lao Động",
        description:
            "Lao động được phân thành lao động giản đơn (không cần đào tạo) và lao động phức tạp (cần đào tạo chuyên môn). Lao động phức tạp thực chất là lao động giản đơn được nhân lên với một hệ số nhất định.",
        relationship:
            "Trong cùng một đơn vị thời gian, lao động phức tạp tạo ra nhiều giá trị hơn lao động giản đơn. Mức độ phức tạp tỷ lệ thuận với giá trị hàng hóa.",
        icon: "🎓",
        color: "blue",
        examples: ["Lao động giản đơn: P = 1", "Lao động phức tạp: P = 2-5"],
    },
    {
        id: "D",
        symbol: "D",
        name: "Cường Độ",
        fullName: "Cường Độ Lao Động",
        description:
            "Cường độ lao động là đại lượng chỉ mức độ hao phí sức lao động trong một đơn vị thời gian. Khi cường độ lao động tăng, người lao động làm việc căng thẳng hơn, hao phí nhiều sức lực hơn trong cùng thời gian.",
        relationship:
            "Cường độ lao động tăng làm tăng số lượng sản phẩm sản xuất ra. Giá trị của một đơn vị hàng hóa không đổi, nhưng tổng giá trị được tạo ra trong cùng thời gian sẽ tăng lên.",
        icon: "💪",
        color: "orange",
        examples: [
            "Cường độ tăng → Số lượng SP tăng",
            "Giá trị đơn vị không đổi",
        ],
    },
    {
        id: "Q",
        symbol: "Q",
        name: "Năng Suất",
        fullName: "Năng Suất Lao Động",
        description:
            "Năng suất lao động là năng lực sản xuất của lao động, được đo bằng số lượng sản phẩm sản xuất ra trong một đơn vị thời gian hoặc thời gian lao động cần thiết để sản xuất ra một đơn vị sản phẩm.",
        relationship:
            "Năng suất lao động xã hội tỷ lệ nghịch với lượng giá trị của một đơn vị hàng hóa. Khi năng suất lao động tăng, thời gian lao động xã hội cần thiết để sản xuất ra một đơn vị hàng hóa giảm, dẫn đến giá trị của hàng hóa giảm.",
        icon: "⚡",
        color: "green",
        examples: ["Năng suất tăng → Giá trị đơn vị giảm", "Tỷ lệ nghịch"],
    },
];

// Formulas
export const formulas: Formula[] = [
    {
        id: "basic",
        name: "Lượng giá trị cơ bản",
        formula: "G = L × k",
        description:
            "Giá trị hàng hóa bằng lao động xã hội cần thiết nhân với hệ số phức tạp",
        variables: [
            { symbol: "G", meaning: "Giá trị" },
            { symbol: "L", meaning: "Lao động xã hội cần thiết" },
            { symbol: "k", meaning: "Hệ số phức tạp lao động" },
        ],
    },
    {
        id: "productivity",
        name: "Giá trị với năng suất",
        formula: "G_đơn_vị = L / Q",
        description:
            "Giá trị một đơn vị hàng hóa bằng lao động chia cho năng suất",
        variables: [
            { symbol: "G_đơn_vị", meaning: "Giá trị đơn vị" },
            { symbol: "L", meaning: "Lao động" },
            { symbol: "Q", meaning: "Năng suất" },
        ],
    },
    {
        id: "complexity",
        name: "Giá trị lao động phức tạp",
        formula: "G_phức = G_đơn × P",
        description:
            "Giá trị lao động phức tạp bằng giá trị lao động giản đơn nhân với hệ số phức tạp",
        variables: [
            { symbol: "G_phức", meaning: "Giá trị lao động phức tạp" },
            { symbol: "G_đơn", meaning: "Giá trị lao động giản đơn" },
            { symbol: "P", meaning: "Hệ số phức tạp" },
        ],
    },
    {
        id: "intensity",
        name: "Tổng giá trị với cường độ",
        formula: "G_tổng = L × D",
        description:
            "Tổng giá trị tăng theo cường độ, nhưng giá trị đơn vị không đổi",
        variables: [
            { symbol: "G_tổng", meaning: "Tổng giá trị" },
            { symbol: "L", meaning: "Lao động" },
            { symbol: "D", meaning: "Cường độ" },
        ],
    },
    {
        id: "price",
        name: "Quan hệ giá cả - giá trị",
        formula: "Giá_cả = G ± Δ(cung, cầu)",
        description: "Giá cả dao động quanh giá trị theo quan hệ cung cầu",
        variables: [
            { symbol: "Giá_cả", meaning: "Giá cả thị trường" },
            { symbol: "G", meaning: "Giá trị" },
            { symbol: "Δ", meaning: "Độ lệch do cung cầu" },
        ],
    },
];

// Market conditions
export const marketConditions: MarketCondition[] = [
    {
        condition: "Cân bằng",
        supply: "Cung = Cầu",
        demand: "1000 = 1000",
        priceVsValue: "Giá cả = Giá trị",
        result: "Thị trường ổn định, lợi nhuận bình thường",
        action: "Duy trì sản xuất",
    },
    {
        condition: "Khan hiếm",
        supply: "Cung < Cầu",
        demand: "800 < 1200",
        priceVsValue: "Giá cả > Giá trị (+30%)",
        result: "Hàng hóa bán chạy, lợi nhuận cao",
        action: "Mở rộng sản xuất, tăng cung",
    },
    {
        condition: "Dư thừa",
        supply: "Cung > Cầu",
        demand: "1200 > 900",
        priceVsValue: "Giá cả < Giá trị (-25%)",
        result: "Hàng hóa khó bán, doanh nghiệp thua lỗ",
        action: "Thu hẹp sản xuất hoặc tìm thị trường mới",
    },
];

// Examples
export const examples: Example[] = [
    {
        id: "productivity-example",
        title: "Ảnh Hưởng của Năng Suất Lao Động (Q)",
        factor: "Q",
        scenarios: [
            {
                description: "Ban đầu: Năng suất 10 áo/ngày, thời gian 8 giờ",
                value: "0.8 giờ/áo",
                result: "Giá trị mỗi áo = 0.8 giờ",
            },
            {
                description:
                    "Đầu tư máy móc: Năng suất 20 áo/ngày, thời gian 8 giờ",
                value: "0.4 giờ/áo",
                result: "Giá trị giảm 50%",
            },
            {
                description: "Công nghệ hiện đại: Năng suất 30 áo/ngày",
                value: "0.27 giờ/áo",
                result: "Giá trị giảm 67%",
            },
        ],
        conclusion: "Năng suất tăng làm giá trị đơn vị giảm (tỷ lệ nghịch)",
    },
    {
        id: "intensity-example",
        title: "Ảnh Hưởng của Cường Độ Lao Động (D)",
        factor: "D",
        scenarios: [
            {
                description: "Cường độ bình thường (100%): 8 giờ làm 10 SP",
                value: "0.8 giờ/SP",
                result: "Tổng giá trị = 8 giờ",
            },
            {
                description: "Cường độ tăng 1.5 lần (150%): 8 giờ làm 15 SP",
                value: "0.8 giờ/SP",
                result: "Tổng giá trị = 12 giờ",
            },
        ],
        conclusion:
            "Cường độ tăng làm tăng số lượng và tổng giá trị, nhưng giá trị đơn vị không đổi",
    },
    {
        id: "complexity-example",
        title: "Ảnh Hưởng của Phức Tạp Lao Động (P)",
        factor: "P",
        scenarios: [
            {
                description: "Lao động giản đơn (công nhân phổ thông)",
                value: "P = 1",
                result: "Tạo ra 1 đơn vị giá trị",
            },
            {
                description: "Lao động bán phức tạp (công nhân có tay nghề)",
                value: "P = 2",
                result: "Tạo ra 2 đơn vị giá trị",
            },
            {
                description: "Lao động phức tạp (kỹ thuật viên)",
                value: "P = 3",
                result: "Tạo ra 3 đơn vị giá trị",
            },
            {
                description: "Lao động cao cấp (kỹ sư chuyên gia)",
                value: "P = 5",
                result: "Tạo ra 5 đơn vị giá trị",
            },
        ],
        conclusion:
            "Lao động phức tạp tạo ra giá trị cao hơn lao động giản đơn (tỷ lệ thuận)",
    },
];

// Impacts
export const impacts: Impact[] = [
    {
        title: "Điều Tiết Sản Xuất và Lưu Thông",
        description:
            "Quy luật giá trị tự động phân bổ lực lượng lao động và tư liệu sản xuất giữa các ngành, các lĩnh vực thông qua sự biến động của giá cả.",
        details: [
            "Trong sản xuất: Giá cả cao hơn giá trị kích thích mở rộng sản xuất, thu hút nguồn lực đầu tư",
            "Giá cả thấp hơn giá trị buộc phải thu hẹp sản xuất, chuyển hướng sang ngành khác",
            "Trong lưu thông: Điều tiết hàng hóa từ nơi giá thấp đến nơi giá cao",
            "Góp phần cân bằng cung cầu giữa các vùng miền",
        ],
        icon: "⚖️",
    },
    {
        title: "Kích Thích Cải Tiến Kỹ Thuật",
        description:
            "Người sản xuất nào có giá trị cá biệt thấp hơn giá trị xã hội sẽ thu được lợi nhuận cao hơn.",
        details: [
            "Cải tiến kỹ thuật, đổi mới công nghệ",
            "Nâng cao trình độ tay nghề người lao động",
            "Hợp lý hóa sản xuất, tiết kiệm chi phí",
            "Tăng năng suất lao động để hạ giá trị cá biệt",
        ],
        icon: "🔧",
    },
    {
        title: "Phân Hóa Người Sản Xuất",
        description:
            "Quy luật giá trị dẫn đến sự phân hóa giàu-nghèo trong xã hội.",
        details: [
            "Người có giá trị cá biệt thấp hơn giá trị xã hội: Lợi nhuận cao, tích lũy vốn, mở rộng sản xuất",
            "Người có giá trị cá biệt cao hơn giá trị xã hội: Thua lỗ, có nguy cơ phá sản",
            "Tạo ra sự cạnh tranh trong thị trường",
            "Thúc đẩy phát triển nhưng cũng tạo bất bình đẳng",
        ],
        icon: "📊",
    },
];

// Conclusion
export const conclusion = {
    title: "Ý Nghĩa Thực Tiễn",
    quote: "Quy luật giá trị là nền tảng của kinh tế thị trường, chi phối mọi hoạt động sản xuất, kinh doanh và phân phối trong xã hội.",
    forBusiness: [
        "Định hướng sản xuất phù hợp với nhu cầu thị trường",
        "Đầu tư cải tiến công nghệ để nâng cao năng suất, giảm chi phí",
        "Tăng cường đào tạo lao động chất lượng cao",
    ],
    forGovernment: [
        "Xây dựng chính sách phù hợp với quy luật khách quan",
        "Điều tiết vĩ mô để tránh tình trạng biến động giá cả quá mức",
        "Tạo môi trường cạnh tranh lành mạnh, bảo vệ người tiêu dùng",
    ],
};
