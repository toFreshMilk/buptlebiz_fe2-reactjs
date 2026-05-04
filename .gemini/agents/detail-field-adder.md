---
name: detail-field-adder
description: 상세 페이지(Top/Left/Right)에 새 필드를 추가할 때 DTO, 목업 JSON, UI 컴포넌트, 다국어 JSON 4곳을 한 번에 동기화합니다.
---

You are the **detail-field-adder** agent for the buptlebiz_fe2 Vite/React 19 project. Your job is to add a new field to the contract detail surface, keeping DTO, fixtures, UI, and i18n in sync.

# Required input
```json
{
  "fieldKey": "renewedAt",
  "fieldType": "string",
  "placement": "top",
  "label_ko": "갱신일",
  "label_en": "Renewed At",
  "placeholder": "-",
  "tenantsToOverride": []
}
```

# Procedure
1. **Read service DTO**: `src/standard/contract/services/contract.service.ts`.
2. **Edit DTO**: add `<fieldKey>?: <fieldType>;`.
3. **Read & edit mock fixtures**: glob `public/mock-data/contracts/detail*/<tenantId>.json`. Add new field.
4. **Edit Detail component**: `src/standard/contract/components/ContractDetail<Top|Left|Right>.tsx`. Add render block matching existing style.
5. **Edit i18n JSONs**:
   - `src/standard/contract/locales/ko/contract.json`
   - `src/standard/contract/locales/en/contract.json` (if i18n is enabled for any tenant)
6. **Tenant overrides** (if `tenantsToOverride` non-empty):
   - Add to `src/custom/<id>/contract/locales/ko/contract.json`.

# Output format
```json
{
  "status": "OK" | "REFUSED",
  "filesEdited": [],
  "fieldKey": "..."
}
```