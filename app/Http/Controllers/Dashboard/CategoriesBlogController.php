<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoriesBlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $categories = Category::where('type', 'blog')
            ->with('parent')
            ->withCount('blogs')
            ->latest()
            ->get();
            
        $parentCategories = Category::where('type', 'blog')
            ->whereNull('parent_id')
            ->get();

        return Inertia::render('dashboard/blog/categories', [
            'categories' => $categories,
            'parentCategories' => $parentCategories,
            'allCategories' => $categories, // For dropdowns
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
            'type' => 'blog',
        ]);

        return redirect()->route('blog-categories.index')
            ->with('success', 'Category created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        // Ensure it's a blog category
        if ($category->type !== 'blog') {
            abort(404);
        }
        
        // Load parent relationship and blogs count
        $category->load('parent')->loadCount('blogs');
        
        $categories = Category::where('type', 'blog')
            ->with('parent')
            ->withCount('blogs')
            ->latest()
            ->get();
            
        $parentCategories = Category::where('type', 'blog')
            ->whereNull('parent_id')
            ->get();

        return Inertia::render('dashboard/blog/categories', [
            'editCategory' => $category,
            'categories' => $categories,
            'parentCategories' => $parentCategories,
            'allCategories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        // Ensure it's a blog category
        if ($category->type !== 'blog') {
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

        return redirect()->route('blog-categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Ensure it's a blog category
        if ($category->type !== 'blog') {
            abort(404);
        }
        
        // Check if category has children
        if ($category->children()->exists()) {
            return redirect()->back()
                ->with('error', 'Cannot delete category. It has sub-categories.');
        }

        // Check if category is being used
        if ($category->blogs()->exists()) {
            return redirect()->back()
                ->with('error', 'Cannot delete category. It is being used by blogs.');
        }

        $category->delete();
        
        return redirect()->route('blog-categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}