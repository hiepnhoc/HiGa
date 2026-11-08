# Bộ demo Amazon Quick cho phòng chuỗi cung ứng

Tất cả dữ liệu ở đây là **giả lập**. Công ty Bao bì Mẫu, các nhà cung cấp NCC-A đến NCC-F và mọi con số
đều không có thật. Các demo dùng chung một câu chuyện: công ty sản xuất bao bì, nguyên liệu chính là hạt
nhựa PP, mua từ 3 nhà cung cấp.

| File | Dùng cho |
|---|---|
| `nha-cung-cap-hat-nhua-pp.csv` | Chat (đính kèm), Space, Chat agent, Apps, Research |
| `hop-dong-nha-cung-cap-tom-tat.md` | Space, Chat agent, Research |
| `ton-kho-hat-nhua-pp.csv` | Space, Chat agent, Research, Flows |
| `ton-kho-don-hang-12-tuan.csv` | Quick Sight (6 mặt hàng × 12 tuần, tuần 42–53/2026) |
| `email-mau.md` | Connector: 4 email gửi vào hộp thư demo |

Thứ tự trên sân khấu, khoảng 35 phút: **Chat → Space → Chat agent → Apps → Research → Quick Sight →
Flows → Connector (email, lịch)**,
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

## 4. Apps: app chấm điểm nhà cung cấp (5 phút)

App nhỏ tạo bằng mô tả, không cần code. Mỗi app có sẵn chỗ lưu dữ liệu (dùng chung cho mọi người dùng app),
đọc được Space, nhúng được biểu đồ Quick Sight. Cần quyền Author/Professional trở lên để tạo.

**Chuẩn bị:** vào **Apps** ở thanh bên trái, dán mô tả vào ô nhập, bấm **Generate**:

```
Tạo app "Đánh giá nhà cung cấp" cho phòng Mua hàng Công ty Bao bì Mẫu.

- Form chấm điểm một nhà cung cấp: chọn nhà cung cấp (NCC-A, NCC-B, NCC-C), kỳ đánh giá (ví dụ Q4/2026),
  người đánh giá, và 4 tiêu chí chấm từ 1 đến 5: Giao hàng đúng hạn (trọng số 35%), Chất lượng (30%),
  Giá (20%), Phản hồi và hỗ trợ (15%), kèm ô nhận xét.
- Tự tính điểm tổng có trọng số (thang 5, làm tròn 2 số lẻ) và xếp loại: từ 4,0 trở lên là "Ưu tiên",
  từ 3,0 đến dưới 4,0 là "Theo dõi", dưới 3,0 là "Cần cải thiện".
- Lưu mỗi lần đánh giá vào bộ nhớ dùng chung để cả phòng cùng xem.
- Trang "Bảng xếp hạng": bảng các nhà cung cấp theo điểm mới nhất, có màu theo xếp loại, và biểu đồ cột so sánh điểm.
- Nút "AI nhận xét": tóm tắt điểm mạnh, điểm yếu của nhà cung cấp đang chọn, dựa trên điểm, nhận xét
  và tài liệu trong Space "Chuỗi cung ứng – demo".
- Giao diện tiếng Việt, gọn, dùng tốt trên laptop.
```

Xem bản xem trước bên trái; sửa bằng chat bên phải nếu cần, ví dụ:
*"Thêm nút xuất bảng xếp hạng ra CSV"*, *"Đổi màu xếp loại Ưu tiên sang xanh lá"*.

Nhập thử 3 lượt đánh giá:

| Nhà cung cấp | Đúng hạn | Chất lượng | Giá | Phản hồi | Nhận xét |
|---|---|---|---|---|---|
| NCC-A | 3 | 5 | 4 | 3 | Chất lượng ổn định nhưng trễ 2 lô quý 3, sắp trễ lô tuần 49 |
| NCC-B | 5 | 4 | 4 | 4 | Giao đúng hạn, có thể tăng 20% khối lượng |
| NCC-C | 5 | 4 | 3 | 5 | Giao nhanh 1 tuần, giá cao hơn hàng nhập 3–5% |

**Đáp án:** NCC-B **4,35** (Ưu tiên), NCC-C **4,30** (Ưu tiên), NCC-A **3,80** (Theo dõi).

Xong thì **Publish**, rồi **Share** cho một đồng nghiệp (Viewer) hoặc bật *Share with all*.

**Trên sân khấu:** mở app đã publish, nhập thêm một lượt đánh giá trực tiếp (ví dụ NCC-A kỳ sau, đúng hạn
2 điểm), cho mọi người thấy bảng xếp hạng cập nhật; bấm "AI nhận xét" cho NCC-A. Nếu còn thời gian, mở
editor, gõ một yêu cầu sửa nhỏ để thấy app đổi ngay.

**Điểm nói:** form, bảng, biểu đồ thường phải nhờ IT làm, giờ người trong phòng tự mô tả là có; sửa một
lần, publish lại thì cả phòng dùng bản mới. Mỗi lần agent sửa app là một version, lỡ hỏng thì khôi phục
version cũ.

---

## 5. Quick Research: đánh giá rủi ro nguồn cung (5 phút)

Chi tiết, đề tài dán sẵn và đáp án: [research.md](research.md). Chạy **từ tối nay**, trên sân khấu chỉ
cho xem bước lập kế hoạch rồi mở báo cáo đã chạy.

---

## 6. Quick Sight: hỏi số liệu tồn kho bằng câu thường (4 phút)

**Lưu ý dữ liệu:** 6 mặt hàng khác đơn vị (tấn và cái: thùng carton, nhãn in tính bằng chục nghìn cái), vẽ
chung số lượng thì các mặt hàng tính bằng tấn nằm sát 0. File đã có sẵn 2 cột để tránh chuyện đó:

- `ty_le_so_voi_toi_thieu_pct`: tồn cuối kỳ chia mức tối thiểu, tính %. Dưới 100 là thiếu.
- `canh_bao`: "Dưới mức tối thiểu" hoặc "Đủ".

**Chuẩn bị:**

1. Vào Quick Sight, tạo dataset bằng cách upload `ton-kho-don-hang-12-tuan.csv` (nếu đã có dataset cũ thì
   thay file hoặc tạo dataset mới). Kiểm tra các cột số (`ton_cuoi_ky`, `muc_toi_thieu`,
   `so_lo_giao_tre`, `ty_le_so_voi_toi_thieu_pct`…) là kiểu số; `tuan` để kiểu chuỗi.
2. Tạo analysis. Nếu có **Generate Analysis**, gõ:
   ```
   Dashboard tồn kho theo tuần, 3 visual:
   1. Biểu đồ đường: trục X là tuan, trục Y là SUM của ty_le_so_voi_toi_thieu_pct, mỗi đường một ten_hang,
      thêm đường tham chiếu ở 100.
   2. Bảng chi tiết (không gộp nhóm, không đếm): tuan, ten_hang, nha_cung_cap, ton_cuoi_ky, muc_toi_thieu,
      don_vi; chỉ lấy các dòng có canh_bao = "Dưới mức tối thiểu".
   3. Biểu đồ cột: SUM của so_lo_giao_tre theo nha_cung_cap.
   Thêm bộ lọc theo nhom_hang.
   ```
3. Kiểm tra lại từng visual, sửa tay nếu cần:
   - **Biểu đồ đường** đang vẽ số lượng thô: đổi Y sang `ty_le_so_voi_toi_thieu_pct` (Sum). Hoặc giữ số
     lượng nhưng thêm bộ lọc `don_vi = tấn`.
   - **Bảng** hiện toàn số 12: là đang *đếm* (Count) theo nhóm. Đổi visual sang dạng bảng chi tiết, hoặc để
     các cột số ở ô *Value* với kiểu **Sum** thay vì Count. Thêm filter `canh_bao` = *Dưới mức tối thiểu*.
4. Publish thành dashboard và **bật hỏi đáp**: trong analysis bấm **Publish** → tab *Replace existing
   dashboard* (hoặc *New dashboard*). Giao diện thử ngày 08/11/2026 không có ô "Allow data Q&A" như docs;
   hỏi đáp nằm ở mục *Generative capabilities* → **Manage Q&A** → chọn *Use datasets for Build visual and
   Q&A* + *All datasets* (không tick "insight summaries from Q Business") → **APPLY CHANGES** →
   **Publish dashboard**. Nếu thấy ô "Allow data Q&A" thì tick.
   Trước khi publish: sửa tên analysis nếu bị lỗi font (hiện "\u1ed3…"), và đổi tiêu đề thẻ KPI "mặt hàng
   dưới mức tối thiểu" thành "số tuần có mặt hàng dưới mức tối thiểu" (con số 4 là 4 tuần của màng co). Sau đó trên đầu dashboard có ô **Ask a question about this dashboard** để hỏi. Không cần
   tạo Topic. Lưu ý: Q&A hỏi trên toàn bộ dataset, không chỉ phần đang hiện; tính năng này có phí bật
   (enablement fee) ở cấp tài khoản.

**Trên sân khấu:** mở dashboard, rồi hỏi:

| Câu hỏi | Câu trả lời đúng |
|---|---|
| Mặt hàng nào có tồn cuối kỳ dưới mức tối thiểu? Từ tuần nào? | Màng co, từ tuần 50: 11,3 tấn (94% mức tối thiểu), tuần 51 72%, tuần 52 54%, tuần 53 còn 4,3 tấn (36%) |
| Nhà cung cấp nào giao trễ nhiều lô nhất? | NCC-E (màng co, 3 lô ở tuần 48, 50, 52); NCC-D có 1 lô (tuần 45) |
| Tồn kho hạt nhựa PP tuần 53 là bao nhiêu? | 495 tấn, bằng 165% mức tối thiểu 300 |

Bảng "dưới mức tối thiểu" đúng phải có **4 dòng**, đều là màng co.

**Điểm nói:** người không biết làm báo cáo vẫn hỏi được số liệu; dashboard dựng từ một câu mô tả, nhưng vẫn
phải xem lại từng biểu đồ (ví dụ chọn đúng phép tính Sum/Count, đúng đơn vị).

---

## 7. Quick Flows: báo cáo tồn kho mỗi sáng (3 phút)

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

## 8. Connector: email và lịch họp (5 phút)

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

## 9. Quick Automate: lấy nhu cầu, xây sau

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
