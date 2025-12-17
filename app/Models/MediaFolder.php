<?php
// app/Models/MediaFolder.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MediaFolder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'user_id',
        'order',
        'is_public'
    ];

    protected $casts = [
        'order' => 'integer',
        'is_public' => 'boolean'
    ];

    /**
     * Get the parent folder
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(MediaFolder::class, 'parent_id');
    }

    /**
     * Get child folders
     */
    public function children(): HasMany
    {
        return $this->hasMany(MediaFolder::class, 'parent_id')->orderBy('order');
    }

    /**
     * Get media in this folder
     */
    public function media(): HasMany
    {
        return $this->hasMany(Media::class, 'folder_id');
    }

    /**
     * Get the user who created the folder
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for root folders
     */
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Get media count in this folder (including subfolders)
     */
    public function getMediaCountAttribute(): int
    {
        $count = $this->media()->count();
        
        foreach ($this->children as $child) {
            $count += $child->media_count;
        }
        
        return $count;
    }

    /**
     * Get full path including parent folders
     */
    public function getFullPathAttribute(): string
    {
        $path = [];
        $folder = $this;
        
        while ($folder) {
            $path[] = $folder->name;
            $folder = $folder->parent;
        }
        
        return implode('/', array_reverse($path));
    }

    /**
     * Automatically generate slug from name
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($folder) {
            if (empty($folder->slug)) {
                $folder->slug = \Str::slug($folder->name);
            }
        });

        static::updating(function ($folder) {
            if ($folder->isDirty('name') && empty($folder->slug)) {
                $folder->slug = \Str::slug($folder->name);
            }
        });
    }
}