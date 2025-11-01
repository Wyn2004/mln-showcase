# So Sánh Tư Bản Chủ Nghĩa và Xã Hội Chủ Nghĩa

## Revolutionary Retro Design Style

Trang này được thiết kế với phong cách **Revolutionary Retro** - kết hợp giữa thiết kế cổ điển cách mạng với các hiệu ứng hiện đại.

## Cấu trúc Components

### 1. **HeroSection.tsx**

-   Hero section với tiêu đề lớn, màu đỏ và vàng đặc trưng
-   Hiệu ứng pattern retro ở background
-   Các ngôi sao trang trí
-   Wave effect ở cuối section

### 2. **IntroSection.tsx**

-   Phần giới thiệu với style giấy vintage
-   Border và shadow theo phong cách retro
-   Sử dụng ảnh từ `/images/lummi/`
-   Typography với first-letter styling
-   **✨ NEW**: Alert component để hiển thị thông tin quan trọng

### 3. **SystemSection.tsx**

-   Component tái sử dụng cho cả TBCN và XHCN
-   Props: `title`, `sections`, `color` (red/yellow), `images`
-   Hiển thị các đặc điểm của từng hệ thống
-   **✨ NEW**: Carousel component để xem ảnh (swipe/click để chuyển)
-   **✨ NEW**: Accordion component để mở rộng/thu gọn nội dung từng phần

### 4. **ComparisonTable.tsx**

-   Bảng so sánh chi tiết giữa hai hệ thống
-   Grid layout 3 cột: Tiêu chí | TBCN | XHCN
-   Màu sắc phân biệt rõ ràng
-   **✨ NEW**: HoverCard - Hover vào ô để xem thông tin nhanh
-   **✨ NEW**: Dialog - Click icon ℹ️ để xem giải thích chi tiết
-   **✨ NEW**: Row selection - Click vào hàng để highlight
-   **✨ NEW**: Icons cho mỗi tiêu chí
-   Summary box ở cuối

### 5. **VietnamSection.tsx**

-   Phần về mô hình Việt Nam
-   Sử dụng ảnh từ `/images/compare/`
-   Màu cờ Việt Nam (đỏ và vàng)
-   **✨ NEW**: Tabs component để chuyển đổi giữa các phần
-   **✨ NEW**: Collapsible component cho challenges (click để mở rộng)

### 6. **ConclusionSection.tsx**

-   Kết luận với background gradient đỏ-vàng
-   Quote box nổi bật
-   Animated stars
-   Final message với style retro

## 🎯 Tính Năng Tương Tác Mới

### 1. **Bảng So Sánh (ComparisonTable)**

-   **Hover**: Di chuột vào bất kỳ ô nào để xem thông tin nhanh trong HoverCard
-   **Click ℹ️**: Nhấn vào icon thông tin để mở Dialog với giải thích chi tiết
-   **Click Row**: Nhấn vào hàng để highlight (ring effect)
-   **Icons**: Mỗi tiêu chí có icon riêng để dễ nhận biết

### 2. **Phần Hệ Thống (SystemSection)**

-   **Carousel**: Vuốt hoặc click mũi tên để xem các ảnh minh họa
-   **Accordion**: Click vào tiêu đề phần để mở rộng/thu gọn nội dung
-   Có thể mở nhiều phần cùng lúc (type="multiple")

### 3. **Phần Việt Nam (VietnamSection)**

-   **Tabs**: Chuyển đổi giữa các khía cạnh khác nhau của mô hình Việt Nam
-   **Collapsible**: Click vào thách thức để xem mô tả và giải pháp
-   Smooth animations khi chuyển tab

### 4. **Phần Giới Thiệu (IntroSection)**

-   **Alert**: Hiển thị thông tin quan trọng với icon BookOpen
-   Retro styling với border và shadow

## Data Structure

File `data/data.ts` chứa:

-   `comparisonData`: Dữ liệu bảng so sánh (với `details` và `icon` mới)
-   `capitalismSections`: Nội dung về TBCN
-   `socialismSections`: Nội dung về XHCN
-   `vietnamModel`: Mô hình Việt Nam
-   `introduction`: Phần mở đầu
-   `conclusion`: Phần kết luận

### Cấu trúc dữ liệu mới:

```typescript
interface ComparisonRow {
    criteria: string;
    capitalism: string;
    socialism: string;
    details?: string; // Thông tin chi tiết cho Dialog
    icon?: string; // Icon emoji cho tiêu chí
}
```

## Color Scheme

### Revolutionary Retro Palette:

-   **Red**: `#991B1B`, `#DC2626`, `#EF4444` (Đỏ cách mạng)
-   **Yellow**: `#CA8A04`, `#EAB308`, `#FDE047` (Vàng ngôi sao)
-   **Amber**: `#78350F`, `#92400E`, `#B45309` (Nâu vintage)
-   **Background**: Gradients từ red → amber, yellow → white

## Typography

-   **Font Family**: `serif` cho text chính (vintage feel)
-   **Headings**: Bold, uppercase, với text-shadow
-   **Body**: Justified text alignment
-   **First Letter**: Enlarged và styled

## 🛠️ shadcn/ui Components Được Sử Dụng

-   **Dialog**: Modal popup cho thông tin chi tiết
-   **HoverCard**: Tooltip nâng cao khi hover
-   **Accordion**: Nội dung có thể mở rộng/thu gọn
-   **Tabs**: Chuyển đổi giữa các phần nội dung
-   **Collapsible**: Thu gọn/mở rộng từng item
-   **Carousel**: Slideshow ảnh với điều hướng
-   **Alert**: Thông báo quan trọng
-   **Button**: Nút bấm với variants
-   **Card**: Container cho nội dung

## Visual Effects

1. **Box Shadows**: Offset shadows (8px, 12px, 16px) cho depth
2. **Borders**: Thick borders (4px, 6px, 8px) với màu tương phản
3. **Patterns**: Repeating linear gradients cho texture
4. **Stars**: Decorative stars (★) với opacity và animation
5. **Hover Effects**: Scale, color transitions, cursor changes
6. **Animations**: Framer Motion với stagger effects
7. **Interactive States**: Ring effects, background changes

## Images Used

### From `/images/lummi/`:

-   `mln1.png` - `mln8.png`: Ảnh minh họa chung

### From `/images/compare/`:

-   `download.png`: Mô hình kinh tế Việt Nam
-   `download (3).png`: Phát triển Việt Nam

## Responsive Design

-   **Mobile**: Single column, smaller text, stacked images
-   **Tablet**: 2 columns cho grids
-   **Desktop**: Full layout với multiple columns

## Usage

```tsx
import ComparePage from "@/app/so-sanh-tbcn-xhcn/page";

// Hoặc import từng component riêng:
import HeroSection from "@/components/compare/components/HeroSection";
import ComparisonTable from "@/components/compare/components/ComparisonTable";
```

## Customization

Để thay đổi màu sắc, chỉnh sửa các giá trị trong components:

-   `from-red-900` → màu gradient start
-   `border-red-700` → màu border
-   `text-yellow-300` → màu text

Để thay đổi nội dung, chỉnh sửa file `data/data.ts`.
