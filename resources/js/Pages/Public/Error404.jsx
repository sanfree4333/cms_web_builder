import { Head, Link } from '@inertiajs/react';

export default function Error404({ slug }) {
    return (
        <>
            <Head title="Halaman Tidak Ditemukan" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center px-4">
                <div className="text-center max-w-lg">
                    {/* Ilustrasi angka 404 */}
                    <div className="relative mb-8 select-none">
                        <p className="text-[10rem] font-black text-white/5 leading-none tracking-tighter">
                            404
                        </p>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Pesan utama */}
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="text-slate-400 mb-2">
                        Maaf, halaman yang kamu cari tidak tersedia atau belum dipublikasikan.
                    </p>
                    {slug && (
                        <p className="text-slate-600 text-sm mb-8">
                            Slug yang dicari:{' '}
                            <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-slate-400">
                                /{slug}
                            </span>
                        </p>
                    )}

                    {/* Kemungkinan penyebab */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left mb-8 space-y-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            Kemungkinan penyebab:
                        </p>
                        {[
                            'URL yang dimasukkan salah atau sudah berubah',
                            'Halaman ini masih berstatus Draft',
                            'Usaha ini sudah tidak aktif',
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-indigo-400 mt-0.5">›</span>
                                <span className="text-sm text-slate-400">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-2.5 border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/5 transition"
                        >
                            ← Kembali
                        </button>
                        <a
                            href="/"
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition"
                        >
                            Ke Beranda
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
