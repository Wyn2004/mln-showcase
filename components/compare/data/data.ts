export interface ComparisonRow {
  criteria: string;
  capitalism: string;
  socialism: string;
}

export const comparisonData: ComparisonRow[] = [
  {
    criteria: "Sở hữu TLSX",
    capitalism: "Tư nhân, tập trung vào thiểu số tư bản",
    socialism: "Công cộng, tập thể, toàn dân"
  },
  {
    criteria: "Mục tiêu sản xuất",
    capitalism: "Lợi nhuận tối đa",
    socialism: "Nhu cầu con người, phúc lợi xã hội"
  },
  {
    criteria: "Động lực",
    capitalism: "Cạnh tranh, lợi ích cá nhân",
    socialism: "Hợp tác, lợi ích tập thể"
  },
  {
    criteria: "Cơ chế vận hành",
    capitalism: "Thị trường tự do, quy luật giá trị tự phát",
    socialism: "Thị trường có kế hoạch, điều tiết bởi Nhà nước"
  },
  {
    criteria: "Phân phối",
    capitalism: "Theo vốn, quyền lực kinh tế",
    socialism: "Theo lao động, phúc lợi xã hội"
  },
  {
    criteria: "Quan hệ giai cấp",
    capitalism: "Đối kháng (tư sản – vô sản)",
    socialism: "Hợp tác, bình đẳng dần"
  },
  {
    criteria: "Chỉ số Gini",
    capitalism: "Cao (≥ 0.5) – bất bình đẳng lớn",
    socialism: "Thấp (0.2–0.3) – công bằng hơn"
  },
  {
    criteria: "Tính ổn định",
    capitalism: "Chu kỳ khủng hoảng thường xuyên",
    socialism: "Ổn định hơn, kế hoạch hóa dài hạn"
  },
  {
    criteria: "Tính nhân văn",
    capitalism: "Con người là phương tiện kiếm lợi",
    socialism: "Con người là mục tiêu phát triển"
  },
  {
    criteria: "Xu hướng phát triển",
    capitalism: "Bị giới hạn bởi mâu thuẫn nội tại",
    socialism: "Mở ra hướng đi của tương lai nhân loại"
  }
];

export interface Section {
  id: string;
  title: string;
  content: string[];
}

export const capitalismSections: Section[] = [
  {
    id: "foundation",
    title: "Cơ sở kinh tế – xã hội",
    content: [
      "Tư bản chủ nghĩa ra đời từ lòng chế độ phong kiến tan rã, khi sản xuất hàng hóa giản đơn phát triển thành sản xuất hàng hóa tư bản.",
      "Đặc trưng nổi bật là tư liệu sản xuất (TLSX) tập trung vào tay giai cấp tư sản – những người sở hữu vốn và tổ chức sản xuất – trong khi người lao động chỉ còn sức lao động để bán.",
      "Sở hữu tư nhân tư bản trở thành nền tảng của toàn bộ quan hệ kinh tế. Mục đích của sản xuất không còn là đáp ứng nhu cầu xã hội mà là tối đa hóa giá trị thặng dư."
    ]
  },
  {
    id: "mechanism",
    title: "Cơ chế vận hành",
    content: [
      "Quy luật giá trị: trao đổi hàng hóa theo lượng lao động xã hội cần thiết.",
      "Quy luật cung – cầu: điều tiết giá cả thị trường dao động quanh giá trị.",
      "Quy luật tích lũy tư bản: lợi nhuận được tái đầu tư mở rộng sản xuất.",
      "Quy luật cạnh tranh: thúc đẩy đổi mới kỹ thuật, song dẫn tới khủng hoảng chu kỳ."
    ]
  },
  {
    id: "results",
    title: "Kết quả xã hội",
    content: [
      "CNTB đã mang lại những thành tựu rực rỡ về khoa học, công nghệ, năng suất, đời sống vật chất.",
      "Mâu thuẫn giữa tính chất xã hội của sản xuất và chiếm hữu tư nhân",
      "Mâu thuẫn giữa lao động và tư bản",
      "Mâu thuẫn giữa tư sản và vô sản"
    ]
  }
];

export const socialismSections: Section[] = [
  {
    id: "foundation",
    title: "Cơ sở ra đời",
    content: [
      "Theo Mác và Ăngghen, XHCN không phải là ước mơ chủ quan mà là kết quả tất yếu của sự phát triển nội tại CNTB.",
      "Khi LLSX đạt đến trình độ cao, quan hệ sản xuất tư bản trở thành xiềng xích kìm hãm sự phát triển đó.",
      "Sự mâu thuẫn được giải quyết bằng cách mạng xã hội chủ nghĩa, nơi giai cấp công nhân giành chính quyền và xây dựng quan hệ sản xuất mới."
    ]
  },
  {
    id: "characteristics",
    title: "Đặc trưng bản chất",
    content: [
      "Sở hữu công cộng về TLSX chủ yếu: toàn dân hoặc tập thể.",
      "Sản xuất vì nhu cầu xã hội, chứ không vì lợi nhuận tư nhân.",
      "Phân phối theo lao động là nguyên tắc cơ bản, bên cạnh các hình thức theo vốn góp, theo nhu cầu, theo phúc lợi.",
      "Nhà nước của nhân dân lao động tổ chức, điều tiết kinh tế theo kế hoạch và quy luật khách quan.",
      "Quan hệ giai cấp dần được cải thiện, hướng đến xóa bỏ đối kháng, thực hiện công bằng, bình đẳng."
    ]
  },
  {
    id: "advantages",
    title: "Ưu thế lịch sử",
    content: [
      "XHCN hướng tới phát triển con người toàn diện; giải phóng lao động khỏi tha hóa.",
      "Kết hợp hài hòa giữa cá nhân và cộng đồng.",
      "Sử dụng thành tựu của CNTB (khoa học, kỹ thuật, tổ chức) nhưng phục vụ mục tiêu nhân văn, công bằng chứ không phải lợi nhuận."
    ]
  }
];

export const vietnamModel = {
  title: "VIỆT NAM VÀ MÔ HÌNH KINH TẾ THỊ TRƯỜNG ĐỊNH HƯỚNG XÃ HỘI CHỦ NGHĨA",
  sections: [
    {
      id: "foundation",
      title: "Cơ sở lý luận và thực tiễn",
      content: [
        "Sau khi thống nhất đất nước, Việt Nam bước vào thời kỳ quá độ lên CNXH với xuất phát điểm thấp: lực lượng sản xuất nhỏ bé, cơ chế kế hoạch hóa tập trung bộc lộ nhiều hạn chế.",
        "Đổi mới (1986) đánh dấu bước ngoặt: chuyển sang kinh tế thị trường có sự quản lý của Nhà nước, theo định hướng xã hội chủ nghĩa.",
        "Đây là sáng tạo lớn của Đảng Cộng sản Việt Nam, vì nó vừa tôn trọng quy luật khách quan của thị trường, vừa bảo đảm định hướng chính trị – xã hội XHCN."
      ]
    },
    {
      id: "essence",
      title: "Bản chất của mô hình",
      content: [
        "Nền kinh tế nhiều hình thức sở hữu và nhiều thành phần cùng phát triển, trong đó kinh tế nhà nước giữ vai trò chủ đạo.",
        "Thị trường là công cụ phân bổ nguồn lực, nhưng Nhà nước định hướng, điều tiết để đảm bảo công bằng xã hội.",
        "Phát triển kinh tế đi đôi với tiến bộ và công bằng xã hội, coi con người là trung tâm.",
        "Hội nhập quốc tế, nhưng giữ vững độc lập, tự chủ và bản sắc dân tộc."
      ]
    },
    {
      id: "operation",
      title: "Vận hành các quy luật thị trường",
      content: [
        "Quy luật giá trị, cung – cầu, cạnh tranh vẫn được vận dụng để kích thích sản xuất, nâng cao hiệu quả.",
        "Nhà nước sử dụng công cụ pháp luật, kế hoạch, chính sách tài chính – tiền tệ – thuế, an sinh để điều tiết thị trường.",
        "Khu vực tư nhân được khuyến khích phát triển, song phải tuân thủ định hướng phát triển bền vững và trách nhiệm xã hội.",
        "Công bằng xã hội được bảo đảm thông qua phân phối lại bằng thuế lũy tiến, chính sách phúc lợi, đầu tư công, giáo dục và y tế."
      ]
    },
    {
      id: "distribution",
      title: "Nguyên tắc phân phối",
      content: [
        "Theo lao động (tiền lương gắn với năng suất, hiệu quả)",
        "Theo vốn và rủi ro (đầu tư tư nhân, cổ phần hóa)",
        "Theo phúc lợi và nhu cầu xã hội (y tế, giáo dục, trợ cấp, bảo hiểm)",
        "Sự kết hợp này vừa đảm bảo động lực cá nhân, vừa điều tiết khoảng cách giàu nghèo."
      ]
    },
    {
      id: "state-role",
      title: "Vai trò của Nhà nước",
      content: [
        "Định hướng phát triển thông qua chiến lược, quy hoạch, chính sách vĩ mô.",
        "Điều tiết thị trường để khắc phục thất bại (độc quyền, phân hoá giàu nghèo, ô nhiễm).",
        "Bảo đảm phúc lợi xã hội: y tế, giáo dục, việc làm, an sinh, môi trường.",
        "Thúc đẩy sáng tạo và đổi mới khoa học công nghệ.",
        "Nhà nước không làm thay thị trường, mà 'kiến tạo phát triển', hướng các lực lượng kinh tế vào mục tiêu 'dân giàu, nước mạnh, dân chủ, công bằng, văn minh'."
      ]
    }
  ],
  challenges: [
    {
      title: "Căng thẳng giữa hiệu quả và công bằng",
      description: "Kinh tế thị trường tạo ra chênh lệch thu nhập – một động lực phát triển, nhưng nếu không kiểm soát, sẽ dẫn đến bất bình đẳng và xói mòn định hướng XHCN.",
      solution: "Cần 'cân bằng mềm' thông qua thuế, trợ cấp, và đầu tư vùng khó khăn."
    },
    {
      title: "Cạnh tranh và hội nhập quốc tế",
      description: "Việt Nam phải tận dụng toàn cầu hoá nhưng giữ độc lập tự chủ, tránh rơi vào vị thế 'gia công' phụ thuộc vốn và công nghệ nước ngoài.",
      solution: ""
    },
    {
      title: "Phát triển bền vững",
      description: "Tăng trưởng nhanh dễ dẫn đến ô nhiễm, cạn kiệt tài nguyên, bất ổn môi trường.",
      solution: "Định hướng XHCN yêu cầu 'kinh tế xanh, kinh tế tuần hoàn, con người là trung tâm.'"
    },
    {
      title: "Chuyển đổi số và công bằng thế hệ",
      description: "Cần chính sách số hoá, giáo dục, đào tạo để mọi tầng lớp cùng tiếp cận thành quả khoa học, tránh 'chia cắt kỹ thuật số'.",
      solution: ""
    },
    {
      title: "Phòng chống tha hoá trong cơ chế thị trường",
      description: "Định hướng XHCN không chỉ là công bằng vật chất, mà còn là giữ gìn phẩm chất con người, chống chủ nghĩa cá nhân cực đoan, tiêu cực xã hội.",
      solution: ""
    }
  ]
};

export const introduction = {
  title: "TỪ MÂU THUẪN CỦA TƯ BẢN ĐẾN KHÁT VỌNG CỦA XÃ HỘI CHỦ NGHĨA",
  paragraphs: [
    "Lịch sử phát triển của nhân loại luôn vận động qua các hình thái kinh tế – xã hội, từ cộng sản nguyên thuỷ, chiếm hữu nô lệ, phong kiến, đến tư bản chủ nghĩa (TBCN) và xã hội chủ nghĩa (XHCN). Mỗi hình thái đều mang dấu ấn của phương thức sản xuất đặc trưng, tức sự thống nhất giữa lực lượng sản xuất (LLSX) và quan hệ sản xuất (QHSX).",
    "Trong học thuyết của C.Mác, tư bản chủ nghĩa được xem là giai đoạn phát triển cao của chủ nghĩa bóc lột, nơi năng suất lao động đạt đỉnh nhưng mâu thuẫn nội tại giữa tính chất xã hội của sản xuất và hình thức chiếm hữu tư nhân kết quả lao động trở nên gay gắt nhất. Từ chính lòng TBCN, những yếu tố vật chất và tinh thần của một hình thái xã hội mới – chủ nghĩa xã hội – nảy sinh.",
    "Vì vậy, so sánh hai hình thái này không chỉ là đối chiếu cơ học, mà là phân tích sự vận động lịch sử – tất yếu của quá trình phủ định biện chứng: từ chủ nghĩa tư bản → chủ nghĩa xã hội → chủ nghĩa cộng sản."
  ]
};

export const conclusion = {
  title: "THỊ TRƯỜNG LÀ PHƯƠNG TIỆN, CHỦ NGHĨA XÃ HỘI LÀ MỤC TIÊU",
  paragraphs: [
    "So sánh tư bản chủ nghĩa và xã hội chủ nghĩa cho thấy hai cách tổ chức kinh tế – xã hội khác nhau về bản chất.",
    "Tư bản chủ nghĩa: động lực mạnh nhưng mang trong mình mâu thuẫn tự hủy; phát triển lực lượng sản xuất nhưng tạo ra bất bình đẳng sâu sắc.",
    "Xã hội chủ nghĩa: hướng tới phát triển con người toàn diện, kết hợp hiệu quả – công bằng – bền vững.",
    "Kinh tế thị trường định hướng XHCN ở Việt Nam chính là sự vận dụng sáng tạo học thuyết Mác – Lênin vào điều kiện cụ thể: 'Sử dụng cơ chế thị trường như một công cụ, đặt dưới sự lãnh đạo của Đảng và quản lý của Nhà nước, để đạt tới mục tiêu xã hội chủ nghĩa.'",
    "Nếu chủ nghĩa tư bản là giai đoạn mà con người sáng tạo ra của cải nhưng bị tha hoá bởi chính sản phẩm của mình, thì chủ nghĩa xã hội là bước chuyển mà ở đó con người làm chủ sản xuất, làm chủ bản thân và xã hội. Việt Nam đang bước đi trên con đường đó – một con đường vừa hiện thực, vừa lý tưởng, vừa kinh tế, vừa nhân văn."
  ],
  quote: {
    text: "Kinh tế thị trường định hướng xã hội chủ nghĩa là mô hình tổng quát của con đường đi lên chủ nghĩa xã hội ở Việt Nam – vừa tuân theo quy luật khách quan của thị trường, vừa hướng tới công bằng, tiến bộ, phát triển con người toàn diện.",
    author: "Tổng Bí thư Nguyễn Phú Trọng"
  }
};

