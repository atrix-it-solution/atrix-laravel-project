<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'featured_image_id',
        'client',
        'project_url',
        'status',
        'is_featured',
        'views',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'views' => 'integer',
    ];

    // Categories relationship through pivot table
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'portfolio_category');
    }

    // Tags relationship through pivot table
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'portfolio_tag');
    }

    // Featured image relationship
    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }

    // Scope for published portfolios
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    // Scope for featured portfolios
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}