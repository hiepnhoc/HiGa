# Bộ demo Amazon Quick cho phòng chuỗi cung ứng

Tất cả dữ liệu ở đây là **giả lập**. Công ty Bao bì Mẫu, các nhà cung cấp NCC-A đến NCC-F và mọi con số
đều không có thật. Bốn demo dùng chung một câu chuyện: công ty sản xuất bao bì, nguyên liệu chính là hạt
nhựa PP, mua từ 3 nhà cung cấp.

| File | Dùng cho |
|---|---|
| `nha-cung-cap-hat-nhua-pp.csv` | Space, Research |
| `hop-dong-nha-cung-cap-tom-tat.md` | Space, Research |
| `ton-kho-hat-nhua-pp.csv` | Space, Research, Flows |
| `ton-kho-don-hang-12-tuan.csv` | Quick Sight (6 mặt hàng × 12 tuần, tuần 42–53/2026) |

Thứ tự trên sân khấu, khoảng 15 phút: **Space → Research → Quick Sight → Flows**.

Giao diện thật có thể khác ảnh chụp trong slide; tối nay làm thử từng bước một lần.

---

## 1. Space: hỏi đáp trên tài liệu của phòng (3 phút)

**Chuẩn bị:** tạo Space **Chuỗi cung ứng – demo**, upload 3 file đầu (không upload file 12 tuần). Chờ
các file ở trạng thái *Ready*.

**Trên sân khấu:** mở Space, cho xem 3 file, rồi chat trong Space đó:

| Câu hỏi | Câu trả lời đúng (để tự kiểm tra) |
|---|---|
| Hợp đồng với NCC-A phạt giao trễ thế nào? | 0,5% giá trị lô mỗi tuần trễ, tối đa 5%; bất khả kháng (thiên tai, đình công cảng, thiếu tàu ngoài kiểm soát) được miễn |
| Nhà cung cấp nào lead time ngắn nhất, còn nhận thêm được bao nhiêu? | NCC-C, 1 tuần, còn khoảng 60 tấn/tháng |
| So sánh NCC-A và NCC-B về tỷ trọng, lead time và giao đúng hạn. | A: 50%, 6 tuần, 88%. B: 30%, 4 tuần, 95% |
| Hợp đồng nào sắp hết hạn? | NCC-A, hết 31/12/2026, phải đàm phán gia hạn trước 30/11/2026 |

**Điểm nói:** câu trả lời có trích dẫn về đúng file; agent chỉ trả lời trong phạm vi Space.

---

## 2. Quick Research: đánh giá rủi ro nguồn cung (5 phút)

Chi tiết, đề tài dán sẵn và đáp án: [research.md](research.md). Chạy **từ tối nay**, trên sân khấu chỉ
cho xem bước lập kế hoạch rồi mở báo cáo đã chạy.

---

## 3. Quick Sight: hỏi số liệu tồn kho bằng câu thường (4 phút)

**Chuẩn bị:**

1. Vào Quick Sight, tạo dataset mới bằng cách upload file `ton-kho-don-hang-12-tuan.csv`. Kiểm tra cột
   `ton_dau_ky`, `nhu_cau`, `hang_ve`, `ton_cuoi_ky`, `muc_toi_thieu`, `so_lo_giao_tre` là kiểu số.
2. Tạo analysis từ dataset. Nếu có **Generate Analysis**, gõ mô tả:
   ```
   Dashboard tồn kho theo tuần: biểu đồ đường tồn cuối kỳ so với mức tối thiểu cho từng mặt hàng,
   bảng các mặt hàng có tồn cuối kỳ dưới mức tối thiểu, và tổng số lô giao trễ theo nhà cung cấp.
   Có bộ lọc theo nhóm hàng.
   ```
   Không có thì dựng tay 3 visual trên.
3. Publish thành dashboard. Nếu muốn hỏi bằng câu thường, tạo **Topic** từ dataset này.

**Trên sân khấu:** mở dashboard, rồi hỏi:

| Câu hỏi | Câu trả lời đúng |
|---|---|
| Mặt hàng nào có tồn cuối kỳ dưới mức tối thiểu? Từ tuần nào? | Màng co, từ tuần 50 (11,3 tấn so với mức 12), tuần 53 còn 4,3 tấn |
| Nhà cung cấp nào giao trễ nhiều lô nhất? | NCC-E (màng co, 3 lô ở tuần 48, 50, 52); NCC-D có 1 lô (tuần 45) |
| Tồn kho hạt nhựa PP tuần 53 là bao nhiêu? | 495 tấn, trên mức 300 |

**Điểm nói:** người không biết làm báo cáo vẫn hỏi được số liệu; dashboard dựng từ một câu mô tả.

---

## 4. Quick Flows: báo cáo tồn kho mỗi sáng (3 phút)

**Chuẩn bị:** mở Flows, tạo flow mới bằng mô tả:

```
Mỗi sáng thứ Hai đến thứ Sáu lúc 8 giờ: đọc số liệu tồn kho hạt nhựa PP trong Space
"Chuỗi cung ứng – demo", liệt kê các tuần có tồn cuối kỳ dưới 300 tấn và các lô hàng sắp về trong
2 tuần tới (nhà cung cấp, số tấn). Trả về một bảng ngắn bằng tiếng Việt và một câu nhận xét.
```

Xem các bước Quick tạo ra, sửa nếu cần (ví dụ chọn đúng Space làm nguồn ở bước đọc dữ liệu), chạy thử
một lần, rồi đặt lịch.

**Trên sân khấu:** cho xem flow (các bước nhập liệu, xử lý, kết quả), bấm chạy, đọc kết quả.

**Đáp án:** với kế hoạch bình thường không tuần nào dưới 300 tấn. Hàng sắp về 2 tuần đầu (tuần 46–47):
NCC-B 80 tấn và NCC-C 25 tấn tuần 46; NCC-A 130 tấn và NCC-C 25 tấn tuần 47.

**Điểm nói:** việc lặp lại mỗi ngày được đóng gói thành flow, chia sẻ cho cả phòng, chạy theo lịch.
Nếu đã kết nối Outlook thì thêm bước gửi email kết quả; chưa kết nối thì bỏ qua.

---

## Dự phòng chung

- Chụp màn hình kết quả từng phần tối nay. Phần nào lỗi trên sân khấu thì chiếu ảnh và nói tiếp.
- Nếu Quick trả lời bằng tiếng Anh, hỏi thêm "trả lời bằng tiếng Việt".
- Câu trả lời của Quick khác đáp án: nói thẳng, đó là lý do mọi kết quả đều có trích dẫn để kiểm tra.
