<?php
// app/Http\Controllers\Dashboard\MediaController.php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\MediaFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MediaController extends Controller
{
    /**
     * Allowed mime types for upload
     */
    private $allowedMimeTypes = [
        'image' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        'document' => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        'video' => ['video/mp4', 'video/mpeg', 'video/ogg', 'video/webm'],
        'audio' => ['audio/mpeg', 'audio/ogg', 'audio/wav']
    ];

    /**
     * Maximum file size (10MB)
     */
    private $maxFileSize = 10485760; // 10MB in bytes

    
    /**
     * Display a listing of the media.
     */
       public function index(Request $request)
    {
        $perPage = $request->input('per_page', 24);
        $type = $request->input('type', 'all');
        $folderId = $request->input('folder_id');
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $query = Media::with(['folder', 'user'])
            ->when(auth()->check(), function ($query) {
                $query->where(function ($q) {
                    $q->where('is_public', true)
                      ->orWhere('user_id', auth()->id());
                });
            }, function ($query) {
                $query->where('is_public', true);
            });

        // Filter by type
        if ($type !== 'all' && array_key_exists($type, $this->allowedMimeTypes)) {
            $query->where('type', $type);
        }

        // Filter by folder
        if ($folderId) {
            $query->where('folder_id', $folderId);
        } else {
            $query->whereNull('folder_id');
        }

        // Search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('file_name', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        // Sorting
        $validSortColumns = ['name', 'size', 'created_at', 'views', 'downloads'];
        if (in_array($sortBy, $validSortColumns)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        $media = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => [
                'media' => $media->through(function ($item) {
                    return [
                        'id' => $item->id,
                        'name' => $item->name,
                        'fileName' => $item->file_name,
                        'url' => $item->url,
                        'thumbnailUrl' => $item->thumbnail_url,
                        'mimeType' => $item->mime_type,
                        'type' => $item->type,
                        'extension' => $item->extension,
                        'size' => $item->size,
                        'formattedSize' => $item->formatted_size,
                        'dimensions' => $item->dimensions,
                        'dimensionsString' => $item->dimensions_string,
                        'isImage' => $item->is_image,
                        'description' => $item->description,
                        'altText' => $item->alt_text,
                        'caption' => $item->caption,
                        'downloads' => $item->downloads,
                        'views' => $item->views,
                        'isPublic' => $item->is_public,
                        'folderId' => $item->folder_id,
                        'folderName' => $item->folder?->name,
                        'userId' => $item->user_id,
                        'userName' => $item->user?->name,
                        'createdAt' => $item->created_at->toDateTimeString(),
                        'updatedAt' => $item->updated_at->toDateTimeString(),
                    ];
                }),
                'filters' => [
                    'type' => $type,
                    'search' => $search,
                    'sort_by' => $sortBy,
                    'sort_order' => $sortOrder,
                ],
            ],
            'message' => 'Media retrieved successfully.'
        ]);
    }


    /**
     * Upload a new media file.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:' . ($this->maxFileSize / 1024),
            'folder_id' => 'nullable|exists:media_folders,id',
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'alt_text' => 'nullable|string|max:255',
            'caption' => 'nullable|string|max:255',
            'is_public' => ['nullable', 'in:true,false,1,0']
        ]);

        $file = $request->file('file');
        $mimeType = $file->getMimeType();
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $size = $file->getSize();

        // Determine file type
        $type = $this->determineFileType($mimeType);
        if (!$type) {
            return response()->json([
                'success' => false,
                'message' => 'File type not allowed.'
            ], 422);
        }

        // Generate unique filename
        $fileName = Str::random(20) . '_' . time() . '.' . $extension;
        $folderPath = 'uploads/' . date('Y/m');
        $fullPath = $folderPath . '/' . $fileName;

        // Store the file
        $path = $file->storeAs($folderPath, $fileName, 'public');

        if (!$path) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload file.'
            ], 500);
        }

        // Generate URL
        $url = Storage::disk('public')->url($path);

        // Get image dimensions if it's an image (using getimagesize)
        $dimensions = null;
        if ($type === 'image') {
            try {
                $imagePath = storage_path('app/public/' . $path);
                if (file_exists($imagePath)) {
                    $imageInfo = @getimagesize($imagePath);
                    if ($imageInfo) {
                        $dimensions = [
                            'width' => $imageInfo[0],
                            'height' => $imageInfo[1]
                        ];
                    }
                }
            } catch (\Exception $e) {
                // Continue without dimensions
            }
        }

        // Convert is_public to boolean
        $isPublic = $request->input('is_public', true);
        if (is_string($isPublic)) {
            $isPublic = filter_var($isPublic, FILTER_VALIDATE_BOOLEAN);
        }

        // Create media record
        $media = Media::create([
            'name' => $request->input('name') ?? pathinfo($originalName, PATHINFO_FILENAME),
            'file_name' => $originalName,
            'path' => $fullPath,
            'url' => $url,
            'mime_type' => $mimeType,
            'type' => $type,
            'extension' => $extension,
            'size' => $size,
            'dimensions' => $dimensions,
            'user_id' => auth()->id(),
            'folder_id' => $request->input('folder_id'),
            'description' => $request->input('description'),
            'alt_text' => $request->input('alt_text'),
            'caption' => $request->input('caption'),
            'is_public' => $isPublic
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $media->id,
                'name' => $media->name,
                'fileName' => $media->file_name,
                'url' => $media->url,
                'thumbnailUrl' => $media->thumbnail_url,
                'type' => $media->type,
                'size' => $media->size,
                'formattedSize' => $media->formatted_size,
                'dimensions' => $media->dimensions,
                'dimensionsString' => $media->dimensions_string,
                'isImage' => $media->is_image,
                'createdAt' => $media->created_at->toDateTimeString()
            ],
            'message' => 'File uploaded successfully.'
        ], 201);
    }

    /**
     * Determine file type from mime type.
     */
    private function determineFileType($mimeType): ?string
    {
        foreach ($this->allowedMimeTypes as $type => $mimes) {
            if (in_array($mimeType, $mimes)) {
                return $type;
            }
        }
        
        return null;
    }

    /**
     * Upload multiple files at once.
     */
    public function storeMultiple(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:' . ($this->maxFileSize / 1024),
            'folder_id' => 'nullable|exists:media_folders,id',
            'is_public' => ['nullable', 'in:true,false,1,0']
        ]);

        $uploadedFiles = [];
        $failedFiles = [];

        // Convert is_public to boolean
        $isPublic = $request->input('is_public', true);
        if (is_string($isPublic)) {
            $isPublic = filter_var($isPublic, FILTER_VALIDATE_BOOLEAN);
        }

        DB::beginTransaction();
        try {
            foreach ($request->file('files') as $file) {
                try {
                    $mimeType = $file->getMimeType();
                    $type = $this->determineFileType($mimeType);
                    
                    if (!$type) {
                        $failedFiles[] = [
                            'name' => $file->getClientOriginalName(),
                            'error' => 'File type not allowed.'
                        ];
                        continue;
                    }

                    $originalName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $size = $file->getSize();
                    
                    // Generate unique filename
                    $fileName = Str::random(20) . '_' . time() . '.' . $extension;
                    $folderPath = 'uploads/' . date('Y/m');
                    $fullPath = $folderPath . '/' . $fileName;

                    // Store the file
                    $path = $file->storeAs($folderPath, $fileName, 'public');
                    
                    if (!$path) {
                        $failedFiles[] = [
                            'name' => $originalName,
                            'error' => 'Failed to store file.'
                        ];
                        continue;
                    }

                    $url = Storage::disk('public')->url($path);

                    // Get image dimensions if it's an image
                    $dimensions = null;
                    if ($type === 'image') {
                        try {
                            $imagePath = storage_path('app/public/' . $path);
                            if (file_exists($imagePath)) {
                                $imageInfo = @getimagesize($imagePath);
                                if ($imageInfo) {
                                    $dimensions = [
                                        'width' => $imageInfo[0],
                                        'height' => $imageInfo[1]
                                    ];
                                }
                            }
                        } catch (\Exception $e) {
                            // Continue without dimensions
                        }
                    }

                    // Create media record
                    $media = Media::create([
                        'name' => pathinfo($originalName, PATHINFO_FILENAME),
                        'file_name' => $originalName,
                        'path' => $fullPath,
                        'url' => $url,
                        'mime_type' => $mimeType,
                        'type' => $type,
                        'extension' => $extension,
                        'size' => $size,
                        'dimensions' => $dimensions,
                        'user_id' => auth()->id(),
                        'folder_id' => $request->input('folder_id'),
                        'description' => $request->input('description'),
                        'is_public' => $isPublic
                    ]);

                    $uploadedFiles[] = [
                        'id' => $media->id,
                        'name' => $media->name,
                        'fileName' => $media->file_name,
                        'url' => $media->url,
                        'thumbnailUrl' => $media->url, // Use same URL for thumbnail initially
                        'type' => $media->type,
                        'size' => $media->size,
                        'formattedSize' => $media->formatted_size,
                        'dimensions' => $media->dimensions,
                        'dimensionsString' => $media->dimensions_string,
                        'isImage' => $media->type === 'image',
                        'createdAt' => $media->created_at->toDateTimeString()
                    ];
                } catch (\Exception $e) {
                    $failedFiles[] = [
                        'name' => $file->getClientOriginalName(),
                        'error' => $e->getMessage()
                    ];
                }
            }

            DB::commit();

            $response = [
                'success' => true,
                'data' => [
                    'files' => $uploadedFiles,
                    'failed' => $failedFiles
                ],
                'message' => count($uploadedFiles) . ' files uploaded successfully.'
            ];

            if (count($failedFiles) > 0) {
                $response['message'] .= ' ' . count($failedFiles) . ' files failed to upload.';
            }

            return response()->json($response, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload files: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified media.
     */
    public function show(Media $media)
    {
        // Check if user has access
        if (!$media->is_public && $media->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to access this media.'
            ], 403);
        }

        // Increment view count
        $media->incrementViews();

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $media->id,
                'name' => $media->name,
                'fileName' => $media->file_name,
                'url' => $media->url,
                'thumbnailUrl' => $media->thumbnail_url,
                'mimeType' => $media->mime_type,
                'type' => $media->type,
                'extension' => $media->extension,
                'size' => $media->size,
                'formattedSize' => $media->formatted_size,
                'dimensions' => $media->dimensions,
                'dimensionsString' => $media->dimensions_string,
                'isImage' => $media->is_image,
                'description' => $media->description,
                'altText' => $media->alt_text,
                'caption' => $media->caption,
                'downloads' => $media->downloads,
                'views' => $media->views,
                'isPublic' => $media->is_public,
                'folderId' => $media->folder_id,
                'folderName' => $media->folder?->name,
                'userId' => $media->user_id,
                'userName' => $media->user?->name,
                'createdAt' => $media->created_at->toDateTimeString(),
                'updatedAt' => $media->updated_at->toDateTimeString(),
            ],
            'message' => 'Media retrieved successfully.'
        ]);
    }

    /**
     * Update the specified media.
     */
    public function update(Request $request, Media $media)
    {
        // Check if user owns the media
        if ($media->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this media.'
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'alt_text' => 'nullable|string|max:255',
            'caption' => 'nullable|string|max:255',
            'folder_id' => 'nullable|exists:media_folders,id',
            'is_public' => 'boolean'
        ]);

        $media->update($validated);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $media->id,
                'name' => $media->name,
                'description' => $media->description,
                'altText' => $media->alt_text,
                'caption' => $media->caption,
                'folderId' => $media->folder_id,
                'isPublic' => $media->is_public,
                'updatedAt' => $media->updated_at->toDateTimeString(),
            ],
            'message' => 'Media updated successfully.'
        ]);
    }

    /**
     * Remove the specified media.
     */
    public function destroy(Media $media)
    {
        // Check if user owns the media
        if ($media->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this media.'
            ], 403);
        }

        // Delete file from storage
        Storage::disk('public')->delete($media->path);

        // Delete thumbnails if they exist
        if ($media->thumbnails) {
            foreach ($media->thumbnails as $thumbnail) {
                $thumbnailPath = str_replace(Storage::disk('public')->url(''), '', $thumbnail);
                Storage::disk('public')->delete($thumbnailPath);
            }
        }

        // Delete record
        $media->delete();

        return response()->json([
            'success' => true,
            'message' => 'Media deleted successfully.'
        ]);
    }

    /**
     * Delete multiple media files.
     */
    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:media,id'
        ]);

        $deletedCount = 0;
        $failedCount = 0;

        DB::beginTransaction();
        try {
            foreach ($request->ids as $id) {
                $media = Media::find($id);
                
                // Check if user owns the media
                if ($media->user_id !== auth()->id()) {
                    $failedCount++;
                    continue;
                }

                // Delete file from storage
                Storage::disk('public')->delete($media->path);

                // Delete thumbnails if they exist
                if ($media->thumbnails) {
                    foreach ($media->thumbnails as $thumbnail) {
                        $thumbnailPath = str_replace(Storage::disk('public')->url(''), '', $thumbnail);
                        Storage::disk('public')->delete($thumbnailPath);
                    }
                }

                // Delete record
                $media->delete();
                $deletedCount++;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "{$deletedCount} files deleted successfully." . ($failedCount > 0 ? " {$failedCount} files failed to delete." : "")
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete files.'
            ], 500);
        }
    }

    /**
     * Download the media file.
     */
    public function download(Media $media)
    {
        // Check if user has access
        if (!$media->is_public && $media->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to download this media.'
            ], 403);
        }

        // Increment download count
        $media->incrementDownloads();

        $path = storage_path('app/public/' . $media->path);
        
        if (!file_exists($path)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found.'
            ], 404);
        }

        return response()->download($path, $media->file_name);
    }

    /**
     * Get folder tree.
     */
    public function folders(Request $request)
    {
        $query = MediaFolder::withCount('media')
            ->when(auth()->check(), function ($query) {
                $query->where(function ($q) {
                    $q->where('is_public', true)
                      ->orWhere('user_id', auth()->id());
                });
            }, function ($query) {
                $query->where('is_public', true);
            });

        // Get root folders by default
        if (!$request->has('parent_id')) {
            $query->whereNull('parent_id');
        } else {
            $query->where('parent_id', $request->parent_id);
        }

        $folders = $query->orderBy('order')->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $folders->map(function ($folder) {
                return [
                    'id' => $folder->id,
                    'name' => $folder->name,
                    'slug' => $folder->slug,
                    'parentId' => $folder->parent_id,
                    'userId' => $folder->user_id,
                    'order' => $folder->order,
                    'isPublic' => $folder->is_public,
                    'mediaCount' => $folder->media_count,
                    'createdAt' => $folder->created_at->toDateTimeString(),
                    'updatedAt' => $folder->updated_at->toDateTimeString(),
                ];
            }),
            'message' => 'Folders retrieved successfully.'
        ]);
    }

    /**
     * Create a new folder.
     */
    public function createFolder(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:media_folders,id',
            'is_public' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['user_id'] = auth()->id();

        $folder = MediaFolder::create($validated);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $folder->id,
                'name' => $folder->name,
                'slug' => $folder->slug,
                'parentId' => $folder->parent_id,
                'order' => $folder->order,
                'isPublic' => $folder->is_public,
                'createdAt' => $folder->created_at->toDateTimeString(),
            ],
            'message' => 'Folder created successfully.'
        ], 201);
    }

    /**
     * Update media usage (e.g., when media is used in a blog post)
     */
    public function updateUsage(Request $request, Media $media)
    {
        // This method would be called when media is used somewhere
        // For now, we just return success
        return response()->json([
            'success' => true,
            'message' => 'Media usage updated.'
        ]);
    }



    /**
     * Generate thumbnails for images.
     */
    private function generateThumbnails($path, $fileName): array
    {
        $thumbnails = [];
        $storage = Storage::disk('public');
        
        // Thumbnail sizes
        $sizes = [
            'small' => [150, 150],
            'medium' => [300, 300],
            'large' => [600, 600]
        ];

        foreach ($sizes as $sizeName => $dimensions) {
            try {
                $thumbnailPath = 'thumbnails/' . $sizeName . '/' . $fileName;
                
                // Read and process image with Intervention v3
                $image = $this->imageManager->read(storage_path('app/public/' . $path));
                $image->scaleDown($dimensions[0], $dimensions[1]);
                
                // Save the thumbnail
                $image->save(storage_path('app/public/' . $thumbnailPath));
                
                $thumbnails[$sizeName] = $storage->url($thumbnailPath);
            } catch (\Exception $e) {
                // Skip this thumbnail if it fails
                \Log::error('Thumbnail generation error: ' . $e->getMessage());
                continue;
            }
        }

        return $thumbnails;
    }

    
}