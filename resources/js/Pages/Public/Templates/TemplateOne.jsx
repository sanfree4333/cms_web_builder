import React from 'react';

function formatRp(n) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(n);
}

// ── WhatsApp helpers ──────────────────────────────────────────────────────────
function waUrl(phone, msg) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function WaIcon({ cls = 'w-5 h-5' }) {
    return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p, phone }) {
    const available = p.stok_tersedia > 0;
    const msg = `Halo kak, saya ingin membeli *${p.nama_produk}* batu nunggul. Apakah tersedia?`;
    
    return (
        <div className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/5">
            <div className="relative aspect-square overflow-hidden bg-slate-100">
                {p.is_featured && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-teal-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-md">
                        Populer
                    </span>
                )}
                {!available && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px]">
                        <span className="rounded-full border border-red-400 bg-red-500/20 px-4 py-1.5 text-xs font-bold text-white">Habis</span>
                    </div>
                )}
                {p.gambar_url ? (
                    <img src={resolveImageUrl(p.gambar_url)} alt={p.nama_produk} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="space-y-3 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600">
                    {p.kategori.replace(/_/g, ' ')}
                </p>
                <h3 className="text-base font-bold leading-snug text-slate-800 line-clamp-2">{p.nama_produk}</h3>

                <div className="flex items-end justify-between gap-3 pt-2">
                    <div>
                        <p className="text-lg font-black text-slate-900">{formatRp(p.harga_sewa_per_hari)}</p>
                        <p className="text-[11px] font-medium text-slate-500">/ unit</p>
                    </div>

                    {available ? (
                        <a href={waUrl(phone, msg)} target="_blank" rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white transition-colors hover:bg-teal-700">
                            <WaIcon cls="w-4 h-4" />
                        </a>
                    ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-400">Habis</span>
                    )}
                </div>

                {available && (
                    <p className="pt-1 text-[11px] font-medium text-slate-500">Stok: {p.stok_tersedia} unit siap kirim</p>
                )}
            </div>
        </div>
    );
}

// ── Main Template ─────────────────────────────────────────────────────────────
export default function TemplateOne({ portfolio }) {
    const { nama_usaha, bio_deskripsi, nomor_whatsapp, logo_url, banner_url, products = [] } = portfolio;
    const featured = products.filter(p => p.is_featured);
    const regular  = products.filter(p => !p.is_featured);
    const mainWaMsg = `Halo kak, saya ingin membeli batu nunggul dari *${nama_usaha}*. Boleh info lebih lanjut?`;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-teal-200 selection:text-teal-900" style={{ fontFamily: "'Inter', 'system-ui', sans-serif" }}>
            
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                        {logo_url ? (
                            <img src={resolveImageUrl(logo_url)} alt="Logo" className="h-10 w-10 rounded-xl object-cover ring-2 ring-slate-100 shrink-0" />
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-lg font-black text-white shadow-sm">
                                {nama_usaha.charAt(0)}
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="truncate text-base font-black text-slate-900">{nama_usaha}</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-600">Template Web 1</p>
                        </div>
                    </div>

                    <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20">
                        Hubungi Kami
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 pb-20 pt-16 lg:pt-24">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(13, 148, 136, 0.4), transparent 50%), radial-gradient(circle at 85% 30%, rgba(20, 184, 166, 0.3), transparent 50%)' }} />
                
                <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-400 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span></span>
                            Template Web 1
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                                {nama_usaha}
                                <span className="mt-2 block bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">Pilihan Tepat Proyek Anda</span>
                            </h1>
                            <p className="max-w-lg text-base leading-relaxed text-slate-300">{bio_deskripsi}</p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-teal-600 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-600/25">
                                <WaIcon /> Pesan Sekarang
                            </a>
                            <a href="#katalog" className="rounded-full bg-slate-800 px-7 py-3.5 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-700">
                                Lihat Katalog
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-md lg:max-w-full">
                        <div className="relative overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-800 p-2 shadow-2xl">
                            {banner_url ? (
                                <img src={resolveImageUrl(banner_url)} alt="Banner" className="h-[400px] w-full rounded-[1.5rem] object-cover" />
                            ) : (
                                <div className="flex h-[400px] w-full items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-slate-700 to-slate-900 text-center text-white">
                                    <div className="space-y-4">
                                        <p className="text-6xl">🏗️</p>
                                        <p className="text-2xl font-black">Template Web 1</p>
                                        <p className="text-sm font-medium text-teal-400">Siap Kirim ke Lokasi</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Stats */}
            <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-5">
                <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:grid-cols-3">
                    {[
                        { title: 'Stok Produk', val: `${products.length}+`, icon: '📦' },
                        { title: 'Varian Aktif', val: `${products.filter(p => p.stok_tersedia > 0).length}`, icon: '⚡' },
                        { title: 'Pengiriman', val: 'Cepat & Aman', icon: '🚚' },
                    ].map(s => (
                        <div key={s.title} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xl">{s.icon}</div>
                            <div>
                                <p className="text-xl font-black text-slate-900">{s.val}</p>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{s.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Catalog Section */}
            <section id="katalog" className="mx-auto max-w-6xl px-5 py-20">
                {featured.length > 0 && (
                    <div className="mb-14">
                        <div className="mb-8 flex flex-col items-center text-center">
                            <span className="mb-3 rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-700">Unggulan</span>
                            <h2 className="text-3xl font-black text-slate-900">Produk Terlaris</h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featured.map(p => <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                        </div>
                    </div>
                )}

                {regular.length > 0 && (
                    <div>
                        <div className="mb-8 flex flex-col items-center text-center">
                            <h2 className="text-3xl font-black text-slate-900">Katalog Lengkap</h2>
                            <p className="mt-3 text-sm text-slate-500">Pilih kebutuhan batu nunggul untuk konstruksi Anda.</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {regular.map(p => <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                        </div>
                    </div>
                )}

                {products.length === 0 && (
                    <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white px-6 py-20 text-center">
                        <p className="text-6xl">🪨</p>
                        <p className="mt-4 text-lg font-bold text-slate-900">Belum Ada Produk</p>
                        <p className="mt-2 text-sm text-slate-500">Katalog batu nunggul akan segera ditambahkan ke halaman ini.</p>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-8 text-center">
                <p className="text-base font-black text-slate-900">{nama_usaha}</p>
                <p className="mt-2 text-xs font-medium text-slate-500">© {new Date().getFullYear()} · Template web 1</p>
            </footer>

            {/* Floating CTA */}
            <div className="fixed bottom-6 right-6 z-50">
                <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-xl shadow-teal-600/30 transition-transform hover:scale-110">
                    <WaIcon cls="w-7 h-7" />
                </a>
            </div>
        </div>
    );
}

function resolveImageUrl(url) {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url;
    // asumsi backend menyimpan di storage/app/public dan tersedia lewat /storage/
    if (url.startsWith('/')) return url;
    return `/storage/${url}`;
}