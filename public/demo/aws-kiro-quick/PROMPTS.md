# Prompt gõ sẵn cho buổi demo

Copy từng khối, dán vào đúng chỗ. Thứ tự = thứ tự demo.

## 1. Kiro IDE — Spec-driven (chat, chọn "Spec")

```
Thêm endpoint POST /orders/quote để tính tiền cho một lệnh giao dịch.

Đầu vào: symbol, side (BUY|SELL), quantity, price (VND).
Đầu ra: grossValue, brokerageFee, sellTax, netAmount.
Dùng bảng phí có sẵn trong FeeResource (0,15% môi giới hai chiều; 0,1% thuế chỉ khi bán).
Quy tắc: quantity phải là bội số của 100 (lô chẵn), price > 0, symbol 3 ký tự chữ hoa.
Lỗi nghiệp vụ trả 400 với {code, message} tiếng Việt.
```

Khi Kiro hỏi có duyệt requirements không → **đọc to 2 acceptance criteria dạng EARS** rồi mới bấm duyệt.
Khi sang design → chỉ vào chỗ nó chọn BigDecimal + HALF_UP (do steering tech.md).
Khi sang tasks → bấm "Start task" cho task đầu tiên, để task sau chạy tiếp.

## 2. Kiro IDE — Sửa spec giữa chừng (cho thấy spec sống)

```
Bổ sung: cho phép lô lẻ (quantity < 100) nhưng thêm field oddLot = true vào response,
và cập nhật requirements/design/tasks cho khớp trước khi sửa code.
```

## 3. Kiro IDE — Hook (không cần gõ gì)

Mở `FeeResource.java`, đổi path `/fees` → `/fee-schedule`, lưu. Hook `update-api-docs`
tự chạy → mở `docs/API.md` cho mọi người xem nó đổi theo.

## 4. Kiro IDE — Steering (cho thấy convention được ép)

```
Viết thêm endpoint GET /orders/quote/{id} trả lại quote đã tính gần nhất.
```
Chỉ vào: DTO là record, tên *Response, có BusinessException, có test — không ai nhắc mà vẫn đúng.

## 5. Kiro CLI (terminal)

```
kiro-cli chat
```
rồi gõ:
```
Tóm tắt cho tôi spec trong .kiro/specs và task nào chưa xong.
```
(đọc cùng steering & spec với IDE — một harness, nhiều bề mặt)

## 6a. Kiro Crew — lesson (chat trên dashboard)

```
Từ giờ với workspace này: báo cáo bằng tiếng Việt, luôn chạy mvn -q test trước khi nói "xong".
```
→ `kirocrew learn list` cho thấy lesson vừa được ghi.

## 6b. Kiro Crew — subagent song song

```
Chạy song song hai việc: (a) nghiên cứu cách viết property-based test với jqwik cho hàm tính phí,
(b) viết thêm test lô lẻ cho OrderQuoteService. Gom kết quả về đây.
```
→ mở Activity view: hai subagent, mỗi agent một card, tool call hiện theo thời gian thực.

## 7. Kiro Crew — lịch (terminal)

```
kirocrew cron add "morning-digest" "Kiểm tra PR mở của repo này, test nào đỏ, issue mới; viết digest tiếng Việt ngắn gọn, gạch đầu dòng việc cần tôi quyết." --cron "0 7 * * 1-5" --timezone "Asia/Ho_Chi_Minh"
kirocrew cron list
kirocrew cron trigger <id>
```

## 8. Kiro Crew — heartbeat (chat)

```
Theo dõi PR #1 của repo này, khi CI đổi trạng thái thì báo tôi kèm tóm tắt diff.
```

## 9. Kiro Crew — từ Slack / điện thoại

Nhắn vào DM của bot Crew:
```
Hôm qua tôi đã làm gì với fee-demo? Tóm tắt 5 dòng.
```

## 10a. Amazon Quick — Research (nếu có tài khoản)

Quick Research:
```
So sánh Kiro Crew với OpenClaw về bảo mật, mô hình mở, cách cài đặt. Trích dẫn nguồn.
```
## 10b. Amazon Quick — Flows

Quick Flows (mô tả bằng lời):
```
Mỗi sáng 8h: đọc các file trong Space "PTSPS demo", tóm tắt điểm mới, gửi vào email của tôi.
```
