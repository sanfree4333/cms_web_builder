<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $table = 'portfolios';

    protected $fillable = [
        'nama_usaha',
        'slug',
        'bio_deskripsi',
        'nomor_whatsapp',
        'logo_url',
        'banner_url',
        'layout_template',
        'status_publish',
    ];

    protected $casts = [
        'status_publish' => 'string',
    ];

    // ── Relasi ────────────────────────────────────────────────
    /**
     * Satu portfolio punya banyak produk.
     */
    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class, 'portfolio_id');
    }

    /**
     * Satu portfolio punya banyak activity log.
     */
    public function activityLogs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ActivityLog::class, 'portfolio_id');
    }

    // ── Scope helpers ─────────────────────────────────────────
    /**
     * Hanya ambil portfolio yang sudah PUBLISHED.
     */
    public function scopePublished($query)
    {
        return $query->where('status_publish', 'PUBLISHED');
    }
}
