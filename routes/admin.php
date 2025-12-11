<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Dashboard\DashboardBlogController;


Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::get('/allblog', [DashboardBlogController::class, 'index'])->name('admin.blog');
        Route::get('/create-blog', [DashboardBlogController::class, 'create'])->name('admin.blog.create');
    });
});

require __DIR__.'/settings.php';
