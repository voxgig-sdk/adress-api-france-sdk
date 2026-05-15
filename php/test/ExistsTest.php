<?php
declare(strict_types=1);

// AdressApiFrance SDK exists test

require_once __DIR__ . '/../adressapifrance_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AdressApiFranceSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
