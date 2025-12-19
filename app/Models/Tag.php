<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Blogs relationship through pivot table
    public function blogs(): BelongsToMany
    {
        return $this->belongsToMany(Blog::class, 'blog_tag');
    }

    // Portfolios relationship through pivot table
    public function portfolios(): BelongsToMany
    {
        return $this->belongsToMany(Portfolio::class, 'portfolio_tag');
    }

    // Scope for blog tags
    public function scopeBlog($query)
    {
        return $query->where('type', 'blog');
    }

    // Scope for portfolio tags
    public function scopePortfolio($query)
    {
        return $query->where('type', 'portfolio');
    }

    // Scope for active tags
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}