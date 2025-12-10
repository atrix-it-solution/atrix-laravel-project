<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $Portfolios = include resource_path('data/PortfolioData.php');

        return Inertia::render('frontend/Portfolio', [
            'Portfolios' => $Portfolios
        ]);
    }


    public function single($slug)
    {
        $Portfolios = include resource_path('data/PortfolioData.php');

        $Portfolio = collect($Portfolios)->firstWhere('slug', $slug);

        if (!$Portfolio) {
            abort(404, "Portfolio not found");
        }

        return Inertia::render('frontend/SinglePortfolio', [
            'Portfolio' => $Portfolio
        ]);
    }

}
