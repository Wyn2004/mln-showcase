# So Sánh Tư Bản Chủ Nghĩa và Xã Hội Chủ Nghĩa

## Revolutionary Retro Design Style

Trang này được thiết kế với phong cách **Revolutionary Retro** - kết hợp giữa thiết kế cổ điển cách mạng với các hiệu ứng hiện đại.

## Cấu trúc Components

### 1. **HeroSection.tsx**
- Hero section với tiêu đề lớn, màu đỏ và vàng đặc trưng
- Hiệu ứng pattern retro ở background
- Các ngôi sao trang trí
- Wave effect ở cuối section

### 2. **IntroSection.tsx**
- Phần giới thiệu với style giấy vintage
- Border và shadow theo phong cách retro
- Sử dụng ảnh từ `/images/lummi/`
- Typography với first-letter styling

### 3. **SystemSection.tsx**
- Component tái sử dụng cho cả TBCN và XHCN
- Props: `title`, `sections`, `color` (red/yellow), `images`
- Hiển thị các đặc điểm của từng hệ thống
- Ảnh từ `/images/lummi/`

### 4. **ComparisonTable.tsx**
- Bảng so sánh chi tiết giữa hai hệ thống
- Grid layout 3 cột: Tiêu chí | TBCN | XHCN
- Màu sắc phân biệt rõ ràng
- Hover effects
- Summary box ở cuối

### 5. **VietnamSection.tsx**
- Phần về mô hình Việt Nam
- Sử dụng ảnh từ `/images/compare/`
- Màu cờ Việt Nam (đỏ và vàng)
- Challenges section với grid layout

### 6. **ConclusionSection.tsx**
- Kết luận với background gradient đỏ-vàng
- Quote box nổi bật
- Animated stars
- Final message với style retro

## Data Structure

File `data/data.ts` chứa:
- `comparisonData`: Dữ liệu bảng so sánh
- `capitalismSections`: Nội dung về TBCN
- `socialismSections`: Nội dung về XHCN
- `vietnamModel`: Mô hình Việt Nam
- `introduction`: Phần mở đầu
- `conclusion`: Phần kết luận

## Color Scheme

### Revolutionary Retro Palette:
- **Red**: `#991B1B`, `#DC2626`, `#EF4444` (Đỏ cách mạng)
- **Yellow**: `#CA8A04`, `#EAB308`, `#FDE047` (Vàng ngôi sao)
- **Amber**: `#78350F`, `#92400E`, `#B45309` (Nâu vintage)
- **Background**: Gradients từ red → amber, yellow → white

## Typography

- **Font Family**: `serif` cho text chính (vintage feel)
- **Headings**: Bold, uppercase, với text-shadow
- **Body**: Justified text alignment
- **First Letter**: Enlarged và styled

## Visual Effects

1. **Box Shadows**: Offset shadows (8px, 12px, 16px) cho depth
2. **Borders**: Thick borders (4px, 6px, 8px) với màu tương phản
3. **Patterns**: Repeating linear gradients cho texture
4. **Stars**: Decorative stars (★) với opacity và animation
5. **Hover Effects**: Scale, color transitions
6. **Animations**: Framer Motion với stagger effects

## Images Used

### From `/images/lummi/`:
- `mln1.png` - `mln8.png`: Ảnh minh họa chung

### From `/images/compare/`:
- `download.png`: Mô hình kinh tế Việt Nam
- `download (3).png`: Phát triển Việt Nam

## Responsive Design

- **Mobile**: Single column, smaller text, stacked images
- **Tablet**: 2 columns cho grids
- **Desktop**: Full layout với multiple columns

## Usage

```tsx
import ComparePage from "@/app/so-sanh-tbcn-xhcn/page";

// Hoặc import từng component riêng:
import HeroSection from "@/components/compare/components/HeroSection";
import ComparisonTable from "@/components/compare/components/ComparisonTable";
```

## Customization

Để thay đổi màu sắc, chỉnh sửa các giá trị trong components:
- `from-red-900` → màu gradient start
- `border-red-700` → màu border
- `text-yellow-300` → màu text

Để thay đổi nội dung, chỉnh sửa file `data/data.ts`.

