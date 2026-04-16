# Environment Variables

Public API Toolkit reads provider secrets from environment variables with the `PUBLIC_APIS_` prefix.

## Naming Rule

The server normalizes names into uppercase environment keys.

Examples:

- `FINNHUB` becomes `PUBLIC_APIS_FINNHUB`
- `FOODDATA_CENTRAL` becomes `PUBLIC_APIS_FOODDATA_CENTRAL`
- `CARBONINTERFACE` becomes `PUBLIC_APIS_CARBONINTERFACE`
- `OPEN_CHARGE_MAP` becomes `PUBLIC_APIS_OPEN_CHARGE_MAP`

## Set Variables Before Launch

macOS and Linux:

```bash
export PUBLIC_APIS_FRED="your-key"
export PUBLIC_APIS_OMDB="your-key"
export PUBLIC_APIS_TMDB="your-key"
```

fish:

```fish
set -x PUBLIC_APIS_FRED your-key
set -x PUBLIC_APIS_OMDB your-key
set -x PUBLIC_APIS_TMDB your-key
```

PowerShell:

```powershell
$env:PUBLIC_APIS_FRED = "your-key"
$env:PUBLIC_APIS_OMDB = "your-key"
$env:PUBLIC_APIS_TMDB = "your-key"
```

Restart the MCP client after changing keys so the launched process sees the new environment.

## Supported Keys

| Variable | Used By | Notes |
| --- | --- | --- |
| `PUBLIC_APIS_FINNHUB` | `public_api_stock_market` | Enables quote and symbol search |
| `PUBLIC_APIS_ALPHAVANTAGE` | `public_api_stock_market` | Alternative stock quote and symbol search provider |
| `PUBLIC_APIS_FRED` | `public_api_stock_market` | Required for `fred_series` |
| `PUBLIC_APIS_OMDB` | `public_api_movie_tv_data` | Required for the `omdb` action |
| `PUBLIC_APIS_TMDB` | `public_api_movie_tv_data` | Required for the `tmdb` action |
| `PUBLIC_APIS_CARBON_INTERFACE` | `public_api_carbon_footprint` | Primary Carbon Interface key name |
| `PUBLIC_APIS_CARBONINTERFACE` | `public_api_carbon_footprint` | Backward-compatible alternate key name |
| `PUBLIC_APIS_MAILCHECK` | `public_api_email_validation` | Enables Mailcheck.ai validation |
| `PUBLIC_APIS_KICKBOX` | `public_api_email_validation` | Enables Kickbox validation |
| `PUBLIC_APIS_NASA` | `public_api_space` | Optional override for the NASA demo key |
| `PUBLIC_APIS_OPEN_CHARGE_MAP` | `public_api_transport` | Required for EV charging lookups |
| `PUBLIC_APIS_FOODDATA_CENTRAL` | `public_api_health_data` | Required for USDA FoodData Central search |

## Behavior When A Key Is Missing

Public API Toolkit does not crash if a premium provider is unavailable.

Instead, the tool returns a structured message telling the agent which `PUBLIC_APIS_*` variable is missing. That keeps the rest of the server usable and makes setup problems obvious in the chat transcript.

## Secret Handling Advice

- Prefer per-user environment injection over committing secrets into project files.
- If your client supports config-time environment expansion, use it for paths, not for checked-in secrets.
- If you publish screenshots or demos, scrub `PUBLIC_APIS_*` values first.
