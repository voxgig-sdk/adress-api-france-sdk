<?php
declare(strict_types=1);

// AdressApiFrance SDK base feature

class AdressApiFranceBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AdressApiFranceContext $ctx, array $options): void {}
    public function PostConstruct(AdressApiFranceContext $ctx): void {}
    public function PostConstructEntity(AdressApiFranceContext $ctx): void {}
    public function SetData(AdressApiFranceContext $ctx): void {}
    public function GetData(AdressApiFranceContext $ctx): void {}
    public function GetMatch(AdressApiFranceContext $ctx): void {}
    public function SetMatch(AdressApiFranceContext $ctx): void {}
    public function PrePoint(AdressApiFranceContext $ctx): void {}
    public function PreSpec(AdressApiFranceContext $ctx): void {}
    public function PreRequest(AdressApiFranceContext $ctx): void {}
    public function PreResponse(AdressApiFranceContext $ctx): void {}
    public function PreResult(AdressApiFranceContext $ctx): void {}
    public function PreDone(AdressApiFranceContext $ctx): void {}
    public function PreUnexpected(AdressApiFranceContext $ctx): void {}
}
