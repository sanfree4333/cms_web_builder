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

            {/* Background utama cerah menyamakan dashboard */}
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 font-sans selection:bg-teal-200 selection:text-teal-900">
                
                {/* Container Card */}
                <div className="w-full max-w-4xl bg-white shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-gray-200">

                    {/* Left: Illustration / branding (Sama seperti warna Header atas Dashboard) */}
                    <div className="hidden lg:flex flex-col justify-center items-start p-12 bg-gray-900 text-white gap-6 relative overflow-hidden">
                        {/* Efek cahaya dekoratif */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-950/50 to-transparent"></div>

                        <div className="relative z-10 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                                {/* Menggunakan ikon building yang sama dengan dashboard */}
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">WebBuilder.</h3>
                        </div>

                        <h2 className="relative z-10 text-3xl font-extrabold leading-tight mt-4">
                            Kelola website UMKM <br /> lebih cepat & efisien.
                        </h2>
                        <p className="relative z-10 text-sm text-gray-400 max-w-xs leading-relaxed">
                            Satu tempat terpusat untuk menampilkan portofolio, mengelola produk, dan terhubung langsung ke pelanggan Anda.
                        </p>

                        <div className="relative z-10 mt-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-teal-400 font-bold text-sm">✓</span>
                                <span className="text-sm font-medium text-gray-300">Template yang responsif</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 text-teal-400 font-bold text-sm">⚡</span>
                                <span className="text-sm font-medium text-gray-300">Publikasi instan (Auto-Deploy)</span>
                            </div>
                        </div>

                        <p className="relative z-10 mt-auto text-xs text-gray-500 font-medium">
                            © {new Date().getFullYear()} CMS Web Builder System
                        </p>
                    </div>

                    {/* Right: Form (Light Mode) */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="w-full lg:max-w-md mx-auto">
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Masuk ke Panel</h1>
                            <p className="text-sm text-gray-500 mt-2 font-medium">Masukkan kredensial admin untuk melanjutkan.</p>

                            {errors.username && !errors.password && (
                                <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2">
                                    <span className="w-5 h-5 flex items-center justify-center bg-red-100 rounded-full font-bold text-xs">!</span>
                                    {errors.username}
                                </div>
                            )}

                            <form onSubmit={submit} className="mt-8 space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Username</label>
                                    <input
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="admin"
                                        autoComplete="username"
                                        autoFocus
                                        className={`w-full px-4 py-3.5 rounded-xl text-sm bg-white border transition-shadow ${errors.username ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'} text-gray-900 placeholder-gray-400 focus:outline-none`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            className={`w-full px-4 py-3.5 rounded-xl text-sm bg-white border transition-shadow ${errors.password ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'} text-gray-900 placeholder-gray-400 focus:outline-none pr-24`}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)} 
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-teal-600 transition-colors"
                                        >
                                            {showPassword ? 'TUTUP' : 'LIHAT'}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.password}</p>}
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <label className="inline-flex items-center text-sm text-gray-600 font-medium cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={data.remember} 
                                            onChange={() => setData('remember', !data.remember)} 
                                            className="mr-2.5 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                                        />
                                        Ingat sesi saya
                                    </label>
                                    <a href="#" className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">Lupa sandi?</a>
                                </div>

                                <button type="submit" disabled={processing} 
                                    className="w-full mt-2 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl disabled:opacity-70 text-sm transition-all shadow-sm active:scale-[0.98]">
                                    {processing ? 'Memverifikasi Data...' : 'Masuk ke Dashboard'}
                                </button>
                            </form>

                            <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-500 text-center">
                                Akses Default — Username: <span className="font-bold text-gray-800 bg-gray-200 px-1.5 py-0.5 rounded">admin</span> · Password: <span className="font-bold text-gray-800 bg-gray-200 px-1.5 py-0.5 rounded">admin123</span>
                            </div>

                            {/* Untuk tampilan mobile, tampilkan copyright di bawah form */}
                            <p className="lg:hidden text-center text-xs font-medium text-gray-400 mt-8">
                                © {new Date().getFullYear()} CMS Web Builder UMKM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}