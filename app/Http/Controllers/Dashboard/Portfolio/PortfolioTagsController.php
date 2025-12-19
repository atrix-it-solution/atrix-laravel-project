<?php

namespace App\Http\Controllers\Dashboard\Portfolio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tag;
use Illuminate\Support\Str;

class PortfolioTagsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $tags = Tag::where('type', 'portfolio')
            ->withCount('portfolios') // Count portfolio usage
            ->latest()
            ->get();
        
        return Inertia::render('dashboard/portfolio/tags-portfolio', [
            'tags' => $tags,
            'editTag' => null, // Ensure editTag is always passed
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
            'description' => 'nullable|string',
        ]);

        Tag::create([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
            'description' => $data['description'] ?? null,
            'type' => 'portfolio', // Set type to portfolio
            'is_active' => true,
        ]);

        return redirect()->route('portfolio-tags.index')
            ->with('success', 'Portfolio tag created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        // Ensure it's a portfolio tag
        if ($tag->type !== 'portfolio') {
            abort(404);
        }
        
        $tags = Tag::where('type', 'portfolio')
            ->withCount('portfolios')
            ->latest()
            ->get();

        return Inertia::render('dashboard/portfolio/tags-portfolio', [
            'editTag' => $tag,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        // Ensure it's a portfolio tag
        if ($tag->type !== 'portfolio') {
            abort(404);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $tag->update([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
            'description' => $data['description'] ?? null,
            'is_active' => $data['is_active'] ?? true,
        ]);

        return redirect()->route('portfolio-tags.index')
            ->with('success', 'Portfolio tag updated successfully.');
    }

    public function destroy(Tag $tag)
    {
        // Ensure it's a portfolio tag
        if ($tag->type !== 'portfolio') {
            abort(404);
        }

        // Check if tag is being used before deleting
        if ($tag->portfolios()->exists()) {
            return redirect()->back()
                ->with('error', 'Cannot delete tag. It is being used by portfolios.');
        }

        $tag->delete();
        
        return redirect()->route('portfolio-tags.index')
            ->with('success', 'Portfolio tag deleted successfully.');
    }
}