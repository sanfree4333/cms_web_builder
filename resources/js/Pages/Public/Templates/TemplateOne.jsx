/**
 * Template 1 — Outdoor Adventure (Teal / Dark Slate)
 * Tema: sewa alat camping & outdoor. Dark slate + aksen teal.
 * Layout: Navbar → Hero (banner + bio) → Grid katalog → CTA → Footer
 * Floating Button: "Sewa Sekarang via WhatsApp"
 */

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
    const msg = `Halo kak, saya ingin menyewa *${p.nama_produk}* 🏕️. Apakah tersedia?`;
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden group hover:border-teal-500/60 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-900/30">
            {/* Gambar */}
            <div className="aspect-square bg-slate-700 overflow-hidden relative">
                {p.is_featured && (
                    <span className="absolute top-2 left-2 z-10 bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        ★ Populer
                    </span>
                )}
                {!available && (
                    <div className="absolute inset-0 bg-slate-900/70 z-10 flex items-center justify-center">
                        <span className="text-red-400 text-xs font-bold border border-red-400/50 px-3 py-1 rounded-full">Tidak Tersedia</span>
                    </div>
                )}
                {p.gambar_url
                    ? <img src={p.gambar_url} alt={p.nama_produk}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90" />
                    : <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                    </div>
                }
            </div>
            {/* Info */}
            <div className="p-4">
                <p className="text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {p.kategori.replace(/_/g, ' ')}
                </p>
                <h3 className="text-white font-bold text-sm leading-snug">{p.nama_produk}</h3>
                <div className="flex items-end justify-between mt-3 gap-2">
                    <div>
                        <p className="text-teal-400 font-extrabold text-base leading-none">{formatRp(p.harga_sewa_per_hari)}</p>
                        <p className="text-slate-500 text-xs mt-0.5">/ hari</p>
                    </div>
                    {available
                        ? <a href={waUrl(phone, msg)} target="_blank" rel="noopener noreferrer"
                            className="shrink-0 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition">
                            Sewa
                          </a>
                        : <span className="shrink-0 bg-slate-700 text-slate-500 text-xs px-3 py-1.5 rounded-xl">Habis</span>
                    }
                </div>
                {available && (
                    <p className="text-slate-500 text-xs mt-1.5">Stok: {p.stok_tersedia} unit</p>
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
    const mainWaMsg = `Halo kak, saya ingin menyewa alat camping dari *${nama_usaha}*. Boleh info lebih lanjut?`;

    return (
        <div className="min-h-screen bg-slate-900 text-white" style={{ fontFamily: "'system-ui', sans-serif" }}>

            {/* ── Navbar ─────────────────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        {logo_url
                            ? <img src={logo_url} alt="Logo"
                                className="w-10 h-10 rounded-xl object-cover ring-2 ring-teal-500/40 shrink-0" />
                            : <div className="w-10 h-10 rounded-xl bg-teal-600 text-white text-base font-black flex items-center justify-center shrink-0">
                                {nama_usaha.charAt(0)}
                              </div>
                        }
                        <div className="min-w-0">
                            <p className="font-black text-white text-base leading-none truncate">{nama_usaha}</p>
                            <p className="text-teal-400 text-xs mt-0.5">Sewa Alat Camping & Outdoor</p>
                        </div>
                    </div>
                    <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-lg shadow-teal-900/40">
                        <WaIcon cls="w-4 h-4" />
                        Pesan Sekarang
                    </a>
                </div>
            </nav>

            {/* ── Hero ───────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden">
                {/* Background */}
                {banner_url
                    ? <img src={banner_url} alt="Banner"
                        className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    : <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-slate-900 to-slate-900" />
                }
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900" />

                <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
                    {/* Teks kiri */}
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 bg-teal-900/60 border border-teal-700/50 text-teal-300 text-xs font-bold px-3 py-1.5 rounded-full">
                            🏕️ &nbsp;Rental Alat Camping Terpercaya
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black leading-tight">
                            {nama_usaha}
                            <span className="block text-teal-400 text-3xl sm:text-4xl mt-1">
                                Siap Petualangan?
                            </span>
                        </h1>
                        <p className="text-slate-300 text-base leading-relaxed max-w-md">{bio_deskripsi}</p>
                        <div className="flex flex-wrap gap-3">
                            <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-full transition shadow-xl shadow-teal-900/50 active:scale-95">
                                <WaIcon />
                                Sewa Sekarang via WhatsApp
                            </a>
                        </div>
                        {/* Stats kecil */}
                        <div className="flex flex-wrap gap-5 pt-2">
                            {[
                                { label: 'Jenis Alat', val: `${products.length}+` },
                                { label: 'Siap Disewa', val: `${products.filter(p => p.stok_tersedia > 0).length} unit` },
                                { label: 'Layanan', val: 'COD & Antar' },
                            ].map(s => (
                                <div key={s.label}>
                                    <p className="text-teal-400 font-black text-xl leading-none">{s.val}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Banner foto kanan */}
                    <div className="flex justify-center">
                        {banner_url
                            ? <img src={banner_url} alt="Banner"
                                className="w-full max-w-sm rounded-3xl object-cover shadow-2xl shadow-teal-900/50 border border-teal-800/40"
                                style={{ aspectRatio: '4/3' }} />
                            : <div className="w-full max-w-sm rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-600"
                                style={{ aspectRatio: '4/3' }}>
                                <div className="text-center space-y-2">
                                    <p className="text-5xl">🏕️</p>
                                    <p className="text-sm">Upload foto banner di panel admin</p>
                                </div>
                              </div>
                        }
                    </div>
                </div>
            </section>

            {/* ── Divider ─────────────────────────────────────────────────── */}
            <div className="border-t border-slate-800 bg-slate-800/40">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-around gap-4 text-center">
                    {[
                        { icon: '✓', text: 'Alat Steril & Terawat' },
                        { icon: '⚡', text: 'Cek Ketersediaan Cepat' },
                        { icon: '🚚', text: 'Bisa Antar ke Lokasi' },
                        { icon: '💬', text: 'Konsultasi via WhatsApp' },
                    ].map(f => (
                        <div key={f.text} className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                            <span className="text-teal-400 text-base">{f.icon}</span>
                            {f.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Katalog Produk ──────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 py-14 space-y-12">
                {/* Unggulan */}
                {featured.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1 h-6 bg-teal-500 rounded-full" />
                            <h2 className="text-xl font-black text-white">Alat Paling Sering Disewa</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {featured.map(p => <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                        </div>
                    </div>
                )}

                {/* Semua alat */}
                {regular.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1 h-6 bg-slate-600 rounded-full" />
                            <h2 className="text-xl font-black text-white">Katalog Lengkap Alat Sewa</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {regular.map(p => <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />)}
                        </div>
                    </div>
                )}

                {products.length === 0 && (
                    <div className="text-center py-20 text-slate-600 space-y-3">
                        <p className="text-6xl">🏕️</p>
                        <p className="text-slate-400">Katalog alat sewa akan segera ditampilkan.</p>
                    </div>
                )}
            </section>

            {/* ── CTA Section ─────────────────────────────────────────────── */}
            <section className="bg-gradient-to-r from-teal-900 to-slate-800 border-t border-teal-800/40 py-14">
                <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
                    <h2 className="text-3xl font-black text-white">Siap Memulai Petualangan?</h2>
                    <p className="text-slate-300 text-sm">Hubungi kami lewat WhatsApp untuk cek ketersediaan, harga, dan konfirmasi pemesanan alat camping.</p>
                    <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-full text-base shadow-2xl shadow-teal-900/50 transition active:scale-95">
                        <WaIcon />
                        Chat WhatsApp Sekarang
                    </a>
                    <p className="text-slate-500 text-xs">{nomor_whatsapp}</p>
                </div>
            </section>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center">
                <p className="text-slate-400 text-sm font-semibold">{nama_usaha}</p>
                <p className="text-slate-600 text-xs mt-1">© {new Date().getFullYear()} · Dibuat dengan CMS Web Builder UMKM</p>
            </footer>

            {/* ── Floating WA Button ──────────────────────────────────────── */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <a href={waUrl(nomor_whatsapp, mainWaMsg)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3.5 rounded-full shadow-2xl shadow-teal-900/60 transition active:scale-95 whitespace-nowrap">
                    <WaIcon />
                    Sewa Sekarang via WhatsApp
                </a>
            </div>
            {/* Spacer supaya konten tidak tertutup floating button */}
            <div className="h-20" />
        </div>
    );
}
