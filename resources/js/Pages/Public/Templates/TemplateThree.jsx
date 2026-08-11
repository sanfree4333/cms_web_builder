/**
 * Template 3 — Clean Minimalist (Light Blue / Sky)
 * Tema: portofolio UMKM minimalis modern.
 * Layout: sidebar profil kiri (sticky) + katalog grid bersih kanan.
 */

function formatRp(n) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(n);
}

function waUrl(phone, msg) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

function WaIcon({ cls = 'w-4 h-4' }) {
    return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p, phone }) {
    const available = p.stok_tersedia > 0;
    const msg = `Halo kak, saya ingin menyewa *${p.nama_produk}* (${formatRp(p.harga_sewa_per_hari)}/hari). Apakah tersedia?`;
    return (
        <div className={`bg-white rounded-2xl border overflow-hidden hover:shadow-md transition hover:-translate-y-0.5 group ${
            p.is_featured ? 'border-sky-300 ring-2 ring-sky-100' : 'border-gray-100'
        }`}>
            {/* Gambar */}
            <div className="aspect-video bg-sky-50 overflow-hidden relative">
                {p.is_featured && (
                    <span className="absolute top-2 left-2 z-10 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Unggulan
                    </span>
                )}
                {!available && (
                    <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
                        <span className="text-xs text-red-500 font-bold border border-red-300 px-3 py-1 rounded-full bg-white">Stok Habis</span>
                    </div>
                )}
                {p.gambar_url
                    ? <img src={p.gambar_url} alt={p.nama_produk}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    : <div className="w-full h-full flex items-center justify-center text-sky-200">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                }
            </div>
            {/* Konten */}
            <div className="p-4">
                <p className="text-sky-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                    {p.kategori.replace(/_/g, ' ').toLowerCase()}
                </p>
                <h3 className="font-bold text-gray-800 text-sm leading-snug">{p.nama_produk}</h3>
                <div className="flex items-end justify-between mt-3 gap-2">
                    <div>
                        <p className="text-sky-700 font-extrabold text-base leading-none">{formatRp(p.harga_sewa_per_hari)}</p>
                        <p className="text-gray-400 text-xs mt-0.5">per hari · stok {p.stok_tersedia}</p>
                    </div>
                    {available
                        ? <a href={waUrl(phone, msg)} target="_blank" rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-1 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition">
                            <WaIcon cls="w-3.5 h-3.5" /> Sewa
                          </a>
                        : <span className="shrink-0 bg-gray-100 text-gray-400 text-xs px-3 py-1.5 rounded-xl">Habis</span>
                    }
                </div>
            </div>
        </div>
    );
}

// ── Main Template ─────────────────────────────────────────────────────────────
export default function TemplateThree({ portfolio }) {
    const { nama_usaha, bio_deskripsi, nomor_whatsapp, logo_url, banner_url, products = [] } = portfolio;
    const mainMsg = `Halo kak, saya tertarik menyewa alat dari *${nama_usaha}*. Boleh info lebih lanjut?`;

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'system-ui', sans-serif" }}>

            {/* ── Topbar tipis ─────────────────────────────────────────────── */}
            <div className="bg-sky-600 text-white text-xs text-center py-2 px-4">
                📞 Hubungi kami di WhatsApp:{' '}
                <a href={waUrl(nomor_whatsapp, mainMsg)} target="_blank" rel="noopener noreferrer"
                    className="font-bold underline hover:text-sky-100 transition">
                    {nomor_whatsapp}
                </a>
            </div>

            {/* ── Navbar ───────────────────────────────────────────────────── */}
            <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        {logo_url
                            ? <img src={logo_url} alt="Logo" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                            : <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-black text-base flex items-center justify-center shrink-0">
                                {nama_usaha.charAt(0)}
                              </div>
                        }
                        <span className="font-black text-gray-800 text-base truncate">{nama_usaha}</span>
                    </div>
                    <a href={waUrl(nomor_whatsapp, mainMsg)} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold px-5 py-2 rounded-full transition shadow-sm">
                        <WaIcon cls="w-4 h-4" />
                        Pesan Sekarang
                    </a>
                </div>
            </nav>

            {/* ── Body: Sidebar + Konten ───────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 py-8 lg:flex gap-8 items-start">

                {/* ── SIDEBAR KIRI (sticky) ───────────────────────────────── */}
                <aside className="lg:w-72 shrink-0 space-y-4 mb-8 lg:mb-0 lg:sticky lg:top-24">

                    {/* Profil Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Banner mini */}
                        <div className="h-24 bg-gradient-to-br from-sky-500 to-sky-700 relative overflow-hidden">
                            {banner_url && (
                                <img src={banner_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                            )}
                        </div>
                        <div className="px-5 pt-0 pb-5">
                            {/* Logo */}
                            <div className="-mt-7 mb-3">
                                {logo_url
                                    ? <img src={logo_url} alt="Logo"
                                        className="w-14 h-14 rounded-2xl object-cover border-4 border-white shadow-md" />
                                    : <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white font-black text-xl flex items-center justify-center border-4 border-white shadow-md">
                                        {nama_usaha.charAt(0)}
                                      </div>
                                }
                            </div>
                            <h1 className="text-base font-extrabold text-gray-800 leading-tight">{nama_usaha}</h1>
                            <p className="text-sky-600 text-xs font-semibold mt-0.5">Sewa Alat Camping & Outdoor</p>
                            <p className="text-gray-500 text-xs mt-2 leading-relaxed">{bio_deskripsi}</p>
                        </div>
                    </div>

                    {/* Kontak Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kontak & Pemesanan</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <WaIcon cls="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="font-mono text-xs">{nomor_whatsapp}</span>
                        </div>
                        <a href={waUrl(nomor_whatsapp, mainMsg)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold py-2.5 rounded-xl transition">
                            <WaIcon cls="w-4 h-4" />
                            Chat WhatsApp
                        </a>
                    </div>

                    {/* Statistik Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Info Usaha</p>
                        <div className="space-y-2.5">
                            {[
                                { label: 'Total Produk',     val: products.length,                                 color: 'text-sky-600' },
                                { label: 'Tersedia Disewa',  val: products.filter(p => p.stok_tersedia > 0).length, color: 'text-emerald-600' },
                                { label: 'Produk Unggulan',  val: products.filter(p => p.is_featured).length,      color: 'text-amber-500' },
                            ].map(row => (
                                <div key={row.label} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 text-xs">{row.label}</span>
                                    <span className={`font-extrabold text-base ${row.color}`}>{row.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Jaminan */}
                    <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 space-y-2">
                        <p className="text-xs font-bold text-sky-700 uppercase tracking-wider">Jaminan Kami</p>
                        {['Alat steril & dicuci tiap pakai', 'Kondisi alat selalu dicek', 'Harga transparan, no hidden fee', 'Fast response via WA'].map(j => (
                            <div key={j} className="flex items-start gap-2 text-xs text-sky-700">
                                <span className="text-sky-500 font-bold shrink-0">✓</span>
                                {j}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* ── KONTEN KANAN ─────────────────────────────────────────── */}
                <main className="flex-1 min-w-0 space-y-8">

                    {/* Banner hero */}
                    {banner_url && (
                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                            <img src={banner_url} alt="Banner"
                                className="w-full object-cover"
                                style={{ aspectRatio: '21/8', objectPosition: 'center' }} />
                        </div>
                    )}

                    {/* Produk Unggulan */}
                    {products.filter(p => p.is_featured).length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="font-extrabold text-gray-800">Alat Paling Sering Disewa</h2>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {products.filter(p => p.is_featured).map(p =>
                                    <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Semua Produk */}
                    {products.filter(p => !p.is_featured).length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="font-extrabold text-gray-800">Katalog Lengkap Alat Sewa</h2>
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {products.filter(p => !p.is_featured).map(p =>
                                    <ProductCard key={p.id} p={p} phone={nomor_whatsapp} />
                                )}
                            </div>
                        </div>
                    )}

                    {products.length === 0 && (
                        <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
                            <p className="text-5xl mb-3">🏕️</p>
                            <p className="text-gray-400 text-sm">Katalog alat sewa akan segera ditampilkan.</p>
                        </div>
                    )}
                </main>
            </div>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <footer className="mt-12 bg-white border-t border-gray-100 py-6 text-center">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} <span className="font-bold">{nama_usaha}</span>
                    <span className="text-gray-300 mx-2">·</span>
                    <span className="text-gray-400">Dibuat dengan CMS Web Builder UMKM</span>
                </p>
            </footer>
        </div>
    );
}
