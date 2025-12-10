<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = include resource_path('data/blogData.php');

        return Inertia::render('frontend/Blog', [
            'blogs' => $blogs
        ]);
    }


    public function single($slug)
    {
        $blogs = include resource_path('data/blogData.php');

        $blog = collect($blogs)->firstWhere('slug', $slug);

        if (!$blog) {
            abort(404, "Blog not found");
        }

        return Inertia::render('frontend/SingleBlog', [
            'blog' => $blog
        ]);
    }

}
