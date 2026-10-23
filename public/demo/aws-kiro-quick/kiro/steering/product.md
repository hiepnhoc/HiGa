---
inclusion: always
---

# Sản phẩm: fee-demo

Service REST nhỏ dùng để demo nội bộ: tính phí và thuế cho một lệnh giao dịch chứng khoán.
Người dùng là dev, mục tiêu là minh hoạ quy trình spec-driven, không phải dùng cho prod.

- Đầu vào: mã cổ phiếu, loại lệnh (MUA / BAN), số lượng, giá khớp.
- Đầu ra: giá trị giao dịch, phí môi giới, thuế (chỉ khi bán), tổng tiền phải trả / nhận về.
- Số liệu là ví dụ công khai (phí 0,15%, thuế bán 0,1%), không phải biểu phí thật của công ty.
- Mọi thông điệp lỗi trả về tiếng Việt, mã lỗi tiếng Anh viết hoa (vd. INVALID_QUANTITY).
