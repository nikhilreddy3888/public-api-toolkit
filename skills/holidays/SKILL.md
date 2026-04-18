---
name: holidays
description: >
  Public holidays from Nager.Date API. Free. No API key.
  Use when user ask "is X a holiday", "holidays in Y country", "next holiday".
---

Public holidays. Free. No key.

## API

- By country/year: `https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}`
- Next holidays: `https://date.nager.at/api/v3/NextHolidays/{countryCode}`
- Country list: `https://date.nager.at/api/v3/AvailableCountries`

## Example

```json
{"year": 2024, "countryCode": "US"}
```

Returns: date, localName, name, fixed, global.

```json
{"countryCode": "US"}
```

Returns next 7 upcoming holidays.