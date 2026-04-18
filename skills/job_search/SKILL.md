---
name: job_search
description: >
  Job listings from Arbeitnow API. Free. No API key.
  Use when user ask about jobs, job search, hiring, job listings.
---

Job search. Free. No key.

## API

- List: `https://www.arbeitnow.com/api/job-board-api`
- Search: `https://www.arbeitnow.com/api/job-board-api?search={query}`
- By location: `https://www.arbeitnow.com/api/job-board-api?location={location}`

## Example

```json
{"query": "developer"}
```

Returns: job title, company, location, salary, posted_at.

```json
{"location": "remote"}
```

Returns: remote jobs.