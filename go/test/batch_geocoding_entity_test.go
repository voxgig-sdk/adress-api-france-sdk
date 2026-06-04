package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/adress-api-france-sdk/go"
	"github.com/voxgig-sdk/adress-api-france-sdk/go/core"

	vs "github.com/voxgig-sdk/adress-api-france-sdk/go/utility/struct"
)

func TestBatchGeocodingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BatchGeocoding(nil)
		if ent == nil {
			t.Fatal("expected non-nil BatchGeocodingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := batch_geocodingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "batch_geocoding." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ADRESSAPIFRANCE_TEST_BATCH_GEOCODING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		batchGeocodingRef01Ent := client.BatchGeocoding(nil)
		batchGeocodingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "batch_geocoding"}, setup.data), "batch_geocoding_ref01"))

		batchGeocodingRef01DataResult, err := batchGeocodingRef01Ent.Create(batchGeocodingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		batchGeocodingRef01Data = core.ToMapAny(batchGeocodingRef01DataResult)
		if batchGeocodingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func batch_geocodingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "batch_geocoding", "BatchGeocodingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read batch_geocoding test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse batch_geocoding test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"batch_geocoding01", "batch_geocoding02", "batch_geocoding03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ADRESSAPIFRANCE_TEST_BATCH_GEOCODING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ADRESSAPIFRANCE_TEST_BATCH_GEOCODING_ENTID": idmap,
		"ADRESSAPIFRANCE_TEST_LIVE":      "FALSE",
		"ADRESSAPIFRANCE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["ADRESSAPIFRANCE_TEST_BATCH_GEOCODING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ADRESSAPIFRANCE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewAdressApiFranceSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ADRESSAPIFRANCE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ADRESSAPIFRANCE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
