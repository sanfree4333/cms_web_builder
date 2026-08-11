/**
 * Template 2 — Modern Equipment Rental (Emerald / Forest Green)
 * Tema: jasa sewa profesional. Header bersih, profil usaha, jaminan kebersihan,
 * tabel paket sewa (Paket 2 Orang / 4 Orang), katalog produk, tombol WA hijau.
 */

function formatRp(n) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(n);
}

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

// ── Paket sewa statis (otomatis dari produk jika tersedia) ────────────────────
function buildPaket(products, phone) {
    // Ambil 2 produk featured sebagai paket, fallback ke 2 produk pertama
    const pool = [...products.filter(p => p.is_featured), ...products.filter(p => !p.is_featured)];
    if (pool.length === 0) return [];
    const paket = [
        {
            nama: 'Paket 2 Orang',
            desc: 'Cocok untuk weekend getaway berdua',
            items: pool.slice(0, Math.min(3, pool.length)).map(p => p.nama_produk),
            harga: pool.slice(0, Math.min(3, pool.length)).reduce((s, p) => s + p.harga_sewa_per_hari, 0),
            msg: `Halo kak, saya ingin pesan *Paket 2 Orang* dari ${pool[0]?.nama_produk ?? 'katalog Anda'}. Boleh info lebih lanjut?`,
            badge: null,
        },
        {
            nama: 'Paket 4 Orang',
            desc: 'Ideal untuk grup camping bareng teman',
            items: pool.slice(0, Math.min(5, pool.length)).map(p => p.nama_produk),
            harga: pool.slice(0, Math.min(5, pool.length)).reduce((s, p) => s + p.harga_sewa_per_hari, 0) * 1.8,
            msg: `Halo kak, saya ingin pesan *Paket 4 Orang*. Boleh info harga dan ketersediaannya?`,
            badge: 'Paling Diminati',
        },
    ];
    return paket;
}

export default function TemplateTwo({ portfolio }) {
    const { nama_usaha, bio_deskripsi, nomor_whatsapp, logo_url, banner_url, products = [] } = portfolio;
    const mainMsg  = `Halo kak, saya ingin menyewa alat camping dari *${nama_usaha}*. Boleh info lebih lanjut?`;
    const paketList = buildPaket(products, nomor_whatsapp);

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'system-ui', sans-serif" }}>

            {/* ── Header ─────────────────────────────────────────────────── */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        {logo_url
                            ? <img src={logo_url} alt="Logo" className="w-11 h-11 rounded-2xl object-cover shrink-0" />
                            : <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shrink-0">
                                {nama_usaha.charAt(0)}
                              </div>
                        }
                        <div className="min-w-0">
                            <p className="font-black text-gray-800 text-base truncate">{nama_usaha}</p>
                            <p className="text-emerald-600 text-xs font-medium">Rental Alat Camping & Outdoor</p>
                        </div>
                    </div>
                    <a href={waUrl(nomor_whatsapp, mainMsg)} target="_blank" rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-5 py-2.5 rounded-full transition shadow-md shadow-emerald-200 active:scale-95">
                        <WaIcon cls="w-4 h-4" />
                        Hubungi Kami
                    </a>
                </div>
            </header>

            {/* ── Hero Banner ─────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-emerald-900" style={{ minHeight: '320px' }}>
                {banner_url && (
                    <img src={banner_url} alt="Banner"
                        className="absolute inset-0 w-full h-full object-cover opacity-40" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/50" />
                <div className="relative max-w-5xl mx-auto px-4 py-16 flex flex-col gap-4">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full w-fit">
                        🌿 Equipment Rental Profesional
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black text-white max-w-xl leading-tight">{nama_usaha}</h1>
                    <p className="text-emerald-100 text-sm max-w-lg leading-relaxed">{bio_deskripsi}</p>
                    <a href={waUrl(nomor_whatsapp, mainMsg)} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-full w-fit transition shadow-xl active:scale-95">
                        <WaIcon />
                        Cek Ketersediaan via WhatsApp
                    </a>
                </div>
            </section>

            {/* ── Jaminan Kualitas ─────────────────────────────────────────── */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { icon: '🧼', title: 'Steril & Bersih', desc: 'Dicuci tiap selesai pakai' },
                        { icon: '🔧', title: 'Terawat',         desc: 'Dicek sebelum disewa' },
                        { icon: '🚚', title: 'Antar-Jemput',    desc: 'Tersedia di area tertentu' },
                        { icon: '💬', title: 'Fast Response',   desc: 'Balas chat dalam 1 jam' },
                    ].map(f => (
                        <div key={f.title} className="flex flex-col items-center text-center p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                            <span className="text-3xl mb-2">{f.icon}</span>
                            <p className="font-bold text-gray-800 text-sm">{f.title}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

                {/* ── Tabel Paket Sewa ────────────────────────────────────── */}
                {paketList.length > 0 && (
                    <section>
                        <h2 className="text-xl font-black text-gray-800 mb-2">Paket Sewa</h2>
                        <p className="text-gray-500 text-sm mb-6">Pilih paket yang sesuai kebutuhan trip kamu</p>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {paketList.map((paket) => (
                                <div key={paket.nama}
                                    className={`rounded-2xl border-2 p-6 relative overflow-hidden transition hover:shadow-lg ${
                                        paket.badge
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 bg-white'
                                    }`}>
                                    {paket.badge && (
                                        <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                            {paket.badge}
                                        </span>
                                    )}
                                    <h3 className="font-black text-gray-800 text-lg">{paket.nama}</h3>
                                    <p className="text-gray-500 text-xs mt-0.5 mb-4">{paket.desc}</p>
                                    {/* Item list */}
                                    <ul className="space-y-1.5 mb-5">
                                        {paket.items.map(item => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* Harga */}
                                    <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-2xl font-black text-emerald-700">{formatRp(paket.harga)}</p>
                                            <p className="text-xs text-gray-400">estimasi / hari</p>
                                        </div>
                                        <a href={waUrl(nomor_whatsapp, paket.msg)} target="_blank" rel="noopener noreferrer"
                                            className={`flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition active:scale-95 ${
                                                paket.badge
                                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                                            }`}>
                                            <WaIcon cls="w-4 h-4" />
                                            Pesan
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Katalog Satuan ──────────────────────────────────────── */}
                {products.length > 0 && (
                    <section>
                        <h2 className="text-xl font-black text-gray-800 mb-2">Sewa Satuan</h2>
                        <p className="text-gray-500 text-sm mb-6">Butuh alat tertentu saja? Sewa per item, harga per hari</p>
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <th className="px-5 py-3">Nama Alat</th>
                                        <th className="px-5 py-3">Kategori</th>
                                        <th className="px-5 py-3 text-right">Harga / Hari</th>
                                        <th className="px-5 py-3 text-center">Stok</th>
                                        <th className="px-5 py-3 text-center">Pesan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50 transition">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    {p.gambar_url
                                                        ? <img src={p.gambar_url} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-gray-100" />
                                                        : <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0">
                                                            {p.nama_produk.charAt(0)}
                                                          </div>
                                                    }
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{p.nama_produk}</p>
                                                        {p.is_featured && <span className="text-[10px] text-emerald-600 font-bold">★ Populer</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500 capitalize text-xs">
                                                {p.kategori.replace(/_/g, ' ').toLowerCase()}
                                            </td>
                                            <td className="px-5 py-3.5 text-right font-bold text-emerald-700">
                                                {formatRp(p.harga_sewa_per_hari)}
                                            </td>
                                            <td className="px-5 py-3.5 text-center">
                                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                    p.stok_tersedia > 0
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {p.stok_tersedia > 0 ? `${p.stok_tersedia} unit` : 'Habis'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-center">
                                                {p.stok_tersedia > 0
                                                    ? <a href={waUrl(nomor_whatsapp, `Halo kak, saya ingin menyewa *${p.nama_produk}*. Apakah tersedia?`)}
                                                        target="_blank" rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">
                                                        <WaIcon cls="w-3.5 h-3.5" /> Sewa
                                                      </a>
                                                    : <span className="text-xs text-gray-400">—</span>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {products.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-5xl mb-3">🏕️</p>
                        <p className="text-sm">Katalog alat sewa akan segera ditampilkan.</p>
                    </div>
                )}
            </div>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <footer className="bg-gray-900 text-white py-10 mt-8">
                <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        {logo_url
                            ? <img src={logo_url} alt="" className="w-10 h-10 rounded-xl object-cover" />
                            : <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center">{nama_usaha.charAt(0)}</div>
                        }
                        <div>
                            <p className="font-bold text-sm">{nama_usaha}</p>
                            <p className="text-gray-400 text-xs">© {new Date().getFullYear()}</p>
                        </div>
                    </div>
                    <a href={waUrl(nomor_whatsapp, mainMsg)} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-full transition">
                        <WaIcon cls="w-4 h-4" />
                        WhatsApp: {nomor_whatsapp}
                    </a>
                </div>
            </footer>

            {/* ── Floating WA bubble kanan bawah ──────────────────────────── */}
            <a href={waUrl(nomor_whatsapp, mainMsg)} target="_blank" rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-900/40 transition active:scale-90"
                title="Chat WhatsApp">
                <WaIcon cls="w-7 h-7 text-white" />
            </a>
        </div>
    );
}
