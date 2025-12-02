<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('frontend/Home');
})->name('/');

Route::get('/about', function () {
    return Inertia::render('frontend/About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('frontend/Services');

})->name('services');
Route::get('/services/{slug}', function ($slug) {
    $service = Services::where('slug', $slug)->firstOrFail();

    return inertia('frontend/Service', [
        'service' => $service
    ]);
});


Route::get('/portfolio', function () {
    return Inertia::render('frontend/Portfolio');
})->name('portfolio');

Route::get('/blog', function () {
    return Inertia::render('frontend/Blog');
})->name('blog');

Route::get('/contact-us', function () {
    return Inertia::render('frontend/ContactUs');
})->name('contact-us');

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
