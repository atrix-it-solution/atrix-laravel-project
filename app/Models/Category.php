<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'type',
    ];

    // Self-referencing parent relationship
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    
    // Children categories
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    // Blogs relationship through pivot table
    public function blogs(): BelongsToMany
    {
        return $this->belongsToMany(Blog::class, 'blog_category');
    }

    // Portfolios relationship through pivot table
    public function portfolios(): BelongsToMany
    {
        return $this->belongsToMany(Portfolio::class, 'portfolio_category');
    }


    public function portfoliosCount()
    {
        return $this->portfolios()->count();
    }
    public function blogsCount()
    {
        return $this->blogs()->count();
    }
}