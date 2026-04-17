# Environment Variables

Public API Toolkit reads optional provider secrets from environment variables with the `PUBLIC_APIS_` prefix.

## Naming

The server normalizes provider names to uppercase keys:

- `FINNHUB` -> `PUBLIC_APIS_FINNHUB`
- `FOODDATA_CENTRAL` -> `PUBLIC_APIS_FOODDATA_CENTRAL`
- `CARBONINTERFACE` -> `PUBLIC_APIS_CARBONINTERFACE`
- `OPEN_CHARGE_MAP` -> `PUBLIC_APIS_OPEN_CHARGE_MAP`

## Set Keys Before Launch

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

Restart the MCP client after changing keys so the launched process inherits the new environment.

## Supported Keys

| Variable | Tool | Use |
| --- | --- | --- |
| `PUBLIC_APIS_FINNHUB` | `public_api_stock_market` | Quote and symbol search |
| `PUBLIC_APIS_ALPHAVANTAGE` | `public_api_stock_market` | Alternate stock provider |
| `PUBLIC_APIS_FRED` | `public_api_stock_market` | Federal Reserve series data |
| `PUBLIC_APIS_OMDB` | `public_api_movie_tv_data` | OMDb lookups |
| `PUBLIC_APIS_TMDB` | `public_api_movie_tv_data` | TMDb lookups |
| `PUBLIC_APIS_CARBON_INTERFACE` | `public_api_carbon_footprint` | Carbon Interface primary key name |
| `PUBLIC_APIS_CARBONINTERFACE` | `public_api_carbon_footprint` | Backward-compatible alternate key name |
| `PUBLIC_APIS_MAILCHECK` | `public_api_email_validation` | Mailcheck validation |
| `PUBLIC_APIS_KICKBOX` | `public_api_email_validation` | Kickbox validation |
| `PUBLIC_APIS_NASA` | `public_api_space` | NASA APOD override |
| `PUBLIC_APIS_OPEN_CHARGE_MAP` | `public_api_transport` | EV charging data |
| `PUBLIC_APIS_FOODDATA_CENTRAL` | `public_api_health_data` | USDA FoodData Central search |

## Missing-Key Behavior

If a premium key is missing, the server returns a readable setup message instead of crashing. That keeps the rest of the toolkit usable and makes configuration problems obvious in the client transcript.

## Secret Handling

- Keep secrets in your shell or client-specific environment management.
- Do not commit `PUBLIC_APIS_*` values to the repository.
- Scrub screenshots and demos before sharing them.
