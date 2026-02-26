<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Temuan;
use App\Models\TindakLanjut;

class TindakLanjutTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_update_delete_tindak_lanjut()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $temuan = Temuan::factory()->create();

        // create
        $resp = $this->post('/dashboard/tindak-lanjut', [
            'temuan_id' => $temuan->id,
            'deskripsi' => 'Tindak lanjut contoh',
        ]);
        $resp->assertStatus(302);
        $this->assertDatabaseHas('tindak_lanjut', ['deskripsi' => 'Tindak lanjut contoh']);

        $item = TindakLanjut::first();

        // update
        $resp = $this->put("/dashboard/tindak-lanjut/{$item->id}", [
            'deskripsi' => 'Tindak lanjut diperbarui',
        ]);
        $resp->assertStatus(302);
        $this->assertDatabaseHas('tindak_lanjut', ['deskripsi' => 'Tindak lanjut diperbarui']);

        // delete
        $resp = $this->delete("/dashboard/tindak-lanjut/{$item->id}");
        $resp->assertStatus(302);
        $this->assertDatabaseMissing('tindak_lanjut', ['id' => $item->id]);
    }
}
