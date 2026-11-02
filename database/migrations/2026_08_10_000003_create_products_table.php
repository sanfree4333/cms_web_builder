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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->constrained('portfolios')->cascadeOnDelete();
            $table->string('nama_produk');
            $table->string('kategori')->nullable();
            $table->integer('harga_sewa_per_hari')->default(0);
            $table->integer('stok_tersedia')->default(0);
            $table->string('gambar_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index(['portfolio_id', 'is_featured']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
