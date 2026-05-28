# Production Risk

Trước thay đổi có rủi ro production, kiểm tra:

- Auth/permission
- Payment/contract/business-critical flow
- Data migration
- Analytics/reporting
- Admin destructive actions
- Environment variables
- Deployment/runtime config

Với rủi ro cao, agent phải nêu rõ assumption và cách rollback/kiểm chứng.
