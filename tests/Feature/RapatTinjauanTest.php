<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\RapatTinjauan;

class RapatTinjauanTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_create_update_and_delete_rapat()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // create
        $resp = $this->post('/dashboard/rapat-tinjauan', [
            'judul' => 'Rapat Uji',
            'tanggal' => now()->toDateString(),
            'notulen' => 'Notulen contoh',
            'keputusan' => 'Keputusan contoh',
        ]);
        $resp->assertStatus(302);
        $this->assertDatabaseHas('rapat_tinjauan', ['judul' => 'Rapat Uji']);

        $rapat = RapatTinjauan::first();

        // update
        $resp = $this->put("/dashboard/rapat-tinjauan/{$rapat->id}", [
            'judul' => 'Rapat Uji Updated',
            'tanggal' => now()->toDateString(),
        ]);
        $resp->assertStatus(302);
        $this->assertDatabaseHas('rapat_tinjauan', ['judul' => 'Rapat Uji Updated']);

        // delete
        $resp = $this->delete("/dashboard/rapat-tinjauan/{$rapat->id}");
        $resp->assertStatus(302);
        $this->assertDatabaseMissing('rapat_tinjauan', ['id' => $rapat->id]);
    }
}
