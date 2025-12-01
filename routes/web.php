<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('frontend/Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('frontend/About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('frontend/Services');
})->name('services');

Route::get('/portfolio', function () {
    return Inertia::render('frontend/Portfolio');
})->name('portfolio');

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
