<?php

use App\Http\Controllers\AuditController;
use App\Http\Controllers\AuditeeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\SiklusAuditController;
use App\Http\Controllers\StandarMutuController;
use App\Http\Controllers\TemuanController;
use App\Http\Controllers\UnitKerjaController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// ==========================================
// Landing Page (Public)
// ==========================================
Route::get('/', [LandingController::class, 'index'])->name('landing');
Route::get('/berita/{slug}', [LandingController::class, 'beritaDetail'])->name('berita.detail');
Route::get('/profil-spmi', [LandingController::class, 'profil'])->name('landing.profil');
Route::get('/dokumen-spmi', [LandingController::class, 'dokumenPublik'])->name('landing.dokumen');

// ==========================================
// Auth
// ==========================================
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// ==========================================
// Dashboard Admin (Auth Required)
// ==========================================
Route::middleware(['auth', 'role:super-admin|admin-mutu|auditor'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    // Standar Mutu
    Route::resource('standar-mutu', StandarMutuController::class)->except(['show', 'create', 'edit']);

    // Siklus Audit
    Route::resource('siklus-audit', SiklusAuditController::class)->except(['show', 'create', 'edit']);

    // Audit
    Route::resource('audit', AuditController::class)->except(['create', 'edit']);

    // Temuan
    Route::resource('temuan', TemuanController::class)->except(['show']);

    // Dokumen
    Route::resource('dokumen', DokumenController::class)->except(['show', 'create', 'edit']);
    Route::get('dokumen/{dokumen}/download', [DokumenController::class, 'download'])->name('dokumen.download');

    // Unit Kerja
    Route::resource('unit-kerja', UnitKerjaController::class)->except(['show', 'create', 'edit']);

    // Galeri
    Route::delete('galeri/image/{image}', [App\Http\Controllers\GaleriController::class, 'destroyImage'])->name('galeri.image.destroy');
    Route::post('galeri/{galeri}', [App\Http\Controllers\GaleriController::class, 'update'])->name('galeri.update.post');
    Route::resource('galeri', App\Http\Controllers\GaleriController::class)->except(['show', 'create', 'edit']);

    // Berita
    Route::resource('berita', BeritaController::class)->parameters(['berita' => 'berita'])->except(['show', 'create', 'edit']);

    // Users
    Route::resource('users', UserController::class)->except(['show', 'create', 'edit']);

    // Roles & Permissions (Super Admin only)
    Route::middleware('role:super-admin')->group(function () {
        Route::resource('roles', \App\Http\Controllers\RoleController::class)->except(['show', 'create', 'edit']);
        Route::resource('permissions', \App\Http\Controllers\PermissionController::class)->except(['show', 'create', 'edit']);
    });

    // Settings
    Route::get('pengaturan', [\App\Http\Controllers\SettingController::class, 'index'])->name('pengaturan.index');
    Route::put('pengaturan', [\App\Http\Controllers\SettingController::class, 'update'])->name('pengaturan.update');

    // Additional Dashboard pages from reference
    Route::get('profil-spmi', [\App\Http\Controllers\ProfilSpmiController::class, 'index'])->name('profil-spmi.index');
    Route::resource('rapat-tinjauan', \App\Http\Controllers\RapatTinjauanController::class)->except(['show', 'create', 'edit']);
    Route::resource('tindak-lanjut', \App\Http\Controllers\TindakLanjutController::class)->except(['show', 'create', 'edit']);
    Route::get('umpan-balik', [\App\Http\Controllers\FeedbackController::class, 'index'])->name('umpan-balik.index');
    Route::get('diagram-kepuasan', [\App\Http\Controllers\KepuasanController::class, 'index'])->name('diagram-kepuasan.index');
    Route::get('dokumen-publik', [\App\Http\Controllers\DokumenPublikController::class, 'index'])->name('dokumen-publik.index');
});

// ==========================================
// Auditee Portal
// ==========================================
Route::middleware(['auth', 'role:auditee'])->prefix('auditee')->name('auditee.')->group(function () {
    Route::get('/', [AuditeeController::class, 'index'])->name('index');
    Route::get('/dokumen', [AuditeeController::class, 'dokumen'])->name('dokumen');
    Route::post('/dokumen', [AuditeeController::class, 'uploadDokumen'])->name('dokumen.upload');
    Route::get('/temuan', [AuditeeController::class, 'temuan'])->name('temuan');
    Route::get('/temuan/{temuan}', [AuditeeController::class, 'showTemuan'])->name('temuan.show');
    Route::post('/temuan/{temuan}/tindak-lanjut', [AuditeeController::class, 'storeTindakLanjut'])->name('temuan.tindak-lanjut');
});
