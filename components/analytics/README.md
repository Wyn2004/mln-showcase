# Analytics Components - Quy Luật Giá Trị

Trang mô phỏng Quy Luật Giá Trị trong Kinh Tế Chính Trị Mác-Lênin với phong cách **vừa retro vừa hiện đại**.

## 🎨 Design Philosophy

**Revolutionary Retro meets Modern Interactivity**
- Kết hợp phong cách cổ điển cách mạng với UX hiện đại
- Màu sắc gradient: Blue, Indigo, Purple, Pink, Red, Orange
- Border dày (4px-8px) với offset box shadows
- Serif fonts cho vintage feel
- Smooth animations và transitions

## 📁 Cấu Trúc Components

### Components (`components/`)

1. **HeroSection.tsx** - Hero section với animated title
   - Gradient background: blue-900 → indigo-800 → purple-900
   - Animated icons: ⏱️ 🎓 💪 ⚡ (4 yếu tố L, P, D, Q)
   - Decorative stars với animations
   
2. **IntroSection.tsx** - Giới thiệu với Alert component
   - ✨ Alert box với icon Lightbulb
   - Vintage paper styling
   - Grid layout với text và image
   
3. **FactorsSection.tsx** - 4 yếu tố L, P, D, Q
   - 📊 Grid overview cards (2x2 hoặc 4 cột)
   - 📂 **Accordion** cho chi tiết từng yếu tố
   - Color-coded: Red (L), Blue (P), Orange (D), Green (Q)
   
4. **DiagramSection.tsx** - Sơ đồ mô phỏng
   - 🖼️ Hiển thị ảnh `/images/analytics/anh1.png`
   - 🔍 **Dialog** để phóng to ảnh
   - Hover effect với zoom button
   - Key points: Input/Output cards
   
5. **FormulasSection.tsx** - Công thức tính toán
   - 📑 **Tabs** để chuyển đổi giữa 5 công thức
   - Formula display với amber background
   - Variables explanation với badges
   
6. **PriceValueSection.tsx** - Quan hệ giá trị - giá cả
   - 🖼️ Hiển thị ảnh `/images/analytics/anh2.png`
   - 📊 Bảng market conditions (3 tình trạng)
   - Color-coded: Green (Cân bằng), Red (Khan hiếm), Blue (Dư thừa)
   
7. **ExamplesSection.tsx** - Ví dụ minh họa
   - 🔽 **Collapsible** cho từng ví dụ
   - Scenarios với giá trị và kết quả
   - Conclusion box cho mỗi ví dụ
   
8. **ImpactsSection.tsx** - Tác động của quy luật
   - 🖼️ Hiển thị ảnh `/images/analytics/anh3.png`
   - 📂 **Accordion** cho 3 tác động cơ bản
   - Icons: ⚖️ (Điều tiết), 🔧 (Cải tiến), 📊 (Phân hóa)
   
9. **ConclusionSection.tsx** - Kết luận
   - Gradient background: red-900 → orange-800 → yellow-700
   - Quote box nổi bật
   - 📑 **Tabs** cho Doanh nghiệp vs Nhà nước
   - Animated stars

### Data (`data/`)

- `data.ts` - Cấu trúc dữ liệu:
  ```typescript
  interface Factor {
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
  
  interface Formula {
    id: string;
    name: string;
    formula: string;
    description: string;
    variables: { symbol: string; meaning: string }[];
  }
  
  interface MarketCondition {
    condition: string;
    supply: string;
    demand: string;
    priceVsValue: string;
    result: string;
    action: string;
  }
  
  interface Example {
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
  
  interface Impact {
    title: string;
    description: string;
    details: string[];
    icon: string;
  }
  ```

- `quy-luat-gia-tri.md` - Nội dung markdown gốc

## 🎯 Tính Năng Tương Tác

### 1. Factors Section
- **Grid Cards**: Hover để scale up
- **Accordion**: Click để mở rộng/thu gọn chi tiết từng yếu tố
- Color-coded theo từng yếu tố

### 2. Diagram Section
- **Dialog**: Click "Phóng to xem chi tiết" để xem ảnh lớn
- **Hover Effect**: Overlay với button xuất hiện khi hover
- Corner decorations

### 3. Formulas Section
- **Tabs**: Chuyển đổi giữa 5 công thức
- Formula display với background nổi bật
- Variables với badges

### 4. Price-Value Section
- **Dialog**: Phóng to biểu đồ dao động giá cả
- **Table**: 3 market conditions với color-coded
- Icons: TrendingUp, TrendingDown, Minus

### 5. Examples Section
- **Collapsible**: Click để mở rộng từng ví dụ
- Scenarios với giá trị và kết quả
- Conclusion box

### 6. Impacts Section
- **Dialog**: Phóng to biểu đồ tác động
- **Accordion**: 3 tác động cơ bản
- Chi tiết với bullet points

### 7. Conclusion Section
- **Tabs**: Doanh nghiệp vs Nhà nước
- Quote box nổi bật
- Animated stars

## 🖼️ Images Used

### From `/images/analytics/`:
- `anh1.png`: Sơ đồ mô phỏng quy luật giá trị (DiagramSection)
- `anh2.png`: Biểu đồ dao động giá cả (PriceValueSection)
- `anh3.png`: Biểu đồ tác động các yếu tố (ImpactsSection)

### From `/images/lummi/`:
- `mln1.png`: Ảnh minh họa trong IntroSection

## 🛠️ shadcn/ui Components

-   **Dialog**: Modal popup cho phóng to ảnh
-   **Accordion**: Nội dung có thể mở rộng/thu gọn
-   **Tabs**: Chuyển đổi giữa các phần nội dung
-   **Collapsible**: Thu gọn/mở rộng từng item
-   **Alert**: Thông báo quan trọng
-   **Card**: Container cho nội dung
-   **Badge**: Labels cho variables và factors
-   **Button**: Nút bấm với variants

## 🎨 Color Scheme

### Gradient Backgrounds:
- **Hero**: `from-blue-900 via-indigo-800 to-purple-900`
- **Intro**: `from-amber-50 to-white`
- **Factors**: `from-white to-slate-50`
- **Diagram**: `from-slate-50 to-blue-50`
- **Formulas**: `from-blue-50 to-indigo-50`
- **Price-Value**: `from-indigo-50 to-purple-50`
- **Examples**: `from-purple-50 to-pink-50`
- **Impacts**: `from-pink-50 to-red-50`
- **Conclusion**: `from-red-900 via-orange-800 to-yellow-700`

### Factor Colors:
- **L (Lao động)**: Red
- **P (Phức tạp)**: Blue
- **D (Cường độ)**: Orange
- **Q (Năng suất)**: Green

## 📖 Usage

```tsx
import LawOfValuePage from "@/app/quy-luat-gia-tri/page";

// Hoặc import từng component riêng:
import HeroSection from "@/components/analytics/components/HeroSection";
import FactorsSection from "@/components/analytics/components/FactorsSection";
```

## 🚀 Navigation

Trang được thêm vào:
1. **Header** (Desktop & Mobile): Link "Quy Luật Giá Trị"
2. **Homepage** (FeaturesSection): Card thứ 3 với icon TrendingUp

## 📊 Visual Effects

1. **Box Shadows**: Offset shadows (4px-12px) cho depth
2. **Borders**: Thick borders (4px-8px) với màu tương phản
3. **Patterns**: Repeating linear gradients cho texture
4. **Stars**: Decorative stars (★) với opacity và animation
5. **Hover Effects**: Scale, color transitions, cursor changes
6. **Animations**: Framer Motion với stagger effects
7. **Interactive States**: Ring effects, background changes
8. **Gradients**: Multi-color gradients cho backgrounds

## 🎯 Responsive Design

- **Mobile**: Single column, smaller text, stacked layout
- **Tablet**: 2 columns cho grids
- **Desktop**: Full layout với 3-4 columns

## ✨ Key Features

- ✅ Phong cách vừa retro vừa hiện đại
- ✅ Tương tác cao với Dialog, Accordion, Tabs, Collapsible
- ✅ 3 ảnh analytics được sử dụng đúng vị trí
- ✅ Color-coded theo từng yếu tố và section
- ✅ Smooth animations với Framer Motion
- ✅ Responsive design
- ✅ Serif fonts cho vintage feel
- ✅ Decorative elements (stars, corners, waves)

