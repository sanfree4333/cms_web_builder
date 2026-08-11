<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Halaman publik portfolio berdasarkan slug.
     * GET /{slug}
     */
    public function showPublic(string $slug)
    {
        $portfolio = Portfolio::where('slug', $slug)
            ->where('status_publish', 'PUBLISHED')
            ->with([
                'products' => fn ($q) => $q->orderByDesc('is_featured')->orderBy('nama_produk'),
            ])
            ->first();

        if (! $portfolio) {
            return Inertia::render('Public/Error404', [
                'slug' => $slug,
            ])->toResponse(request())->setStatusCode(404);
        }

        return Inertia::render('Public/PortfolioShow', [
            'portfolio' => [
                'id'              => $portfolio->id,
                'nama_usaha'      => $portfolio->nama_usaha,
                'slug'            => $portfolio->slug,
                'bio_deskripsi'   => $portfolio->bio_deskripsi,
                'nomor_whatsapp'  => $portfolio->nomor_whatsapp,
                'logo_url'        => $portfolio->logo_url
                    ? asset('storage/' . $portfolio->logo_url) : null,
                'banner_url'      => $portfolio->banner_url
                    ? asset('storage/' . $portfolio->banner_url) : null,
                'layout_template' => $portfolio->layout_template,
                'products'        => $portfolio->products->map(fn ($p) => [
                    'id'                  => $p->id,
                    'nama_produk'         => $p->nama_produk,
                    'kategori'            => $p->kategori,
                    'harga_sewa_per_hari' => $p->harga_sewa_per_hari,
                    'stok_tersedia'       => $p->stok_tersedia,
                    'gambar_url'          => $p->gambar_url
                        ? asset('storage/' . $p->gambar_url) : null,
                    'is_featured'         => $p->is_featured,
                ]),
            ],
        ]);
    }
}
