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
        Schema::create('user_role', function (Blueprint $table) {
            $table->foreignId('user_id')->index();
            $table->foreign('user_id')->on('users')->references('id')->cascadeOnDelete();
            $table->foreignId('role_id')->index();
            $table->foreign('role_id')->on('roles')->references('id')->cascadeOnDelete();
            $table->primary(['user_id', 'role_id']);
            $table->engine('InnoDB');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_role');
    }
};
