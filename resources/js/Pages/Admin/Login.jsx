import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login.post'));
    };

    return (
        <>
            <Head title="Login Admin — CMS Web Builder" />

            <div className="min-h-screen flex">

                {/* ── Panel Kiri: Branding / Ilustrasi ─────────────────── */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 flex-col justify-between p-12 relative overflow-hidden">

                    {/* Dekorasi lingkaran background */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-teal-600/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-teal-700/5 blur-2xl" />

                    {/* Logo */}
                    <div className="relative flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-900/50">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">CMS Web Builder</span>
                    </div>

                    {/* Konten tengah */}
                    <div className="relative space-y-6">
                        <div className="inline-flex items-center gap-2 bg-teal-600/20 border border-teal-500/30 text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                            🏕️ Platform UMKM Digital
                        </div>
                        <h2 className="text-4xl font-black text-white leading-tight">
                            Kelola Website<br />
                            UMKM Anda<br />
                            <span className="text-teal-400">dalam Satu Panel.</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Buat, kelola, dan terbitkan website portofolio UMKM secara profesional.
                            Tampilan modern, langsung terhubung ke WhatsApp pelanggan.
                        </p>

                        {/* Feature list */}
                        <div className="space-y-3 pt-2">
                            {[
                                { icon: '✓', text: 'Terbitkan website dalam hitungan menit' },
                                { icon: '✓', text: '3 pilihan template profesional' },
                                { icon: '✓', text: 'Terhubung langsung ke WhatsApp' },
                                { icon: '✓', text: 'Kelola katalog produk & harga sewa' },
                            ].map((f) => (
                                <div key={f.text} className="flex items-center gap-3 text-sm text-gray-300">
                                    <span className="w-5 h-5 rounded-full bg-teal-600/30 text-teal-400 text-xs font-bold flex items-center justify-center shrink-0">
                                        {f.icon}
                                    </span>
                                    {f.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer branding */}
                    <p className="relative text-gray-600 text-xs">
                        © {new Date().getFullYear()} CMS Web Builder UMKM · All rights reserved
                    </p>
                </div>

                {/* ── Panel Kanan: Form Login ────────────────────────────── */}
                <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
                    <div className="w-full max-w-sm">

                        {/* Mobile logo */}
                        <div className="lg:hidden flex items-center gap-3 justify-center mb-10">
                            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-md">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <span className="font-bold text-gray-800 text-lg">CMS Web Builder</span>
                        </div>

                        {/* Heading */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-black text-gray-800">Selamat Datang</h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Masuk ke Panel Admin untuk mengelola website UMKM.
                            </p>
                        </div>

                        {/* Error global */}
                        {(errors.username && !errors.password) && (
                            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.username}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-5">

                            {/* Username */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                                    Username
                                </label>
                                <div className={`flex items-center border rounded-xl bg-white overflow-hidden transition ${
                                    errors.username ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20'
                                }`}>
                                    <div className="px-3.5 py-3 text-gray-400 border-r border-gray-100">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        className="flex-1 px-3.5 py-3 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
                                        placeholder="Masukkan username"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                                    Password
                                </label>
                                <div className={`flex items-center border rounded-xl bg-white overflow-hidden transition ${
                                    errors.password ? 'border-red-400 ring-1 ring-red-300' : 'border-gray-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20'
                                }`}>
                                    <div className="px-3.5 py-3 text-gray-400 border-r border-gray-100">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="flex-1 px-3.5 py-3 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
                                        placeholder="Masukkan password"
                                        autoComplete="current-password"
                                    />
                                    {/* Toggle show/hide password */}
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="px-3.5 text-gray-400 hover:text-gray-600 transition">
                                        {showPassword
                                            ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                              </svg>
                                            : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                              </svg>
                                        }
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center gap-2.5">
                                <button type="button" onClick={() => setData('remember', !data.remember)}
                                    className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${data.remember ? 'bg-teal-600' : 'bg-gray-200'}`}>
                                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${data.remember ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                </button>
                                <label className="text-sm text-gray-500 cursor-pointer select-none"
                                    onClick={() => setData('remember', !data.remember)}>
                                    Ingat saya di perangkat ini
                                </label>
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition shadow-md shadow-teal-200 active:scale-[.98] text-sm">
                                {processing
                                    ? <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Memproses...
                                      </>
                                    : <>
                                        Masuk ke Panel Admin
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                      </>
                                }
                            </button>
                        </form>

                        {/* Hint kredensial */}
                        <div className="mt-6 p-4 bg-gray-100 rounded-xl border border-gray-200">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Kredensial Default</p>
                            <div className="space-y-1 text-xs text-gray-600 font-mono">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Username</span>
                                    <span className="font-bold text-gray-700">admin</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Password</span>
                                    <span className="font-bold text-gray-700">admin123</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-gray-400 text-xs mt-6">
                            © {new Date().getFullYear()} CMS Web Builder UMKM
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
