# Tool Groups

Public API Toolkit exposes 41 MCP tools. Each tool name follows the same pattern:

```text
public_api_<group>
```

Every tool accepts an `action` plus any group-specific fields required by that action.

## Data Reference

| Tool | Description |
| --- | --- |
| `public_api_country_data` | Country profiles from REST Countries |
| `public_api_dictionary` | Definitions, synonyms, antonyms, rhymes, and autocomplete |
| `public_api_books` | Books, Gutenberg titles, and poetry lookups |
| `public_api_university_data` | University search by name and country |

## Geolocation

| Tool | Description |
| --- | --- |
| `public_api_geocoding` | Forward geocoding, reverse geocoding, and postal lookups |
| `public_api_ip_geolocation` | IP lookup for city, region, timezone, and network data |

## Finance

| Tool | Description |
| --- | --- |
| `public_api_currency_exchange` | Currency rates, conversions, and historical series |
| `public_api_crypto_data` | CoinGecko-powered crypto market data |
| `public_api_stock_market` | Quotes, symbol search, SEC filings, and FRED data |

## Weather And Environment

| Tool | Description |
| --- | --- |
| `public_api_weather` | Forecasts, current conditions, alerts, and sun times |
| `public_api_air_quality` | Air quality, UK carbon intensity, and website carbon data |
| `public_api_carbon_footprint` | Carbon Interface activity estimates |

## Development

| Tool | Description |
| --- | --- |
| `public_api_http_utils` | HTTP introspection, QR codes, URL shortening, and protocol checks |
| `public_api_dns_network` | DNS, subnet, and domain search utilities |
| `public_api_code_execution` | Remote code execution via Wandbox |
| `public_api_placeholder_data` | Synthetic users, posts, lorem ipsum, avatars, and UUIDs |
| `public_api_screenshot` | Website screenshot metadata via Microlink |

## Text And Knowledge

| Tool | Description |
| --- | --- |
| `public_api_translation` | Translation, language detection, and novelty translators |
| `public_api_text_analysis` | Profanity filtering and text safety checks |
| `public_api_wikipedia` | Wikipedia and Wikidata search helpers |
| `public_api_news` | Spaceflight and historic newspaper APIs |

## Media And Entertainment

| Tool | Description |
| --- | --- |
| `public_api_images` | Lorem Picsum image placeholders |
| `public_api_music_data` | MusicBrainz, iTunes, lyrics, radio, and genre helpers |
| `public_api_movie_tv_data` | Movies, TV, anime, sci-fi, and franchise lookups |
| `public_api_game_data` | Games, cards, RPG, anime, and trivia datasets |

## Science And Lifestyle

| Tool | Description |
| --- | --- |
| `public_api_math` | Symbolic math and number facts |
| `public_api_space` | NASA, ISS, launches, SpaceX, and earthquake data |
| `public_api_food_recipes` | Food, drinks, breweries, beer, and fruit data |
| `public_api_blockchain` | Bitcoin, Helium, and Solana data |
| `public_api_holidays` | Public holidays, bank holidays, and namedays |
| `public_api_transport` | Flight, bike share, EV charging, and transit endpoints |

## Validation And Security

| Tool | Description |
| --- | --- |
| `public_api_random_facts` | Jokes, quotes, trivia, xkcd, and novelty text feeds |
| `public_api_animals` | Animal images, facts, and marine-life data |
| `public_api_email_validation` | Email deliverability and reputation helpers |
| `public_api_phone_validation` | Phone device catalog lookups |
| `public_api_data_validation` | Content validation helpers |
| `public_api_security_intel` | Vulnerability, phishing, and police or open threat feeds |
| `public_api_job_search` | Job board search results |

## Civic Data

| Tool | Description |
| --- | --- |
| `public_api_government_data` | Wanted lists, notices, registers, and civic datasets |
| `public_api_health_data` | FDA, USDA, and NPI registry lookups |
| `public_api_open_data` | Open civic, culture, sport, and city quality datasets |

## Example Prompts

- `Use public_api_weather to get the current weather for Toronto.`
- `Use public_api_stock_market to look up the quote for AAPL.`
- `Use public_api_wikipedia to summarize Model Context Protocol.`
- `Use public_api_transport to find transit locations for Berlin.`
