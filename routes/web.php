<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\BlogController;

Route::get('/', function () {
    return Inertia::render('frontend/Home');
})->name('/');

Route::get('/about', function () {
    return Inertia::render('frontend/About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('frontend/Services');

})->name('services');

Route::inertia('/services/{slug}', 'frontend/SingleServices');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');
Route::get('/blog/{slug}', [BlogController::class, 'single'])->name('blog.single');




Route::get('/portfolio', function () {
    return Inertia::render('frontend/Portfolio');
})->name('portfolio');

Route::get('/portfolio/{project_id}', function ($project_id) {
    return Inertia::render('frontend/SinglePortfolio', [
        'project_id' => $project_id,
    ]);
})->name('portfolio.single');


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
