<?php
// app/Models/Media.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'file_name', 'path', 'url', 'mime_type', 'type', 
        'extension', 'size', 'dimensions', 'thumbnails', 'user_id',
        'folder_id', 'description', 'alt_text', 'caption', 'is_public',
        'views', 'downloads'
    ];

    protected $casts = [
        'dimensions' => 'array',
        'thumbnails' => 'array',
        'is_public' => 'boolean',
        'size' => 'integer',
        'views' => 'integer',
        'downloads' => 'integer',
    ];

    // Accessors
    public function getThumbnailUrlAttribute()
    {
        // Return the original URL as thumbnail for now
        return $this->url;
    }

    public function getFormattedSizeAttribute()
    {
        $size = $this->size;
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $i = 0;
        while ($size >= 1024 && $i < count($units) - 1) {
            $size /= 1024;
            $i++;
        }
        return round($size, 2) . ' ' . $units[$i];
    }

    public function getDimensionsStringAttribute()
    {
        if (!$this->dimensions) return null;
        return $this->dimensions['width'] . '×' . $this->dimensions['height'];
    }

    public function getIsImageAttribute()
    {
        return $this->type === 'image';
    }

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function folder(): BelongsTo
    {
        return $this->belongsTo(MediaFolder::class);
    }

    // Increment methods
    public function incrementViews()
    {
        $this->increment('views');
    }

    public function incrementDownloads()
    {
        $this->increment('downloads');
    }
}