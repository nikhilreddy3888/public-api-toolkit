---
name: market_brief
description: >
  Multi-step market snapshot. Combines crypto + currency + stock.
  Use when user ask about market overview, crypto + fiat + stocks.
---

Market brief. Composes other skills.

## How it works

1. Get top crypto prices
2. Get major FX rates
3. Get stock indices if available
4. Return combined market snapshot

## Example

```json
{}
```

Returns: BTC, ETH prices, USD/EUR/GBP rates, S&P/ NASDAQ if available.

## Composed from

- crypto
- currency
- stock_market