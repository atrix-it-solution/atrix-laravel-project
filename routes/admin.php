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
         Route::get('/blog-categories', [CategoriesBlogController::class, 'index'])->name('blog-categories.index');
        Route::post('/blog-categories', [CategoriesBlogController::class, 'store'])->name('blog-categories.store');
        Route::get('/blog-categories/create', [CategoriesBlogController::class, 'create'])->name('blog-categories.create');
        Route::get('/blog-categories/{category}/edit', [CategoriesBlogController::class, 'edit'])->name('blog-categories.edit');
        Route::put('/blog-categories/{category}', [CategoriesBlogController::class, 'update'])->name('blog-categories.update');
        Route::delete('/blog-categories/{category}', [CategoriesBlogController::class, 'destroy'])->name('blog-categories.destroy');
       

       Route::get('/blog-tags', [TagsBlogController::class, 'index'])->name('blog-tags.index');
        Route::post('/blog-tags', [TagsBlogController::class, 'store'])->name('blog-tags.store');
        Route::get('/blog-tags/create', [TagsBlogController::class, 'create'])->name('blog-tags.create');
        Route::get('/blog-tags/{tag}/edit', [TagsBlogController::class, 'edit'])->name('blog-tags.edit');
        Route::put('/blog-tags/{tag}', [TagsBlogController::class, 'update'])->name('blog-tags.update');
        Route::delete('/blog-tags/{tag}', [TagsBlogController::class, 'destroy'])->name('blog-tags.destroy');


        Route::get('/allportfolio', [PortfoliosController::class, 'index'])->name('admin.portfolio');
        Route::get('/create-portfolio', [PortfoliosController::class, 'create'])->name('admin.portfolio.create');

        Route::get('/portfolio-categories', [PortfolioCategoriesController::class, 'index'])->name('portfolio-categories.index');
        Route::post('/portfolio-categories', [PortfolioCategoriesController::class, 'store'])->name('portfolio-categories.store');
        Route::get('/portfolio-categories/create', [PortfolioCategoriesController::class, 'create'])->name('portfolio-categories.create');
        Route::get('/portfolio-categories/{category}/edit', [PortfolioCategoriesController::class, 'edit'])->name('portfolio-categories.edit');
        Route::put('/portfolio-categories/{category}', [PortfolioCategoriesController::class, 'update'])->name('portfolio-categories.update');
        Route::delete('/portfolio-categories/{category}', [PortfolioCategoriesController::class, 'destroy'])->name('portfolio-categories.destroy');
        
       
        Route::get('/portfolio-tags', [PortfolioTagsController::class, 'index'])->name('portfolio-tags.index');
        Route::post('/portfolio-tags', [PortfolioTagsController::class, 'store'])->name('portfolio-tags.store');
        Route::get('/portfolio-tags/create', [PortfolioTagsController::class, 'create'])->name('portfolio-tags.create');
        Route::get('/portfolio-tags/{tag}/edit', [PortfolioTagsController::class, 'edit'])->name('portfolio-tags.edit');
        Route::put('/portfolio-tags/{tag}', [PortfolioTagsController::class, 'update'])->name('portfolio-tags.update');
        Route::delete('/portfolio-tags/{tag}', [PortfolioTagsController::class, 'destroy'])->name('portfolio-tags.destroy');
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
