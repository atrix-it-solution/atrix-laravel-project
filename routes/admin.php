<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Dashboard\DashboardBlogController;
use App\Http\Controllers\Dashboard\CategoriesBlogController;
use App\Http\Controllers\Dashboard\TagsBlogController;
use App\Http\Controllers\Dashboard\Portfolio\PortfoliosController;
use App\Http\Controllers\Dashboard\Portfolio\PortfolioCategoriesController;
use App\Http\Controllers\Dashboard\Portfolio\PortfolioTagsController;
use App\Http\Controllers\Dashboard\MediaController;




Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::get('/allblog', [DashboardBlogController::class, 'index'])->name('admin.blog');
        Route::get('/create-blog', [DashboardBlogController::class, 'create'])->name('admin.blog.create');
        Route::get('/categories-blog', [CategoriesBlogController::class, 'index'])->name('admin.categories'); 
        Route::get('/tags-blog', [TagsBlogController::class, 'index'])->name('admin.tags'); 

        Route::get('/allportfolio', [PortfoliosController::class, 'index'])->name('admin.portfolio');
        Route::get('/create-portfolio', [PortfoliosController::class, 'create'])->name('admin.portfolio.create');
        Route::get('/categories-portfolio', [PortfolioCategoriesController::class, 'index'])->name('admin.categories.portfolio');
        Route::get('/tags-portfolio', [PortfolioTagsController::class, 'index'])->name('admin.tags.portfolio');
    });

       Route::prefix('api')->group(function () {
        Route::prefix('media')->group(function () {
            Route::get('/', [MediaController::class, 'index']);
            Route::post('/', [MediaController::class, 'store']);
            Route::post('/multiple', [MediaController::class, 'storeMultiple']);
            
            Route::prefix('{media}')->group(function () {
                Route::get('/', [MediaController::class, 'show']);
                Route::put('/', [MediaController::class, 'update']);
                Route::delete('/', [MediaController::class, 'destroy']);
            });
            
            Route::get('/folders', [MediaController::class, 'folders']);
            Route::post('/folders', [MediaController::class, 'createFolder']);
        });
    });


    
});

require __DIR__.'/settings.php';
