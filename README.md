# 🚗 Car Inspection – Next.js + MongoDB

Dùng kiểm tra xe đơn giản, trực quan, được xây dựng bằng **Next.js 14 (App Router)** và **MongoDB**.  
Cho phép quản lý danh sách xe, gán tiêu chí kiểm tra và điều hướng đến trang kiểm định.

🌐 **Dùng thử:** [https://car-inspection-zeta.vercel.app](https://car-inspection-zeta.vercel.app)

---

## ✨ Tính năng

- 📋 Danh sách xe và trạng thái kiểm tra
- ✅ Gán tối đa 5 tiêu chí kiểm định cho từng xe
- 🔄 Chuyển hướng tự động sau khi gán tiêu chí
- 🖥️ Giao diện tối giản sử dụng Tailwind CSS

---

## 🛠️ Công nghệ sử dụng

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

## ⚙️ Cấu hình môi trường

Trước khi chạy ứng dụng, bạn cần cấu hình MongoDB như sau:

1. Tạo file `.env.local` ở thư mục gốc dự án.
2. Dán dòng sau vào:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```
## 🚀 Cách chạy dự án
Clone repo và khởi chạy local development server:
```
git clone https://github.com/your-username/car-inspection-app.git
cd car-inspection
npm install
npm run dev

```
👉 Truy cập tại: [http://localhost:3000](http://localhost:3000)
