# AdressApiFrance SDK

Geocode and reverse-geocode French postal addresses against the official Base Adresse Nationale

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About French Address API

The French Address API is the public geocoding service operated by the French government over the [Base Adresse Nationale (BAN)](https://adresse.data.gouv.fr), the national reference dataset of French postal addresses. It is hosted on the data.gouv.fr / Géoplateforme infrastructure run by [Etalab](https://www.etalab.gouv.fr/) and [IGN](https://www.ign.fr/).

What you get from the API:

- Forward geocoding from a free-text query to ranked address candidates with coordinates.
- Reverse geocoding from latitude/longitude to the nearest known addresses.
- Batch geocoding by uploading a CSV file and receiving an enriched CSV back.
- Result metadata such as score, address label, postcode, city (commune), INSEE code and a result type (housenumber, street, locality, municipality).

The underlying BAN dataset is refreshed roughly twice a week. The service is open and does not require an API key; CORS is enabled. Usage is capped at around 50 requests per second per IP, after which the server returns HTTP 429 with a `Retry-After` header. Note: the legacy host `api-adresse.data.gouv.fr` is being migrated to the new Géoplateforme geocoding endpoint, so consult the official docs for the current base URL.

## Try it

**TypeScript**
```bash
npm install adress-api-france
```

**Python**
```bash
pip install adress-api-france-sdk
```

**PHP**
```bash
composer require voxgig/adress-api-france-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/adress-api-france-sdk/go
```

**Ruby**
```bash
gem install adress-api-france-sdk
```

**Lua**
```bash
luarocks install adress-api-france-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AdressApiFranceSDK } from 'adress-api-france'

const client = new AdressApiFranceSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o adress-api-france-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "adress-api-france": {
      "command": "/abs/path/to/adress-api-france-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **BatchGeocoding** | Bulk geocoding of CSV files: rows are sent to a batch endpoint (e.g. `/search/csv/` or `/reverse/csv/`) and returned as an enriched CSV with coordinates and address metadata. | `/reverse/csv` |
| **Geocoding** | Single-address forward and reverse geocoding against the Base Adresse Nationale, typically exposed via `/search/` (text query to coordinates) and `/reverse/` (coordinates to address). | `/search` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from adressapifrance_sdk import AdressApiFranceSDK

client = AdressApiFranceSDK({})

```

### PHP

```php
<?php
require_once 'adressapifrance_sdk.php';

$client = new AdressApiFranceSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/adress-api-france-sdk/go"

client := sdk.NewAdressApiFranceSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AdressApiFrance_sdk"

client = AdressApiFranceSDK.new({})

```

### Lua

```lua
local sdk = require("adress-api-france_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AdressApiFranceSDK.test()
const result = await client.BatchGeocoding().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AdressApiFranceSDK.test(None, None)
result, err = client.BatchGeocoding(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AdressApiFranceSDK::test(null, null);
[$result, $err] = $client->BatchGeocoding(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.BatchGeocoding(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AdressApiFranceSDK.test(nil, nil)
result, err = client.BatchGeocoding(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:BatchGeocoding(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the French Address API

- Upstream: [https://adresse.data.gouv.fr](https://adresse.data.gouv.fr)
- API docs: [https://adresse.data.gouv.fr/api-doc/adresse](https://adresse.data.gouv.fr/api-doc/adresse)

- Data and service are published under the [Etalab Open Licence 2.0](https://github.com/etalab/licence-ouverte/blob/master/LO.md), which permits reuse including commercial use.
- Attribution to the source (Base Adresse Nationale / IGN) is expected when reusing the data.
- Underlying address data is maintained by IGN, ANCT and the wider BAN partnership.

---

Generated from the French Address API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
