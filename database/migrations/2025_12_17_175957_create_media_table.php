<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('file_name'); 
            $table->string('path'); 
            $table->string('url'); 
            $table->string('mime_type'); 
            $table->string('type')->default('image'); 
            $table->string('extension'); 
            $table->unsignedBigInteger('size'); 
            $table->json('dimensions')->nullable(); 
            $table->json('thumbnails')->nullable(); 
            $table->unsignedBigInteger('user_id')->nullable(); 
            $table->unsignedBigInteger('folder_id')->nullable(); 
            $table->text('description')->nullable();
            $table->string('alt_text')->nullable(); 
            $table->string('caption')->nullable();
            $table->integer('downloads')->default(0);
            $table->integer('views')->default(0);
            $table->boolean('is_public')->default(true);
            $table->softDeletes();
            $table->timestamps();

            // Indexes
            $table->index('type');
            $table->index('user_id');
            $table->index('folder_id');
            $table->index('is_public');
            $table->index('created_at');
        });

        // Folders table for organizing media
        Schema::create('media_folders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_public')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('parent_id')->references('id')->on('media_folders')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('media_folders');
    }
};