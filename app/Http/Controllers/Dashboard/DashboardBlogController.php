<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category; 
use App\Models\Tag; 
use App\Models\Blog;

class DashboardBlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
    { 
        // Get all blogs with relationships
        $blogs = Blog::with(['categories', 'tags', 'featuredImage'])
            ->latest()
            ->paginate(10);

        // Also get all blog categories and tags for filters
        $allCategories = Category::where('type', 'blog')->get();
        $allTags = Tag::where('type', 'blog')->orWhereNull('type')->get();

        return Inertia::render('dashboard/blog/all-blog', [
            'blogs' => $blogs,
            'allCategories' => $allCategories, // For filter dropdown
            'allTags' => $allTags, // For filter dropdown
        ]);
        
    }

    /**
     * Show the form for creating a new resource.
     */ 
    public function create()
    {
        // Get blog-specific categories and tags
        $categories = Category::where('type', 'blog')->get();
        $tags = Tag::where('type', 'blog')->orWhereNull('type')->get();

        return Inertia::render('dashboard/blog/create-edit-blog', [
            'categories' => $categories,
            'tags' => $tags,
            'isEdit' => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
      public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:blogs,slug',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'author_description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Create the blog
        $blog = Blog::create($validated);

        // Attach categories
        if ($request->has('categories') && !empty($request->categories)) {
            $blog->categories()->sync($request->categories);
        }

        // Attach tags
        if ($request->has('tags') && !empty($request->tags)) {
            $blog->tags()->sync($request->tags);
        }

        return redirect()->route('dashboard.blogs.index')
            ->with('success', 'Blog created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Get blog with all relationships
        $blog = Blog::with(['categories', 'tags', 'featuredImage'])->findOrFail($id);
        
        // Get all blog-specific categories and tags
        $categories = Category::where('type', 'blog')->get();
        $tags = Tag::where('type', 'blog')->orWhereNull('type')->get();
        
        // Transform blog data for frontend
        $blogData = [
            'id' => $blog->id,
            'title' => $blog->title,
            'slug' => $blog->slug,
            'description' => $blog->description,
            'content' => $blog->content,
            'featured_image' => $blog->featured_image_id,
            'featured_image_url' => $blog->featuredImage->url ?? null,
            'author' => $blog->author,
            'author_description' => $blog->author_description,
            'meta_title' => $blog->meta_title,
            'meta_description' => $blog->meta_description,
            'status' => $blog->status,
            'is_featured' => $blog->is_featured,
            'published_at' => $blog->published_at ? $blog->published_at->format('Y-m-d\TH:i') : null,
            'categories' => $blog->categories->pluck('id')->toArray(),
            'tags' => $blog->tags->pluck('id')->toArray(),
            // Get category and tag details
            'category_details' => $blog->categories->map(function($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                ];
            }),
            'tag_details' => $blog->tags->map(function($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'slug' => $tag->slug,
                ];
            }),
        ];

        return Inertia::render('dashboard/blog/create-edit-blog', [
            'blog' => $blogData,
            'categories' => $categories,
            'tags' => $tags,
            'isEdit' => true,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:blogs,slug,' . $blog->id,
            'description' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'author_description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Update slug only if title changed
        if ($blog->title !== $request->title && !$request->filled('slug')) {
            $validated['slug'] = Str::slug($request->title) . '-' . time();
        }

        $blog->update($validated);

        // Sync categories and tags
        $blog->categories()->sync($request->categories ?? []);
        $blog->tags()->sync($request->tags ?? []);

        return redirect()->route('dashboard.blogs.index')
            ->with('success', 'Blog updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();
        
        return redirect()->route('dashboard.blogs.index')
            ->with('success', 'Blog deleted successfully.');
    }


    public function statistics()
    {
        $totalBlogs = Blog::count();
        $publishedBlogs = Blog::where('status', 'published')->count();
        $draftBlogs = Blog::where('status', 'draft')->count();
        
        // Get blogs count by category
        $blogsByCategory = Category::where('type', 'blog')
            ->withCount('blogs')
            ->having('blogs_count', '>', 0)
            ->get()
            ->map(function($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'count' => $category->blogs_count,
                ];
            });
            
        // Get blogs count by tag
        $blogsByTag = Tag::where('type', 'blog')
            ->withCount('blogs')
            ->having('blogs_count', '>', 0)
            ->get()
            ->map(function($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'count' => $tag->blogs_count,
                ];
            });

        return response()->json([
            'total' => $totalBlogs,
            'published' => $publishedBlogs,
            'draft' => $draftBlogs,
            'by_category' => $blogsByCategory,
            'by_tag' => $blogsByTag,
        ]);
    }
}
