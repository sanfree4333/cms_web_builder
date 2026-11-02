<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ── Stats (hapus total_draft, tidak digunakan lagi) ───
        $stats = [
            'total_umkm'      => Portfolio::count(),
            'total_published' => Portfolio::where('status_publish', 'PUBLISHED')->count(),
        ];

        // ── Portfolios lengkap untuk semua tab ────────────────
        $portfolios = Portfolio::withCount('products')
            ->latest()
            ->paginate(20)
            ->through(fn ($p) => [
                'id'              => $p->id,
                'nama_usaha'      => $p->nama_usaha,
                'slug'            => $p->slug,
                'nomor_whatsapp'  => $p->nomor_whatsapp,
                'layout_template' => $p->layout_template,
                'status_publish'  => $p->status_publish,
                'products_count'  => $p->products_count,
                'logo_url'        => $p->logo_url   ? asset('storage/' . $p->logo_url)   : null,
                'banner_url'      => $p->banner_url  ? asset('storage/' . $p->banner_url) : null,
                'created_at'      => optional($p->created_at)->format('d M Y') ?? '-',
            ]);

        // ── Activity log terbaru ──────────────────────────────
        $recentLogs = ActivityLog::with(['admin:id,nama_admin', 'portfolio:id,nama_usaha'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($log) => [
                'id'                   => $log->id,
                'aksi'                 => $log->aksi,
                'keterangan_perubahan' => $log->keterangan_perubahan,
                'created_at'           => optional($log->created_at)->diffForHumans() ?? '-',
                'admin_nama'           => $log->admin?->nama_admin    ?? '—',
                'portfolio_nama'       => $log->portfolio?->nama_usaha ?? '(dihapus)',
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats'      => $stats,
            'recentLogs' => $recentLogs,
            'portfolios' => $portfolios,
            'adminName'  => Auth::guard('admin')->user()->nama_admin,
        ]);
    }
}
