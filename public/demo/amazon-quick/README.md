# Bộ demo Amazon Quick cho phòng chuỗi cung ứng

Tất cả dữ liệu ở đây là **giả lập**. Công ty Bao bì Mẫu, các nhà cung cấp NCC-A đến NCC-F và mọi con số
đều không có thật. Các demo dùng chung một câu chuyện: công ty sản xuất bao bì, nguyên liệu chính là hạt
nhựa PP, mua từ 3 nhà cung cấp.

| File | Dùng cho |
|---|---|
| `nha-cung-cap-hat-nhua-pp.csv` | Chat (đính kèm), Space, Chat agent, Research |
| `hop-dong-nha-cung-cap-tom-tat.md` | Space, Chat agent, Research |
| `ton-kho-hat-nhua-pp.csv` | Space, Chat agent, Research, Flows |
| `ton-kho-don-hang-12-tuan.csv` | Quick Sight (6 mặt hàng × 12 tuần, tuần 42–53/2026) |
| `email-mau.md` | Connector: 4 email gửi vào hộp thư demo |

Thứ tự trên sân khấu, khoảng 30 phút: **Chat → Space → Chat agent → Research → Quick Sight → Flows →
Connector (email, lịch)**,
cuối cùng hỏi nhu cầu cho Quick Automate.

Giao diện thật có thể khác ảnh chụp trong slide; tối nay làm thử từng bước một lần.

---

## 1. Chat: hỏi nhanh, đính kèm file ngay trong cuộc chat (3 phút)

**Chuẩn bị:** không cần gì, chỉ cần mở trang Chat của Quick.

**Trên sân khấu:**

1. Hỏi một câu chung, không đính kèm gì:
   ```
   Giải thích ngắn gọn lead time và safety stock khác nhau thế nào, cho ví dụ ngành bao bì.
   ```
2. Đính kèm file `nha-cung-cap-hat-nhua-pp.csv` vào ô chat rồi hỏi:
   ```
   Tóm tắt bảng này thành 3 ý. Nhà cung cấp nào rủi ro nhất về giao hàng, vì sao?
   ```
   **Đáp án:** NCC-A, vì chiếm 50% sản lượng, lead time dài nhất (6 tuần), giao đúng hạn thấp nhất
   (88%) và đã trễ 2 lô trong quý 3/2026.
3. Hỏi tiếp: `Viết email ngắn gửi NCC-A hỏi kế hoạch giao hàng tháng 12, giọng lịch sự.`

**Điểm nói:** file đính kèm trong chat chỉ dùng cho cuộc chat đó (tối đa 20 file). Muốn cả nhóm dùng
chung và lâu dài thì đưa tài liệu vào Space, phần tiếp theo.

---

## 2. Space: hỏi đáp trên tài liệu của phòng (3 phút)

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

## 3. Chat agent: trợ lý riêng cho phòng Mua hàng (4 phút)

**Chuẩn bị:** vào **Chat agents**, tạo agent mới:

- **Tên:** Trợ lý Mua hàng
- **Mô tả:** Trả lời câu hỏi về nhà cung cấp, hợp đồng và tồn kho hạt nhựa PP.
- **Hướng dẫn (instructions):**
  ```
  Bạn là trợ lý của phòng Mua hàng, Công ty Bao bì Mẫu.
  Chỉ trả lời dựa trên tài liệu trong Space "Chuỗi cung ứng – demo"; không có thông tin thì nói rõ là không có.
  Trả lời bằng tiếng Việt, ngắn gọn, ưu tiên dạng bảng khi so sánh.
  Khi nói về tồn kho, luôn so với mức tối thiểu 300 tấn.
  Cuối câu trả lời, gợi ý một việc phòng mua hàng nên làm tiếp.
  ```
- **Kiến thức:** chọn Space **Chuỗi cung ứng – demo**.
- Lưu, chat thử vài câu bên dưới. Nếu muốn, chia sẻ agent cho một đồng nghiệp (quyền viewer), nhớ chia
  sẻ luôn Space.

**Trên sân khấu:** mở agent, hỏi:

| Câu hỏi | Câu trả lời đúng |
|---|---|
| Tuần nào tồn kho PP thấp nhất trong 8 tuần tới? | Tuần 46 và 52 cùng thấp nhất, 465 tấn, vẫn trên mức 300 |
| Nếu NCC-A trễ, mình nên tăng ai? | NCC-B: được tăng tối đa 20% nếu báo trước 6 tuần; NCC-C: còn khoảng 60 tấn/tháng, giao 1 tuần |
| Giá PP tuần này bao nhiêu? | Agent nên nói tài liệu không có thông tin này (đúng như hướng dẫn) |

**Điểm nói:** cùng dữ liệu với Space, nhưng agent có "tính cách" và quy tắc riêng của phòng; tạo một lần,
chia sẻ cho cả phòng, sửa hướng dẫn thì mọi người dùng bản mới. Câu cuối cho thấy agent biết từ chối khi
tài liệu không có, thay vì bịa.

---

## 4. Quick Research: đánh giá rủi ro nguồn cung (5 phút)

Chi tiết, đề tài dán sẵn và đáp án: [research.md](research.md). Chạy **từ tối nay**, trên sân khấu chỉ
cho xem bước lập kế hoạch rồi mở báo cáo đã chạy.

---

## 5. Quick Sight: hỏi số liệu tồn kho bằng câu thường (4 phút)

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

## 6. Quick Flows: báo cáo tồn kho mỗi sáng (3 phút)

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

## 7. Connector: email và lịch họp (5 phút)

Quick có connector dựng sẵn cho **Gmail**, **Google Calendar** (từ 4/2026) và **Microsoft Outlook** (một
connector gồm cả email, lịch, danh bạ). Dùng bộ nào cũng được, nên dùng **tài khoản thử hoặc cá nhân**,
không dùng hộp thư công ty có dữ liệu thật.

**Chuẩn bị (tối nay):**

1. Kết nối: vào **Connectors** → tab **Available** → tìm **Gmail** và **Google Calendar** (hoặc
   **Microsoft Outlook**) → **Connect** → đăng nhập, cho phép quyền. Dùng *Default OAuth app*, không cần
   cấu hình gì thêm. Vào lại Connectors xem danh sách *actions* của từng connector (Get Emails, Create
   Draft, Send Email; Outlook có thêm Create Calendar Event, Find Meeting Times…) để quen giao diện.
   Outlook công ty mà báo lỗi khi đăng nhập là do tenant chặn ứng dụng ngoài, cần admin Microsoft 365
   cấp quyền; khi đó dùng Gmail cá nhân.
2. Tạo dữ liệu: gửi 4 email trong [email-mau.md](email-mau.md) từ một tài khoản khác tới hộp thư demo.

**Trên sân khấu,** trong Chat (hoặc trong agent Trợ lý Mua hàng):

| Câu lệnh | Kết quả mong đợi |
|---|---|
| Tìm các email có tiêu đề bắt đầu bằng [DEMO-NCC] trong 7 ngày qua, tóm tắt thành bảng: người gửi, nội dung chính, việc cần làm, hạn. | Bảng 4 dòng: NCC-A trễ lô tuần 49 (xin họp); NCC-B lô tuần 48 đúng hạn, muốn tăng thì xác nhận trước 20/11; NCC-C báo giá thêm 60 tấn, hiệu lực đến 30/11; Kho báo tồn 480 → 465 tấn |
| Dựa trên hợp đồng trong Space "Chuỗi cung ứng – demo", lô NCC-A trễ 3 tuần thì mình được phạt bao nhiêu? Trường hợp này có phải bất khả kháng không? | 0,5% × 3 tuần = 1,5% giá trị lô; lô 130 tấn × 1.150 USD = 149.500 USD → khoảng **2.242 USD**. Bảo trì nhà máy không nằm trong danh sách bất khả kháng (thiên tai, đình công cảng, thiếu tàu) nên vẫn phạt |
| Soạn **bản nháp** trả lời email của NCC-A: xác nhận đã nhận thông báo, nhắc điều khoản phạt 0,5%/tuần, đề nghị họp 30 phút. | Một draft trong hộp thư (Create Draft), chưa gửi. Mở Gmail/Outlook cho mọi người thấy draft |
| Tạo cuộc họp 30 phút ngày mai lúc 15:00, tiêu đề "Xử lý lô NCC-A giao trễ", nội dung tóm tắt email NCC-A, mời [email thử của mày]. | Sự kiện mới trên lịch. Mở lịch cho mọi người thấy |
| Tuần này lịch của tôi còn trống buổi nào để họp 1 tiếng? | Danh sách khung giờ trống (Outlook có action Find Meeting Times) |

**Điểm nói:**

- Một câu lệnh đi qua nhiều nơi: đọc email, đối chiếu hợp đồng trong Space, rồi soạn thư và đặt lịch.
- Thao tác ghi (gửi email, tạo lịch) chạy bằng quyền của chính người đăng nhập. Tối nay để ý xem Quick
  có hỏi xác nhận trước khi ghi không; khi demo ưu tiên **soạn nháp** thay vì gửi thẳng.
- Connector đọc/ghi dữ liệu trên ứng dụng khác; còn tài liệu cần hỏi đáp lâu dài thì đưa vào Space.

**Nếu tồn kho bị ảnh hưởng?** Hỏi thêm agent: *"Lô NCC-A tuần 49 dời sang tuần 52 thì tồn kho PP thấp
nhất là bao nhiêu, có dưới 300 tấn không?"* → thấp nhất **345 tấn ở tuần 50**, vẫn trên 300.

**Nối với Flows (tuỳ chọn):** thêm vào flow báo cáo tồn kho buổi sáng một bước *gửi kết quả qua email
cho chính mình*.

---

## 8. Quick Automate: lấy nhu cầu, xây sau

Không demo. Cuối buổi hỏi phòng 4 câu để chọn quy trình đầu tiên:

1. Việc nào lặp lại nhiều nhất mỗi tuần, đi qua nhiều người hoặc nhiều hệ thống? (ví dụ đối chiếu đơn
   mua hàng, phiếu nhập kho, hoá đơn)
2. Dữ liệu đầu vào nằm ở đâu: email, Excel, ERP, cổng nhà cung cấp?
3. Bước nào cần người duyệt, ai duyệt, sai lệch bao nhiêu thì phải duyệt?
4. Mỗi tháng có khoảng bao nhiêu hồ sơ, mỗi hồ sơ mất bao lâu làm tay?

Ghi lại, chọn một quy trình đủ rõ để làm thử. Lưu ý: theo trang giá hiện tại, Quick Automate cần gói
Enterprise.

---

## Dự phòng chung

- Chụp màn hình kết quả từng phần tối nay. Phần nào lỗi trên sân khấu thì chiếu ảnh và nói tiếp.
- Nếu Quick trả lời bằng tiếng Anh, hỏi thêm "trả lời bằng tiếng Việt".
- Câu trả lời của Quick khác đáp án: nói thẳng, đó là lý do mọi kết quả đều có trích dẫn để kiểm tra.
- Research, Flows và agent đều tính agent hours; chạy thử tối nay vừa đủ, đừng chạy lại nhiều lần.
