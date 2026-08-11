<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $table = 'activity_logs';

    protected $fillable = [
        'admin_id',
        'portfolio_id',
        'aksi',
        'keterangan_perubahan',
    ];

    protected $casts = [
        'portfolio_id' => 'integer',
    ];

    // ── Relasi ────────────────────────────────────────────────
    /**
     * Setiap log dimiliki oleh satu admin.
     */
    public function admin(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    /**
     * Setiap log (opsional) terkait dengan satu portfolio.
     * Nullable karena portfolio bisa dihapus (ON DELETE SET NULL).
     */
    public function portfolio(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Portfolio::class, 'portfolio_id');
    }
}
