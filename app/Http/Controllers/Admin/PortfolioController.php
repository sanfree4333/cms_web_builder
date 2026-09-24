<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Portfolio;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    // ── Helper: activity log ──────────────────────────────────
    private function log(string $aksi, string $keterangan, int $portfolioId): void
    {
        ActivityLog::create([
            'admin_id'             => Auth::guard('admin')->id(),
            'portfolio_id'         => $portfolioId,
            // Indonesian-named columns (used across app)
            'aksi'                 => $aksi,
            'keterangan_perubahan' => $keterangan,
            // English-named columns (existing schema from original migration)
            'action'               => $aksi,
            'description'          => $keterangan,
        ]);
    }

    // ── Helper: upload gambar ─────────────────────────────────
    private function uploadImage(Request $request, string $field, string $folder): ?string
    {
        return $request->hasFile($field)
            ? $request->file($field)->store($folder, 'public')
            : null;
    }

    // ── index ─────────────────────────────────────────────────
    public function index()
    {
        // Redirect ke DashboardController yang mengelola semua data
        return redirect()->route('admin.dashboard');
    }

    // ── store — status SELALU PUBLISHED ──────────────────────
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_usaha'      => ['required', 'string', 'max:255'],
            'bio_deskripsi'   => ['required', 'string'],
            'nomor_whatsapp'  => ['required', 'string', 'max:20'],
            'logo'            => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'banner'          => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'layout_template' => ['required', 'string', 'in:layout_1,layout_2,layout_3'],
        ]);

        // Generate slug unik otomatis
        $slug     = Str::slug($validated['nama_usaha']);
        $baseSlug = $slug;
        $counter  = 1;
        while (Portfolio::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        $portfolio = Portfolio::create([
            'nama_usaha'      => $validated['nama_usaha'],
            'slug'            => $slug,
            'bio_deskripsi'   => $validated['bio_deskripsi'],
            'nomor_whatsapp'  => $validated['nomor_whatsapp'],
            'logo_url'        => $this->uploadImage($request, 'logo',   'uploads/logos'),
            'banner_url'      => $this->uploadImage($request, 'banner', 'uploads/banners'),
            'layout_template' => $validated['layout_template'],
            'status_publish'  => 'PUBLISHED', // selalu PUBLISHED
        ]);

        $this->log(
            'TAMBAH_PORTFOLIO',
            "Website '{$portfolio->nama_usaha}' (/{$portfolio->slug}) berhasil diterbitkan.",
            $portfolio->id
        );

        return redirect()->route('admin.dashboard')
            ->with('success', "Website '{$portfolio->nama_usaha}' berhasil diterbitkan. URL: /{$portfolio->slug}");
    }

    // ── update — status SELALU PUBLISHED ─────────────────────
    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'nama_usaha'      => ['required', 'string', 'max:255'],
            'bio_deskripsi'   => ['required', 'string'],
            'nomor_whatsapp'  => ['required', 'string', 'max:20'],
            'logo'            => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'banner'          => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'layout_template' => ['required', 'string', 'in:layout_1,layout_2,layout_3'],
        ]);

        // Regenerasi slug jika nama berubah
        if ($validated['nama_usaha'] !== $portfolio->nama_usaha) {
            $newSlug = Str::slug($validated['nama_usaha']);
            if (Portfolio::where('slug', $newSlug)->where('id', '!=', $portfolio->id)->exists()) {
                return back()->withErrors(['nama_usaha' => 'Nama usaha sudah digunakan, coba nama lain.']);
            }
            $portfolio->slug = $newSlug;
        }

        // Ganti logo
        if ($request->hasFile('logo')) {
            if ($portfolio->logo_url) Storage::disk('public')->delete($portfolio->logo_url);
            $portfolio->logo_url = $request->file('logo')->store('uploads/logos', 'public');
        }

        // Ganti banner
        if ($request->hasFile('banner')) {
            if ($portfolio->banner_url) Storage::disk('public')->delete($portfolio->banner_url);
            $portfolio->banner_url = $request->file('banner')->store('uploads/banners', 'public');
        }

        $portfolio->fill([
            'nama_usaha'      => $validated['nama_usaha'],
            'bio_deskripsi'   => $validated['bio_deskripsi'],
            'nomor_whatsapp'  => $validated['nomor_whatsapp'],
            'layout_template' => $validated['layout_template'],
            'status_publish'  => 'PUBLISHED', // selalu PUBLISHED
        ]);

        $portfolio->save();

        $this->log(
            'EDIT_PORTFOLIO',
            "Website '{$portfolio->nama_usaha}' (/{$portfolio->slug}) berhasil diperbarui.",
            $portfolio->id
        );

        return redirect()->route('admin.dashboard')
            ->with('success', "Website '{$portfolio->nama_usaha}' berhasil diperbarui.");
    }

    // ── destroy — hapus portfolio + produk + file storage ────
    public function destroy(Portfolio $portfolio)
    {
        $namaUsaha = $portfolio->nama_usaha;
        $slug      = $portfolio->slug;

        // Hapus file storage produk-produk terkait
        $portfolio->products->each(function (Product $product) {
            if ($product->gambar_url) {
                Storage::disk('public')->delete($product->gambar_url);
            }
        });

        // Hapus semua produk terkait
        $portfolio->products()->delete();

        // Hapus file storage portfolio
        if ($portfolio->logo_url)   Storage::disk('public')->delete($portfolio->logo_url);
        if ($portfolio->banner_url) Storage::disk('public')->delete($portfolio->banner_url);

        // Log sebelum delete (FK set null setelah delete)
        $this->log(
            'HAPUS_PORTFOLIO',
            "Website '{$namaUsaha}' (/{$slug}) beserta semua produknya dihapus permanen.",
            $portfolio->id
        );

        $portfolio->delete();

        return redirect()->route('admin.dashboard')
            ->with('success', "Website '{$namaUsaha}' dan semua datanya berhasil dihapus.");
    }

    // ── togglePublish (tidak digunakan tapi dipertahankan) ───
    public function togglePublish(Portfolio $portfolio)
    {
        // Karena sistem tidak lagi pakai DRAFT, toggle selalu ke PUBLISHED
        $portfolio->update(['status_publish' => 'PUBLISHED']);
        return back()->with('success', 'Status website diaktifkan.');
    }

    // ── stubs ─────────────────────────────────────────────────
    public function show(Portfolio $portfolio) {}
    public function create() {}
    public function edit(Portfolio $portfolio) {}
}
