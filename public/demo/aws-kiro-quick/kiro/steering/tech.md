---
inclusion: always
---

# Công nghệ

- Java 21, Quarkus 3.x, Maven. Chạy dev: `mvn quarkus:dev`. Test: `mvn -q test`.
- REST: `quarkus-rest` + `quarkus-rest-jackson`. Không dùng Spring annotation.
- Tiền tệ: dùng `java.math.BigDecimal`, scale 0 cho VND, làm tròn `RoundingMode.HALF_UP`. Tuyệt đối không dùng `double` cho tiền.
- Test: JUnit 5 + RestAssured (`@QuarkusTest`). Logic tính toán thuần phải có test đơn vị không cần khởi động Quarkus.
- Property-based test: dùng `net.jqwik:jqwik` cho các bất biến (phí không âm, phí tăng theo giá trị giao dịch…).
- Lỗi nghiệp vụ: ném `BusinessException(code, message)` → mapper trả HTTP 400 với body `{code, message}`.
- Không thêm dependency mới ngoài các thứ trên nếu chưa hỏi.
