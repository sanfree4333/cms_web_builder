<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'portfolio_id',
        'nama_produk',
        'kategori',
        'harga_sewa_per_hari',
        'stok_tersedia',
        'gambar_url',
        'is_featured',
    ];

    protected $casts = [
        'harga_sewa_per_hari' => 'integer',
        'stok_tersedia'       => 'integer',
        'is_featured'         => 'boolean',
        'kategori'            => 'string',
    ];

    // ── Relasi ────────────────────────────────────────────────
    /**
     * Setiap produk dimiliki oleh satu portfolio.
     */
    public function portfolio(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Portfolio::class, 'portfolio_id');
    }

    // ── Scope helpers ─────────────────────────────────────────
    /**
     * Hanya ambil produk yang ditandai featured.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
