import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

// ─── SVG Icon helper ──────────────────────────────────────────────────────────
function SvgIcon({ d, cls = 'w-5 h-5' }) {
    return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
        </svg>
    );
}

const D = {
    home:     'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    portfolio:'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    clients:  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    logout:   'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
    edit:     'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    trash:    'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    link:     'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
    upload:   'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
    check:    'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
};

// ─── Navbar Atas (Menggantikan Sidebar) ───────────────────────────────────────
function TopNavbar({ active, setActive, adminName }) {
    const nav = [
        { id: 'dashboard', label: 'Overview',        icon: D.home },
        { id: 'portfolio', label: 'Kelola UMKM',     icon: D.portfolio },
        { id: 'clients',   label: 'Database Klien',  icon: D.clients },
        { id: 'settings',  label: 'Pengaturan',      icon: D.settings },
    ];
    return (
        <nav className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Kiri: Logo & Menu */}
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                                <SvgIcon cls="w-4 h-4 text-white" d={D.building} />
                            </div>
                            <span className="text-white font-bold text-lg tracking-tight">WebBuilder.</span>
                        </div>
                        <div className="hidden md:flex items-center gap-1">
                            {nav.map(item => (
                                <button key={item.id} onClick={() => setActive(item.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        active === item.id
                                            ? 'bg-gray-800 text-teal-400'
                                            : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                    }`}>
                                    <SvgIcon cls="w-4 h-4" d={item.icon} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Kanan: Profil & Logout */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-sm text-gray-400 font-medium">Halo, {adminName}</span>
                            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center font-bold text-sm">
                                {adminName?.charAt(0)?.toUpperCase()}
                            </div>
                        </div>
                        <div className="h-6 w-px bg-gray-700 hidden md:block"></div>
                        <button onClick={() => router.post(route('admin.logout'))}
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors">
                            <SvgIcon cls="w-4 h-4" d={D.logout} />
                            Keluar
                        </button>
                    </div>
                </div>
                {/* Mobile Menu (Scrollable horizontal) */}
                <div className="md:hidden flex items-center gap-2 overflow-x-auto py-3 border-t border-gray-800 scrollbar-hide">
                    {nav.map(item => (
                        <button key={item.id} onClick={() => setActive(item.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                                active === item.id ? 'bg-gray-800 text-teal-400' : 'text-gray-400'
                            }`}>
                            <SvgIcon cls="w-3.5 h-3.5" d={item.icon} />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}

// ─── Stat Card (Desain Clean/Minimalist) ──────────────────────────────────────
function StatCard({ label, value, sub, color }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold ${color}`}>{value}</p>
                {sub && <p className="text-xs text-gray-400 font-medium">{sub}</p>}
            </div>
        </div>
    );
}

// ─── Upload Field ─────────────────────────────────────────────────────────────
function UploadField({ label, accept, onChange, preview, error }) {
    return (
        <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">{label}</p>
            <label className="relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition border-gray-300 hover:border-teal-500 hover:bg-teal-50/30 overflow-hidden bg-gray-50">
                {preview && <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                <div className={`relative flex flex-col items-center gap-1 ${preview ? 'opacity-0 hover:opacity-100 bg-black/50 w-full h-full justify-center text-white' : 'text-gray-400'}`}>
                    <SvgIcon cls="w-5 h-5" d={D.upload} />
                    <span className="text-[11px] font-medium">{preview ? 'Ganti' : 'Pilih File'}</span>
                </div>
                <input type="file" className="hidden" accept={accept} onChange={onChange} />
            </label>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

// ─── Portfolio Form ───────────────────────────────────────────────────────────
function PortfolioForm({ editData, onClose, onSuccess }) {
    const isEdit = !!editData;
    const [logoPreview,   setLogoPreview]   = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama_usaha:      '',
        bio_deskripsi:   '',
        nomor_whatsapp:  '',
        layout_template: 'layout_1',
        logo:   null,
        banner: null,
    });

    useEffect(() => {
        if (editData) {
            setData({
                nama_usaha:      editData.nama_usaha      ?? '',
                bio_deskripsi:   editData.bio_deskripsi   ?? '',
                nomor_whatsapp:  editData.nomor_whatsapp  ?? '',
                layout_template: editData.layout_template ?? 'layout_1',
                logo: null, banner: null,
            });
            setLogoPreview(editData.logo_url ?? null);
            setBannerPreview(editData.banner_url ?? null);
        } else {
            reset();
            setLogoPreview(null);
            setBannerPreview(null);
        }
    }, [editData]);

    const handleFile = (field, setPreview) => (e) => {
        const file = e.target.files[0] ?? null;
        setData(field, file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        const opts = {
            forceFormData: true,
            onSuccess: () => { reset(); onSuccess?.(); },
            preserveScroll: true,
        };
        if (isEdit) {
            router.post(route('admin.portfolios.update', editData.id), { ...data, _method: 'PUT' }, opts);
        } else {
            post(route('admin.portfolios.store'), opts);
        }
    };

    const slugPreview = data.nama_usaha
        ? data.nama_usaha.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        : '';

    const inp = (err) =>
        `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-shadow bg-white ${err ? 'border-red-400' : 'border-gray-300'}`;

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Usaha *</label>
                <input type="text" value={data.nama_usaha} onChange={e => setData('nama_usaha', e.target.value)}
                    className={inp(errors.nama_usaha)} placeholder="Nama UMKM..." autoComplete="off" />
                {errors.nama_usaha && <p className="mt-1 text-xs text-red-500">{errors.nama_usaha}</p>}
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Slug Akses</label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                    <span className="px-3 py-2 text-xs text-gray-500 border-r border-gray-300 bg-gray-100">domain.com/</span>
                    <input readOnly value={slugPreview} placeholder="slug-otomatis"
                        className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-gray-600 font-mono" />
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Bio / Deskripsi *</label>
                <textarea value={data.bio_deskripsi} onChange={e => setData('bio_deskripsi', e.target.value)}
                    rows={3} className={inp(errors.bio_deskripsi)} placeholder="Tuliskan deskripsi singkat usaha..." />
                {errors.bio_deskripsi && <p className="mt-1 text-xs text-red-500">{errors.bio_deskripsi}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <UploadField label="Logo" accept="image/*" preview={logoPreview} onChange={handleFile('logo', setLogoPreview)} error={errors.logo} />
                <UploadField label="Banner" accept="image/*" preview={bannerPreview} onChange={handleFile('banner', setBannerPreview)} error={errors.banner} />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nomor WA *</label>
                <input type="text" value={data.nomor_whatsapp} onChange={e => setData('nomor_whatsapp', e.target.value)}
                    className={inp(errors.nomor_whatsapp)} placeholder="628..." />
                {errors.nomor_whatsapp && <p className="mt-1 text-xs text-red-500">{errors.nomor_whatsapp}</p>}
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Pilih Template</label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { val: 'layout_1', label: 'Tipe 1' },
                        { val: 'layout_2', label: 'Tipe 2' },
                        { val: 'layout_3', label: 'Tipe 3' },
                    ].map(t => (
                        <button key={t.val} type="button" onClick={() => setData('layout_template', t.val)}
                            className={`py-2 rounded-lg border text-center text-xs font-medium transition-all ${
                                data.layout_template === t.val
                                    ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-500'
                                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                            }`}>
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100 my-4" />

            <div className="flex flex-col gap-2">
                <button type="submit" disabled={processing}
                    className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors text-sm">
                    {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Terbitkan Portofolio'}
                </button>
                {isEdit && (
                    <button type="button" onClick={onClose}
                        className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm transition-colors">
                        Batal
                    </button>
                )}
            </div>
        </form>
    );
}

// ─── Tombol Aksi tabel ────────────────────────────────────────────────────────
function BtnEdit({ onClick }) {
    return <button onClick={onClick} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit"><SvgIcon cls="w-4 h-4" d={D.edit} /></button>;
}
function BtnDelete({ onClick }) {
    return <button onClick={onClick} className="text-gray-400 hover:text-red-600 transition-colors" title="Hapus"><SvgIcon cls="w-4 h-4" d={D.trash} /></button>;
}

// ─── Tab: Dashboard (Layout Master-Detail) ───────────────────────────────────
function TabDashboard({ stats, portfolios, recentLogs, editTarget, setEditTarget }) {
    const handleDelete = (id, nama) => {
        if (confirm(`Hapus permanen website UMKM "${nama}" beserta produknya?`))
            router.delete(route('admin.portfolios.destroy', id));
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            
            {/* Kolom Kiri: Stats & Tabel List (Lebih Lebar) */}
            <div className="xl:col-span-2 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard label="Total UMKM Terdaftar" value={stats?.total_umkm ?? 0} color="text-gray-900" />
                    <StatCard label="Status Ter-Publish" value={stats?.total_published ?? 0} color="text-teal-600" />
                </div>

                {/* Main Table Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-800 text-sm">Daftar Portofolio Cepat</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
                                    <th className="px-5 py-3">UMKM</th>
                                    <th className="px-5 py-3">Akses Tautan</th>
                                    <th className="px-5 py-3 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {(!portfolios?.data || portfolios.data.length === 0) && (
                                    <tr><td colSpan={3} className="px-5 py-10 text-center text-gray-400 text-sm">Data masih kosong.</td></tr>
                                )}
                                {portfolios?.data?.map(p => (
                                    <tr key={p.id} className={`hover:bg-gray-50/50 transition-colors ${editTarget?.id === p.id ? 'bg-teal-50/30' : ''}`}>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                {p.logo_url
                                                    ? <img src={p.logo_url} alt="" className="w-8 h-8 rounded bg-gray-100 object-cover border border-gray-200" />
                                                    : <div className="w-8 h-8 rounded bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs border border-gray-200">{p.nama_usaha.charAt(0)}</div>
                                                }
                                                <span className="font-medium text-gray-800">{p.nama_usaha}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <a href={`http://localhost:8000/${p.slug}`} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-gray-500 hover:text-teal-600 text-xs font-mono">
                                                <SvgIcon cls="w-3.5 h-3.5" d={D.link} />
                                                /{p.slug}
                                            </a>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-3">
                                                <BtnEdit onClick={() => setEditTarget(p)} />
                                                <BtnDelete onClick={() => handleDelete(p.id, p.nama_usaha)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Simple */}
                    {portfolios?.links && (
                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-1">
                            {portfolios.links.map((link, i) => (
                                <button key={i} disabled={!link.url} onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-2.5 py-1 rounded text-xs font-medium ${link.active ? 'bg-gray-900 text-white' : link.url ? 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100' : 'text-gray-400 hidden'}`} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Activity Logs Bawah */}
                {recentLogs?.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800 text-sm">Riwayat Aktivitas</h2>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {recentLogs.map(log => (
                                <li key={log.id} className="px-5 py-3 flex items-center justify-between gap-4 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-gray-800 font-medium">{log.admin_nama} <span className="text-gray-500 font-normal">{log.keterangan_perubahan}</span></span>
                                        <span className="text-xs text-gray-400">{log.created_at}</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{log.aksi}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Kolom Kanan: Form (Sticky Widget) */}
            <div className="xl:col-span-1">
                <div className="sticky top-6 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-200 overflow-hidden">
                    <div className={`px-5 py-4 border-b flex items-center gap-2 ${editTarget ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50/50 border-gray-100'}`}>
                        <div className={`w-2 h-2 rounded-full ${editTarget ? 'bg-blue-500' : 'bg-teal-500'}`}></div>
                        <h2 className="font-semibold text-gray-800 text-sm">
                            {editTarget ? 'Edit Portofolio UMKM' : 'Buat Portofolio Baru'}
                        </h2>
                    </div>
                    <div className="p-5">
                        <PortfolioForm editData={editTarget} onClose={() => setEditTarget(null)} onSuccess={() => setEditTarget(null)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Tab: Portofolio Lengkap ────────────────────────────────────────────────
function TabPortfolio({ portfolios, setEditTarget, setActive }) {
    const handleDelete = (id, nama) => {
        if (confirm(`Hapus permanen website UMKM "${nama}" beserta produknya?`))
            router.delete(route('admin.portfolios.destroy', id));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-semibold text-gray-800">Manajemen Website UMKM</h2>
                <button onClick={() => setActive('dashboard')} className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    + Tambah UMKM
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-white text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
                            <th className="px-6 py-4">Informasi Bisnis</th>
                            <th className="px-6 py-4">URL Spesifik</th>
                            <th className="px-6 py-4">Tipe Layout</th>
                            <th className="px-6 py-4">Produk</th>
                            <th className="px-6 py-4 text-right">Tindakan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {portfolios?.data?.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {p.logo_url
                                            ? <img src={p.logo_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                                            : <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-sm border border-gray-200">{p.nama_usaha.charAt(0)}</div>
                                        }
                                        <div>
                                            <p className="font-semibold text-gray-800">{p.nama_usaha}</p>
                                            <p className="text-xs text-gray-500">Dibuat: {p.created_at}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={`http://localhost:8000/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-mono text-xs">
                                        /{p.slug}
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{p.layout_template}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{p.products_count} Item</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-3">
                                        <BtnEdit onClick={() => { setEditTarget(p); setActive('dashboard'); }} />
                                        <BtnDelete onClick={() => handleDelete(p.id, p.nama_usaha)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Tab: Klien ───────────────────────────────────────────────────────────────
function TabClients({ portfolios }) {
    const waMsg = (nama) => `Halo kak ${nama}, saya dari tim CMS Web Builder. Ada yang bisa kami bantu?`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-semibold text-gray-800">Direktori Kontak Klien</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-white text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
                            <th className="px-6 py-4">Pemilik Usaha</th>
                            <th className="px-6 py-4">Nomor WhatsApp</th>
                            <th className="px-6 py-4 text-right">Quick Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {portfolios?.data?.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-medium text-gray-800">{p.nama_usaha}</td>
                                <td className="px-6 py-4 font-mono text-gray-600">{p.nomor_whatsapp}</td>
                                <td className="px-6 py-4 text-right">
                                    <a href={`https://wa.me/${p.nomor_whatsapp}?text=${encodeURIComponent(waMsg(p.nama_usaha))}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition-colors">
                                        Kirim Pesan WA
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Tab: Pengaturan ──────────────────────────────────────────────────────────
function TabSettings({ adminName }) {
    return (
        <div className="max-w-3xl space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center text-3xl font-bold text-gray-400 shrink-0">
                    {adminName?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 space-y-4 w-full">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{adminName}</h3>
                        <p className="text-sm text-gray-500">System Administrator</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Status Sesi</p>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Aktif
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Versi Sistem</p>
                            <p className="text-sm font-medium text-gray-800">CMS Builder v3.0 (Stacked)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <h4 className="text-sm font-bold text-blue-900 mb-2">Panduan Ganti Password</h4>
                <p className="text-sm text-blue-800/80 leading-relaxed">
                    Akses terminal server/hosting Anda dan jalankan Tinker:<br />
                    <code className="block mt-2 bg-white px-3 py-2 rounded border border-blue-200 text-blue-900 font-mono text-xs overflow-x-auto">
                        {'App\\Models\\Admin::where(\'username\',\'admin\')->update([\'password\'=> bcrypt(\'password_baru\')]);'}
                    </code>
                </p>
            </div>
        </div>
    );
}

// ─── Main Export (The Stacked Layout Wrapper) ─────────────────────────────────
export default function Dashboard({ stats, recentLogs = [], portfolios, adminName, flash }) {
    const [active,      setActive]      = useState('dashboard');
    const [editTarget,  setEditTarget]  = useState(null);

    const pageTitle = {
        dashboard: 'Dashboard Overview',
        portfolio: 'Kelola Portofolio UMKM',
        clients:   'Database Kontak Klien',
        settings:  'Pengaturan Sistem',
    };

    return (
        <>
            <Head title="Admin Dashboard — Stacked UI" />
            <div className="min-h-screen bg-gray-50 font-sans text-gray-800 selection:bg-teal-200 selection:text-teal-900">
                
                {/* Navbar di Atas, BUKAN di Samping */}
                <TopNavbar active={active} setActive={setActive} adminName={adminName} />

                {/* Overlapping Header (Background gelap di atas, menjorok ke bawah) */}
                <div className="bg-gray-900 pb-32">
                    <header className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">{pageTitle[active]}</h1>
                    </header>
                </div>

                {/* Main Content Area (Ditarik ke atas agar menimpa header) */}
                <main className="-mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    
                    {/* Flash messages */}
                    {flash?.success && (
                        <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-xl text-sm font-medium shadow-sm">
                            <SvgIcon cls="w-5 h-5 text-green-600" d={D.check} />
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 px-5 py-4 rounded-xl text-sm font-medium shadow-sm">
                            <span className="w-5 h-5 flex items-center justify-center font-bold">✕</span>
                            {flash.error}
                        </div>
                    )}

                    {/* Rendering Tab Konten */}
                    <div className="transition-all duration-300">
                        {active === 'dashboard' && (
                            <TabDashboard stats={stats} portfolios={portfolios} recentLogs={recentLogs} editTarget={editTarget} setEditTarget={setEditTarget} />
                        )}
                        {active === 'portfolio' && (
                            <TabPortfolio portfolios={portfolios} setEditTarget={setEditTarget} setActive={setActive} />
                        )}
                        {active === 'clients' && (
                            <TabClients portfolios={portfolios} />
                        )}
                        {active === 'settings' && (
                            <TabSettings adminName={adminName} />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}