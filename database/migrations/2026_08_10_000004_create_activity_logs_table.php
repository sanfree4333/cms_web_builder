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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')
                  ->constrained('admins')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');
            $table->foreignId('portfolio_id')
                  ->nullable()
                  ->constrained('portfolios')
                  ->onUpdate('cascade')
                  ->onDelete('set null');
            $table->string('aksi');
            $table->text('keterangan_perubahan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
