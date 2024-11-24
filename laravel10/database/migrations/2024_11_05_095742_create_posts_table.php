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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->integer('creator_id');
            $table->string('name', 255);
            $table->string('slug', 255);
            $table->text('image')->nullable();
            $table->text('description')->nullable();
            $table->text('content')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_keyword')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('brand');
            $table->string('cost_price');
            $table->string('sale_price');
            $table->integer('qty');
            $table->tinyInteger('featured')->default(0)->nullable();
            $table->tinyInteger('popular')->default(0)->nullable();
            $table->tinyInteger('status')->default(0);
            $table->softDeletes();
            $table->timestamps();
            $table->engine('InnoDB');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
