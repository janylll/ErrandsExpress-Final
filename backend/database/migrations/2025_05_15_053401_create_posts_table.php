<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('content');
            $table->date('deadline_date');
            $table->time('deadline_time');
            $table->string('destination');
            $table->text('image_url')->nullable(); // Store file path or base64 if needed
            $table->enum('status', ['pending', 'accepted', 'runner_completed', 'completed'])->default('pending');
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};

