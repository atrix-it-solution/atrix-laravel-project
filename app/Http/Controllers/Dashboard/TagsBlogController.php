<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagsBlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $tags = Tag::where('type', 'blog')
            ->withCount('blogs') // Count blog usage
            ->latest()
            ->get();

        return Inertia::render('dashboard/blog/tagsBlog', [
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
            'type' => 'blog', // Set type to blog
            'is_active' => true,
        ]);

        return redirect()->route('blog-tags.index')
            ->with('success', 'Blog tag created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        // Ensure it's a blog tag
        if ($tag->type !== 'blog') {
            abort(404);
        }

        $tags = Tag::where('type', 'blog')
            ->withCount('blogs')
            ->latest()
            ->get();

        return Inertia::render('dashboard/blog/tagsBlog', [
            'editTag' => $tag,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        // Ensure it's a blog tag
        if ($tag->type !== 'blog') {
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

        return redirect()->route('blog-tags.index')
            ->with('success', 'Blog tag updated successfully.');
    }

    public function destroy(Tag $tag)
    {
        // Ensure it's a blog tag
        if ($tag->type !== 'blog') {
            abort(404);
        }

        // Check if tag is being used before deleting
        if ($tag->blogs()->exists()) {
            return redirect()->back()
                ->with('error', 'Cannot delete tag. It is being used by blogs.');
        }

        $tag->delete();
        
        return redirect()->route('blog-tags.index')
            ->with('success', 'Blog tag deleted successfully.');
    }
}