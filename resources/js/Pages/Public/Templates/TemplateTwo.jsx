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

// ── Product Card (Industrial Style) ──────────────────────────────────────────
function ProductCard({ p, phone }) {
    const available = p.stok_tersedia > 0;
    const msg = `Halo kak, saya ingin membeli *${p.nama_produk}* batu nunggul. Apakah tersedia?`;
    
    return (
        <div className="group relative flex flex-col border-2 border-zinc-900 bg-white transition-transform hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_#ea580c]">
            <div className="relative aspect-square border-b-2 border-zinc-900 bg-zinc-100 overflow-hidden">
                {p.is_featured && (
                    <span className="absolute left-0 top-4 z-10 bg-orange-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white border-y-2 border-r-2 border-zinc-900">
                        Populer
                    </span>
                )}
                {!available && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm">
                        <span className="border-2 border-white bg-transparent px-4 py-1.5 text-sm font-black uppercase text-white tracking-wider">Habis</span>
                    </div>
                )}
                {p.gambar_url ? (
                    <img src={p.gambar_url} alt={p.nama_produk} className="h-full w-full object-cover grayscale-[20%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-300">
                        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                            <path strokeLinecap="square" strokeLinejoin="miter" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-grow p-4 space-y-4">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                        {p.kategori.replace(/_/g, ' ')}
                    </p>
                    <h3 className="mt-1 text-lg font-black leading-tight text-zinc-900 uppercase line-clamp-2">{p.nama_produk}</h3>
                </div>

                <div className="mt-auto pt-4 border-t-2 border-dashed border-zinc-200 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xl font-black tracking-tight text-zinc-900">{formatRp(p.harga_sewa_per_hari)}</p>
                        <p className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">Per Unit</p>
                    </div>

                    {available ? (
                        <a href={waUrl(phone, msg)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center h-10 w-10 border-2 border-zinc-900 bg-orange-500 text-white transition-colors hover:bg-zinc-900 hover:text-white">
                            <WaIcon cls="w-5 h-5" />
                        </a>
                    ) : (
                        <span className="px-3 py-1.5 text-[10px] font-black uppercase text-zinc-400 border-2 border-zinc-200">Kosong</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Main Template ─────────────────────────────────────────────────────────────
export default function TemplateTwo({ portfolio }) {
    const { nama_usaha, bio_deskripsi, nomor_whatsapp, logo_url, banner_url, products = [] } = portfolio;
    const featured = products.filter(p => p.is_featured);
    const regular  = products.filter(p => !p.is_featured);
    const mainWaMsg = `Halo kak, saya ingin membeli batu nunggul dari *${nama_usaha}*. Boleh info lebih lanjut?`;

    return (
        <div className="min-h-screen bg-[#f4f4f5] text-zinc-900 selection:bg-orange-500 selection:text-white" style={{ fontFamily: "'Space Grotesk', 'system-ui', sans-serif" }}>
            
            {/* Navbar - Solid Line Design */}
            <nav className="sticky top-0 z-50 border-b-2 border-zinc-900 bg-[#f4f4f5]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        {logo_url ? (
                            <img src={logo_url} alt="Logo" className="h-12 w-12 border-2 border-zinc-900 object-cover shrink-0" />
                        ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-zinc-900 bg-zinc-900 text-xl font-black text-white">
                                {nama_usaha.charAt(0)}
                            </div>
                        )}
                        <div>
                            <p className="text-lg font-black uppercase tracking-tight text-zinc-900">{nama_usaha}</p>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Material Supply</p>
                        </div>
                    </div>

                    <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                        className="hidden sm:inline-flex border-2 border-zinc-900 bg-orange-500 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#18181b] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#18181b]">
                        Hubungi Kami
                    </a>
                </div>
            </nav>

            {/* Hero Section - Split Layout */}
            <section className="mx-auto max-w-7xl border-b-2 border-zinc-900 lg:flex">
                <div className="flex flex-col justify-center border-b-2 border-zinc-900 lg:w-1/2 lg:border-b-0 lg:border-r-2 lg:border-zinc-900 p-8 py-16 lg:p-16">
                    <div className="mb-6 inline-block border-2 border-zinc-900 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em]">
                        ⚡ Penyedia Batu Nunggul
                    </div>
                    
                    <h1 className="text-5xl font-black uppercase leading-[1.1] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
                        Solid. <br/>
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #18181b' }}>Tangguh.</span><br/>
                        Kuat.
                    </h1>
                    
                    <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-zinc-600 border-l-4 border-orange-500 pl-4">
                        {bio_deskripsi}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-orange-500">
                            <WaIcon /> Order Sekarang
                        </a>
                    </div>
                </div>

                <div className="relative lg:w-1/2 min-h-[400px]">
                    {banner_url ? (
                        <img src={banner_url} alt="Banner" className="absolute inset-0 h-full w-full object-cover grayscale-[30%]" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-200">
                            <div className="text-center font-black uppercase text-zinc-400">
                                <p className="text-6xl mb-4">🏗️</p>
                                <p className="text-xl tracking-widest">Image Area</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/40 to-transparent"></div>
                </div>
            </section>

            {/* Industrial Stats Grid */}
            <div className="mx-auto max-w-7xl border-b-2 border-zinc-900 grid grid-cols-1 sm:grid-cols-3">
                {[
                    { title: 'Total Varian', val: `${products.length}` },
                    { title: 'Siap Kirim', val: `${products.filter(p => p.stok_tersedia > 0).length}` },
                    { title: 'Sistem Bayar', val: 'COD/Transfer' },
                ].map((s, i) => (
                    <div key={s.title} className={`p-6 bg-white ${i !== 2 ? 'border-b-2 sm:border-b-0 sm:border-r-2' : ''} border-zinc-900 text-center`}>
                        <p className="text-4xl font-black text-orange-600">{s.val}</p>
                        <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-zinc-500">{s.title}</p>
                    </div>
                ))}
            </div>

            {/* Catalog Section */}
            <section id="katalog" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                {featured.length > 0 && (
                    <div className="mb-20">
                        <div className="mb-8 flex items-center justify-between border-b-2 border-zinc-900 pb-4">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Prioritas Utama</h2>
                            <span className="hidden sm:block text-xs font-black uppercase tracking-widest text-orange-600">Terpopuler</span>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featured.map(p => <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                        </div>
                    </div>
                )}

                {regular.length > 0 && (
                    <div>
                        <div className="mb-8 flex items-center justify-between border-b-2 border-zinc-900 pb-4">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Katalog Material</h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {regular.map(p => <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                        </div>
                    </div>
                )}

                {products.length === 0 && (
                    <div className="border-2 border-dashed border-zinc-400 bg-zinc-100 px-6 py-24 text-center">
                        <p className="text-6xl">🚧</p>
                        <p className="mt-4 text-xl font-black uppercase tracking-tight text-zinc-900">Katalog Sedang Disiapkan</p>
                    </div>
                )}
            </section>

            {/* Brutalist Footer */}
            <footer className="border-t-2 border-zinc-900 bg-zinc-900 px-5 py-12 text-center lg:px-8">
                <p className="text-2xl font-black uppercase tracking-widest text-white">{nama_usaha}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-500">© {new Date().getFullYear()} · Industrial Theme</p>
            </footer>

            {/* Sharp Floating CTA */}
            <div className="fixed bottom-6 right-6 z-50">
                <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center border-2 border-zinc-900 bg-orange-500 text-white shadow-[4px_4px_0px_#18181b] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_#18181b]">
                    <WaIcon cls="w-7 h-7" />
                </a>
            </div>
        </div>
    );
}