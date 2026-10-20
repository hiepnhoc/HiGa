# Demo kit — Amazon Quick, Kiro IDE, Kiro Crew

Bộ file chuẩn bị cho buổi demo. Kịch bản chi tiết (thời lượng, nói gì, dự phòng) nằm ở
https://higa.pages.dev/work/ — bài "Kịch bản demo Kiro IDE, Kiro Crew, Amazon Quick".

## Tạo project demo (làm trước buổi demo, ~10 phút)

```bash
# 1. Quarkus project rỗng
quarkus create app vn.hiepln:fee-demo --extension=rest-jackson,junit5
cd fee-demo

# 2. jqwik cho property-based test (thêm vào pom.xml, scope test)
#    <dependency><groupId>net.jqwik</groupId><artifactId>jqwik</artifactId><version>(bản mới nhất trên Maven Central)</version><scope>test</scope></dependency>

# 3. Chép bộ kit
mkdir -p .kiro src/main/java/vn/hiepln/feedemo/api docs
cp -r <kit>/kiro/steering <kit>/kiro/hooks .kiro/
cp <kit>/src/FeeResource.java src/main/java/vn/hiepln/feedemo/api/
printf '# API\n\n| Method | Path | Mô tả |\n|---|---|---|\n| GET | /fees | Bảng phí |\n' > docs/API.md

# 4. Chạy thử một lần để Maven tải dependency (tránh chờ lúc demo)
mvn -q -o test || mvn -q test
git init && git add -A && git commit -m "chore: khởi tạo fee-demo cho buổi demo Kiro"
```

Mở folder bằng Kiro IDE → panel Kiro sẽ thấy 3 steering + 2 hook đã bật.

## Nội dung kit

```
kiro/steering/product.md     mục đích service, quy tắc thông điệp lỗi
kiro/steering/tech.md        Quarkus 3, BigDecimal, jqwik, BusinessException
kiro/steering/structure.md   layout package, quy ước DTO/test/commit
kiro/hooks/update-api-docs.json   agent hook: lưu *Resource.java → cập nhật docs/API.md
kiro/hooks/test-on-save.json      command hook: lưu domain/test → mvn -q -o test
src/FeeResource.java         code "có sẵn", chỉ có bảng phí
PROMPTS.md                   prompt gõ sẵn theo đúng thứ tự demo
```

## Kiro Crew (làm trước, ~15 phút)

```bash
curl -fsSL https://download.crew.kiro.dev/cli.sh | sh
kirocrew setup          # chọn data dir, backend = Kiro CLI, bỏ qua Slack nếu chưa có token
kirocrew doctor
kirocrew gateway        # để chạy trong một tab terminal riêng suốt buổi demo
kirocrew token          # link đăng nhập dashboard, mở sẵn trong trình duyệt
```

Trong dashboard, thêm workspace trỏ tới `fee-demo` — Crew đọc `.kiro/steering` sẵn có.
Slack: `kirocrew manifest -o slack-app.json` → tạo Slack app từ manifest → chạy lại
`kirocrew setup` để nhập token (hướng dẫn: kiro.dev/docs/crew/interfaces/slack/).
