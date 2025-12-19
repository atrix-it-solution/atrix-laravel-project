<?php

namespace App\Http\Controllers\Dashboard\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;

class PortfolioCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $categories = Category::where('type', 'portfolio')
            ->with('parent') // Load parent relationship for parentName
            ->withCount('portfolios') // Count portfolio items
            ->latest()
            ->get();
            
        $parentCategories = Category::where('type', 'portfolio')
            ->whereNull('parent_id')
            ->get();

        $allCategories = Category::where('type', 'portfolio')->get();

        return Inertia::render('dashboard/portfolio/categories-portfolio', [
            'categories' => $categories,
            'parentCategories' => $parentCategories,
            'allCategories' => $allCategories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        Category::create([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
            'description' => $data['description'] ?? null,
            'parent_id' => $data['parent_id'] ?? null,
            'type' => 'portfolio',
        ]);

        return redirect()->route('portfolio-categories.index')
            ->with('success', 'Portfolio category created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        // Ensure it's a portfolio category
        if ($category->type !== 'portfolio') {
            abort(404);
        }
        
        // Load relationships
        $category->load('parent')->loadCount('portfolios');
        
        $categories = Category::where('type', 'portfolio')
            ->with('parent')
            ->withCount('portfolios')
            ->latest()
            ->get();
            
        $parentCategories = Category::where('type', 'portfolio')
            ->whereNull('parent_id')
            ->get();

        $allCategories = Category::where('type', 'portfolio')->get();

        return Inertia::render('dashboard/portfolio/categories-portfolio', [
            'editCategory' => $category,
            'categories' => $categories,
            'parentCategories' => $parentCategories,
            'allCategories' => $allCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        // Ensure it's a portfolio category
        if ($category->type !== 'portfolio') {
            abort(404);
        }
        
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        // Prevent category from being its own parent
        if ($data['parent_id'] == $category->id) {
            return redirect()->back()
                ->with('error', 'Category cannot be its own parent');
        }

        $category->update([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
            'description' => $data['description'] ?? null,
            'parent_id' => $data['parent_id'] ?? null,
        ]);

        return redirect()->route('portfolio-categories.index')
            ->with('success', 'Portfolio category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Ensure it's a portfolio category
        if ($category->type !== 'portfolio') {
            abort(404);
        }
        
        // Check if category has children
        if ($category->children()->exists()) {
            return redirect()->back()
                ->with('error', 'Cannot delete category. It has sub-categories.');
        }

        // Check if category is being used
        if ($category->portfolios()->exists()) {
            return redirect()->back()
                ->with('error', 'Cannot delete category. It is being used by portfolio items.');
        }

        $category->delete();
        
        return redirect()->route('portfolio-categories.index')
            ->with('success', 'Portfolio category deleted successfully.');
    }
}