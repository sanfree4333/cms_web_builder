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

// ── Featured Product (Large Grid) ─────────────────────────────────────────────
function FeaturedCard({ p, phone }) {
    const available = p.stok_tersedia > 0;
    const msg = `Halo kak, saya ingin membeli produk unggulan *${p.nama_produk}*.`;
    
    return (
        <div className="group relative bg-white p-3 rounded-2xl shadow-sm border border-stone-200/60 hover:shadow-xl hover:shadow-stone-200/50 transition duration-500">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-100">
                {!available && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px]">
                        <span className="bg-white/90 px-5 py-2 text-xs font-bold uppercase tracking-widest text-stone-800">Habis</span>
                    </div>
                )}
                {p.gambar_url ? (
                    <img src={p.gambar_url} alt={p.nama_produk} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-stone-300">Foto</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#2c3b2e] rounded-full">
                    Top Pick
                </div>
            </div>
            <div className="pt-5 pb-3 px-2 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-2">{p.kategori.replace(/_/g, ' ')}</p>
                <h3 className="font-serif text-xl font-medium text-stone-800 mb-3">{p.nama_produk}</h3>
                <p className="text-lg text-[#2c3b2e]">{formatRp(p.harga_sewa_per_hari)}</p>
                
                <div className="mt-5 flex justify-center">
                    {available ? (
                        <a href={waUrl(phone, msg)} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 border border-[#2c3b2e] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#2c3b2e] hover:bg-[#2c3b2e] hover:text-white transition-colors">
                            Pesan Sekarang
                        </a>
                    ) : (
                        <span className="px-6 py-2.5 rounded-full bg-stone-100 text-xs font-bold uppercase tracking-widest text-stone-400">Tidak Tersedia</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Regular Product (Horizontal List View) ────────────────────────────────────
function ListItemCard({ p, phone }) {
    const available = p.stok_tersedia > 0;
    const msg = `Halo kak, saya tertarik dengan *${p.nama_produk}*.`;

    return (
        <div className="group flex flex-col sm:flex-row gap-5 py-6 border-b border-stone-200/70 hover:bg-white/50 transition-colors px-4 rounded-xl">
            <div className="w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-xl bg-stone-100 relative">
                {p.gambar_url ? (
                    <img src={p.gambar_url} alt={p.nama_produk} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-stone-300 text-xs">No Image</div>
                )}
            </div>
            
            <div className="flex flex-col flex-grow justify-center py-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">
                    {p.kategori.replace(/_/g, ' ')}
                </p>
                <h3 className="font-serif text-2xl font-medium text-stone-800 line-clamp-1">{p.nama_produk}</h3>
                
                <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xl text-[#2c3b2e]">{formatRp(p.harga_sewa_per_hari)}</p>
                        {available && <p className="text-[11px] text-stone-500 mt-1">Stok: {p.stok_tersedia} unit</p>}
                    </div>
                    
                    {available ? (
                        <a href={waUrl(phone, msg)} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 bg-[#2c3b2e] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-stone-800 transition-colors">
                            <WaIcon cls="w-4 h-4" /> Beli
                        </a>
                    ) : (
                        <span className="px-5 py-2.5 rounded-full border border-stone-200 text-xs font-bold uppercase tracking-widest text-stone-400">Habis</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Main Template ─────────────────────────────────────────────────────────────
export default function TemplateThree({ portfolio }) {
    const { nama_usaha, bio_deskripsi, nomor_whatsapp, logo_url, banner_url, products = [] } = portfolio;
    const featured = products.filter(p => p.is_featured);
    const regular  = products.filter(p => !p.is_featured);
    const mainWaMsg = `Halo kak, saya ingin konsultasi mengenai batu nunggul dari *${nama_usaha}*.`;

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-stone-800 selection:bg-[#2c3b2e] selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            
            {/* Split Centered Navbar */}
            <nav className="border-b border-stone-200/50 bg-[#F9F8F6]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div className="w-1/3 hidden md:block">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Material Alam</span>
                    </div>
                    
                    <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
                        {logo_url && <img src={logo_url} alt="Logo" className="h-8 w-8 mb-1 rounded-full object-cover" />}
                        <p className="font-serif text-lg font-bold tracking-wide text-stone-900 text-center">{nama_usaha}</p>
                    </div>

                    <div className="w-auto md:w-1/3 flex justify-end">
                        <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2c3b2e] hover:text-stone-500 transition-colors">
                            Hubungi <WaIcon cls="w-4 h-4 hidden sm:block" />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Editorial Hero Section */}
            <header className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-7xl text-stone-900 leading-[1.1] mb-6">
                    Keindahan Bawaan <br />
                    <span className="italic text-stone-500 font-light">untuk Konstruksi Anda.</span>
                </h1>
                <p className="max-w-xl mx-auto text-stone-600 leading-relaxed text-sm md:text-base">
                    {bio_deskripsi}
                </p>
                <div className="mt-10">
                    <a href="#katalog" className="text-xs font-bold uppercase tracking-[0.2em] border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
                        Lihat Koleksi
                    </a>
                </div>
            </header>

            {/* Arched Banner Image */}
            <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="relative w-full h-[60vh] md:h-[75vh] rounded-t-[100px] md:rounded-t-[200px] overflow-hidden shadow-2xl shadow-stone-300/30">
                    {banner_url ? (
                        <img src={banner_url} alt="Banner" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-stone-300 flex items-center justify-center flex-col text-stone-50">
                            <span className="text-5xl mb-4">🪨</span>
                            <span className="font-serif text-2xl tracking-widest uppercase">Visual Usaha</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Subtle Minimalist Stats */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-stone-200">
                    {[
                        { l: 'Koleksi', v: products.length },
                        { l: 'Ready Stock', v: products.filter(p => p.stok_tersedia > 0).length },
                        { l: 'Kualitas', v: 'Premium' },
                        { l: 'Layanan', v: 'Antar Tujuan' },
                    ].map(s => (
                        <div key={s.l} className="text-center px-4">
                            <p className="font-serif text-2xl md:text-3xl text-stone-800 mb-2">{s.v}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{s.l}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Catalog Section */}
            <section id="katalog" className="bg-white py-24 px-6 mt-12 rounded-t-[3rem]">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Featured Area (Grid) */}
                    {featured.length > 0 && (
                        <div className="mb-24">
                            <div className="text-center mb-12">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2c3b2e] mb-3 block">Sorotan</span>
                                <h2 className="font-serif text-4xl text-stone-900">Pilihan Utama</h2>
                            </div>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {featured.map(p => <FeaturedCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                            </div>
                        </div>
                    )}

                    {/* Regular Area (Horizontal List) */}
                    {regular.length > 0 && (
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-end justify-between border-b-2 border-stone-900 pb-4 mb-8">
                                <h2 className="font-serif text-3xl text-stone-900">Katalog Lengkap</h2>
                                <span className="text-xs text-stone-500 uppercase tracking-widest">{regular.length} Item</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {regular.map(p => <ListItemCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                            </div>
                        </div>
                    )}

                    {products.length === 0 && (
                        <div className="py-32 text-center flex flex-col items-center">
                            <div className="h-20 w-px bg-stone-300 mb-8"></div>
                            <p className="font-serif text-2xl text-stone-500 italic">Koleksi sedang disiapkan.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Elegant Footer */}
            <footer className="bg-stone-900 text-stone-400 py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">Siap mewujudkan visi proyek Anda?</h2>
                    <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors">
                        Mulai Konsultasi <WaIcon />
                    </a>
                    
                    <div className="mt-20 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wider uppercase">
                        <p>{nama_usaha}</p>
                        <p>© {new Date().getFullYear()} Editorial Theme</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}