<?php

use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PortfolioController as AdminPortfolioController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Root — redirect langsung ke admin login
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return redirect()->route('admin.login');
});

/*
|--------------------------------------------------------------------------
| Route Group: Admin (/admin)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {

    // ── Auth (bisa diakses siapa saja, redirect handled di controller) ──
    Route::get('/login',  [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');

    // ── Protected (wajib login sebagai admin) ─────────────────
    Route::middleware('auth.admin')->group(function () {

        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Portfolio CRUD + toggle publish
        Route::resource('portfolios', AdminPortfolioController::class)
            ->except(['show', 'create', 'edit']);
        Route::patch(
            '/portfolios/{portfolio}/toggle-publish',
            [AdminPortfolioController::class, 'togglePublish']
        )->name('portfolios.toggle-publish');

        // Product CRUD
        Route::resource('products', ProductController::class);

        // Activity Log (read-only)
        Route::get('/activity-logs', [ActivityLogController::class, 'index'])
            ->name('activity-logs.index');
    });
});

/*
|--------------------------------------------------------------------------
| Route Public: Portfolio by Slug
| Harus PALING BAWAH agar tidak menimpa route /admin di atas.
| Hanya huruf kecil, angka, dan tanda hubung yang valid sebagai slug.
|--------------------------------------------------------------------------
*/
Route::get('/{slug}', [PortfolioController::class, 'showPublic'])
    ->name('portfolio.public')
    ->where('slug', '[a-z0-9\-]+');
