# API Keys

Most of Public API Toolkit works without authentication. The keys below unlock providers that need registration, higher quotas, or premium data.

## Key Matrix

| Environment variable | Tool group | Actions | Why you might add it |
| --- | --- | --- | --- |
| `PUBLIC_APIS_FINNHUB` | `public_api_stock_market` | `quote`, `search` | Real-time stock quote and symbol search path |
| `PUBLIC_APIS_ALPHAVANTAGE` | `public_api_stock_market` | `quote`, `search` | Alternate provider if you do not use Finnhub |
| `PUBLIC_APIS_FRED` | `public_api_stock_market` | `fred_series` | Required for Federal Reserve series data |
| `PUBLIC_APIS_OMDB` | `public_api_movie_tv_data` | `omdb` | Movie metadata from OMDb |
| `PUBLIC_APIS_TMDB` | `public_api_movie_tv_data` | `tmdb` | Movie search from TMDb |
| `PUBLIC_APIS_CARBON_INTERFACE` or `PUBLIC_APIS_CARBONINTERFACE` | `public_api_carbon_footprint` | `estimate` | Carbon Interface activity estimates |
| `PUBLIC_APIS_MAILCHECK` | `public_api_email_validation` | `mailcheck` | Mailcheck.ai email validation |
| `PUBLIC_APIS_KICKBOX` | `public_api_email_validation` | `kickbox` | Kickbox email verification |
| `PUBLIC_APIS_NASA` | `public_api_space` | `apod` | Optional higher-confidence NASA APOD access than the demo key |
| `PUBLIC_APIS_OPEN_CHARGE_MAP` | `public_api_transport` | `open_charge_map` | EV charging infrastructure search |
| `PUBLIC_APIS_FOODDATA_CENTRAL` | `public_api_health_data` | `fooddata_search` | USDA food database lookups |

## Provider Strategy

The server prefers direct public providers where possible and only asks for keys when the upstream requires one.

Examples:

- stock quotes and symbol search fall back between Finnhub and Alpha Vantage
- NASA APOD works without a key, but the demo key is intentionally limited
- movie metadata has free public actions like `tvmaze` alongside authenticated actions like `omdb` and `tmdb`

## Recommended Minimal Setup

If you want a lightweight but practical setup, start with:

- `PUBLIC_APIS_FRED`
- `PUBLIC_APIS_OMDB`
- `PUBLIC_APIS_TMDB`

If you care about transport and EV data, add:

- `PUBLIC_APIS_OPEN_CHARGE_MAP`

If you care about richer validation and carbon reporting, add:

- `PUBLIC_APIS_MAILCHECK`
- `PUBLIC_APIS_KICKBOX`
- `PUBLIC_APIS_CARBON_INTERFACE`

## Troubleshooting

- Wrong variable name: use the exact `PUBLIC_APIS_*` spelling shown above.
- Added the key but the tool still says it is missing: restart the MCP client so the child process inherits the new environment.
- Multiple stock keys set: the server prefers Finnhub first, then Alpha Vantage for quote and search requests.
