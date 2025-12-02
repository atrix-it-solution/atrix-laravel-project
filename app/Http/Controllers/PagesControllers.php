<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesControllers extends Controller
{
    public function home()
    {
        return Inertia::render('frontend/Home');
    }

    public function about()
    {
        return Inertia::render('frontend/About', [
        'title' => 'Get to Know Us | The Story of Atrix IT Solutions',
        'description' => 'Welcome to Atrix IT Solutions! Learn how we help businesses grow with web development, digital marketing, and much more.',
        ]);
    }

    public function services()
    {
        return Inertia::render('frontend/Services');
    }

    public function portfolio()
    {
        return Inertia::render('frontend/Portfolio');
    }

    public function blog()
    {
        return Inertia::render('frontend/Blog');
    }

    public function contactUs()
    {
        return Inertia::render('frontend/ContactUs');
    }
}
