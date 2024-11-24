<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->integer('creator_id');
            $table->string('name', 255);
            $table->string('slug', 255);
            $table->longText('description')->nullable();
            $table->text('image')->nullable();
            $table->string('meta_title')->nullable();
            $table->mediumText('meta_keyword')->nullable();
            $table->mediumText('meta_description')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
