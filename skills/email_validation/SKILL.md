---
name: email_validation
description: >
  Verify email addresses with MX checking. Free. No API key.
  Use when user ask "is email valid", "check if email is real".
---

# Email Validation

Real-time email address verification with MX record checking.

## APIs

### mailvalidate.org
- **Endpoint**: `https://mailvalidate.org/api/validate`
- **Method**: GET
- **Auth**: None (free tier: 20/hour)
- **Docs**: https://mailvalidate.org/

| Parameter | Type | Description |
|-----------|------|-------------|
| email | string | Email address to validate |

### disposableemailchecker.com
- **Endpoint**: `https://disposableemailchecker.com/api/check`
- **Method**: GET
- **Auth**: None
- **Docs**: https://disposableemailchecker.com/

## Example Queries

- "Is this email valid: contact@company.io"
- "Check if user@gmail.com is a disposable email"
- "Verify email format and MX records"

## Response

```json
{
  "email": "test@example.com",
  "valid": true,
  "format_valid": true,
  "domain_valid": true,
  "mx_records": ["mail.example.com"],
  "is_disposable": false,
  "is_free_provider": false
}
```

## Use Cases

- Form validation on signup
- Detect disposable/temporary emails
- Verify email deliverability
- Filter free provider emails (gmail, yahoo)

## Token Savings

15-30x vs LLM reasoning for email validation.