---
inclusion: always
---

# Cấu trúc & quy ước

```
src/main/java/vn/hiepln/feedemo/
  api/        resource REST (*Resource.java) + DTO request/response (record)
  domain/     logic nghiệp vụ thuần Java (*Service.java), không import JAX-RS
  error/      BusinessException, ExceptionMapper
src/test/java/vn/hiepln/feedemo/
  domain/     test đơn vị + jqwik property test
  api/        @QuarkusTest cho endpoint
docs/API.md   bảng mô tả endpoint, cập nhật khi thêm/đổi API
.kiro/specs/<feature>/{requirements,design,tasks}.md
```

- DTO là Java `record`, tên kết thúc bằng `Request` / `Response`.
- Mỗi endpoint mới phải có: 1 test happy path, 1 test lỗi nghiệp vụ, 1 dòng trong `docs/API.md`.
- Commit message tiếng Việt, tiền tố `feat:` / `fix:` / `test:` / `docs:`.
