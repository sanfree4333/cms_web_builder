import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

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
    wa:       'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51',
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }) {
    const nav = [
        { id: 'dashboard', label: 'Dashboard',       icon: D.home },
        { id: 'portfolio', label: 'Portofolio UMKM', icon: D.portfolio },
        { id: 'clients',   label: 'Daftar Klien',    icon: D.clients },
        { id: 'settings',  label: 'Pengaturan',      icon: D.settings },
    ];
    return (
        <aside className="w-64 min-h-screen bg-gray-900 flex flex-col shrink-0">
            {/* Brand */}
            <div className="px-5 py-5 border-b border-gray-700/60">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
                        <SvgIcon cls="w-5 h-5 text-white" d={D.building} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm leading-tight">CMS Web Builder</p>
                        <p className="text-gray-400 text-xs">Panel Admin UMKM</p>
                    </div>
                </div>
            </div>
            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                {nav.map(item => (
                    <button key={item.id} onClick={() => setActive(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            active === item.id
                                ? 'bg-teal-600 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}>
                        <SvgIcon cls="w-4 h-4 shrink-0" d={item.icon} />
                        {item.label}
                    </button>
                ))}
            </nav>
            {/* Logout */}
            <div className="px-4 py-4 border-t border-gray-700/60">
                <button onClick={() => router.post(route('admin.logout'))}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-400 text-sm transition-colors">
                    <SvgIcon cls="w-4 h-4" d={D.logout} />
                    Keluar
                </button>
            </div>
        </aside>
    );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                <SvgIcon cls="w-7 h-7 text-white" d={icon} />
            </div>
            <div>
                <p className="text-3xl font-extrabold text-gray-800 leading-none">{value}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{label}</p>
                {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}

// ─── Upload Field ─────────────────────────────────────────────────────────────
function UploadField({ label, accept, onChange, preview, error }) {
    return (
        <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            <label className="relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition border-gray-200 hover:border-teal-400 hover:bg-teal-50 overflow-hidden">
                {preview && <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />}
                <div className="relative flex flex-col items-center gap-1 text-gray-400">
                    <SvgIcon cls="w-6 h-6" d={D.upload} />
                    <span className="text-xs">{preview ? 'Ganti gambar' : 'Klik untuk upload'}</span>
                </div>
                <input type="file" className="hidden" accept={accept} onChange={onChange} />
            </label>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

// ─── Portfolio Form (status selalu PUBLISHED, tidak ada toggle Draft) ─────────
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            // Inertia method spoofing: kirim POST tapi dengan _method=PUT
            // agar Laravel routing mengizinkan dan forceFormData tetap aktif
            router.post(
                route('admin.portfolios.update', editData.id),
                { ...data, _method: 'PUT' },
                opts
            );
        } else {
            post(route('admin.portfolios.store'), opts);
        }
    };

    const slugPreview = data.nama_usaha
        ? data.nama_usaha.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        : '';

    const inp = (err) =>
        `w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${err ? 'border-red-400 bg-red-50' : 'border-gray-200'}`;

    return (
        <form onSubmit={submit} className="space-y-4">
            {/* Nama Usaha */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nama Usaha *</label>
                <input type="text" value={data.nama_usaha}
                    onChange={e => setData('nama_usaha', e.target.value)}
                    className={inp(errors.nama_usaha)}
                    placeholder="Contoh: CampEase - Sewa Alat Camping"
                    autoComplete="off" />
                {errors.nama_usaha && <p className="mt-1 text-xs text-red-500">{errors.nama_usaha}</p>}
            </div>

            {/* Slug URL */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Slug URL</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-teal-500">
                    <span className="px-3 py-2.5 text-xs text-gray-400 border-r border-gray-200 shrink-0 select-none">domain.com/</span>
                    <input readOnly value={slugPreview} placeholder="campease"
                        className="flex-1 px-3 py-2.5 text-sm bg-gray-50 text-gray-500 outline-none" />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                    Otomatis · Contoh: <span className="font-mono text-teal-600">campease</span>
                </p>
            </div>

            {/* Bio */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bio / Deskripsi *</label>
                <textarea value={data.bio_deskripsi}
                    onChange={e => setData('bio_deskripsi', e.target.value)}
                    rows={3} className={inp(errors.bio_deskripsi)}
                    placeholder="Penyedia jasa sewa peralatan camping & outdoor steril, terawat, dan siap pakai." />
                {errors.bio_deskripsi && <p className="mt-1 text-xs text-red-500">{errors.bio_deskripsi}</p>}
            </div>

            {/* Upload */}
            <div className="grid grid-cols-2 gap-3">
                <UploadField label="Logo UMKM" accept="image/*" preview={logoPreview}
                    onChange={handleFile('logo', setLogoPreview)} error={errors.logo} />
                <UploadField label="Foto Banner" accept="image/*" preview={bannerPreview}
                    onChange={handleFile('banner', setBannerPreview)} error={errors.banner} />
            </div>

            {/* WhatsApp */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Nomor WhatsApp *</label>
                <input type="text" value={data.nomor_whatsapp}
                    onChange={e => setData('nomor_whatsapp', e.target.value)}
                    className={inp(errors.nomor_whatsapp)}
                    placeholder="6281234567890" />
                {errors.nomor_whatsapp && <p className="mt-1 text-xs text-red-500">{errors.nomor_whatsapp}</p>}
            </div>

            {/* Template */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pilihan Template</label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { val: 'layout_1', label: 'Template 1', sub: 'Outdoor Adventure' },
                        { val: 'layout_2', label: 'Template 2', sub: 'Equipment Rental' },
                        { val: 'layout_3', label: 'Template 3', sub: 'Clean Minimalist' },
                    ].map(t => (
                        <button key={t.val} type="button" onClick={() => setData('layout_template', t.val)}
                            className={`p-2.5 rounded-xl border-2 text-center text-xs font-medium transition ${
                                data.layout_template === t.val
                                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                                    : 'border-gray-200 text-gray-500 hover:border-teal-300'
                            }`}>
                            <p className="font-bold">{t.label}</p>
                            <p className="opacity-60 text-[10px] mt-0.5">{t.sub}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Info: selalu published */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
                <SvgIcon cls="w-4 h-4 text-emerald-600 shrink-0" d={D.check} />
                <p className="text-xs text-emerald-700 font-medium">
                    Website akan langsung <strong>Published</strong> dan bisa diakses publik via URL.
                </p>
            </div>

            {/* Submit */}
            <button type="submit" disabled={processing}
                className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl transition text-sm shadow-sm">
                {processing ? 'Menyimpan...' : isEdit ? '💾 Simpan Perubahan' : '🚀 Terbitkan Website Portofolio'}
            </button>
            {isEdit && (
                <button type="button" onClick={onClose}
                    className="w-full py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl text-sm transition">
                    Batal / Tambah Baru
                </button>
            )}
        </form>
    );
}

// ─── Tombol Aksi tabel ────────────────────────────────────────────────────────
function BtnEdit({ onClick }) {
    return (
        <button onClick={onClick}
            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Edit">
            <SvgIcon cls="w-3.5 h-3.5" d={D.edit} />
        </button>
    );
}
function BtnDelete({ onClick }) {
    return (
        <button onClick={onClick}
            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition" title="Hapus">
            <SvgIcon cls="w-3.5 h-3.5" d={D.trash} />
        </button>
    );
}

// ─── Tab: Dashboard (Split View) ─────────────────────────────────────────────
function TabDashboard({ stats, portfolios, recentLogs, editTarget, setEditTarget }) {
    const handleDelete = (id, nama) => {
        if (confirm(`Apakah Anda yakin ingin menghapus website UMKM "${nama}"?\n\nSemua data produk terkait juga akan dihapus permanen.`))
            router.delete(route('admin.portfolios.destroy', id));
    };

    return (
        <div className="space-y-6">
            {/* Stat Cards — hanya 2, tanpa Draft */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <StatCard label="Total UMKM" value={stats?.total_umkm ?? 0}
                    sub="Semua website terdaftar" color="bg-teal-600" icon={D.building} />
                <StatCard label="Website Aktif" value={stats?.total_published ?? 0}
                    sub="Sudah Published & bisa diakses" color="bg-emerald-500" icon={D.check} />
            </div>

            {/* Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Form Kiri */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                        {editTarget
                            ? <><span className="text-teal-600">✎</span> Edit Portfolio UMKM</>
                            : <><span className="text-teal-600">＋</span> Buat Portofolio UMKM Baru</>
                        }
                    </h2>
                    <PortfolioForm editData={editTarget}
                        onClose={() => setEditTarget(null)}
                        onSuccess={() => setEditTarget(null)} />
                </div>

                {/* Tabel Ringkasan Kanan */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-gray-800">List Portofolio UMKM</h2>
                        <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2.5 py-1 rounded-full">
                            {portfolios?.total ?? 0} website
                        </span>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                    <th className="px-5 py-3">Nama UMKM</th>
                                    <th className="px-5 py-3">URL Publik</th>
                                    <th className="px-5 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(!portfolios?.data || portfolios.data.length === 0) && (
                                    <tr><td colSpan={3} className="px-5 py-10 text-center text-gray-400 text-xs">
                                        Belum ada website. Isi form di sebelah kiri untuk memulai.
                                    </td></tr>
                                )}
                                {portfolios?.data?.map(p => (
                                    <tr key={p.id} className={`hover:bg-gray-50 transition ${editTarget?.id === p.id ? 'bg-teal-50' : ''}`}>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                {p.logo_url
                                                    ? <img src={p.logo_url} alt="" className="w-7 h-7 rounded-lg object-cover shrink-0 border border-gray-100" />
                                                    : <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center shrink-0">
                                                        {p.nama_usaha.charAt(0).toUpperCase()}
                                                      </div>
                                                }
                                                <p className="font-semibold text-gray-800 text-xs truncate max-w-[120px]">{p.nama_usaha}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <a href={`http://localhost:8000/${p.slug}`} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-teal-600 hover:underline font-mono text-xs group">
                                                <SvgIcon cls="w-3 h-3 shrink-0" d={D.link} />
                                                /{p.slug}
                                            </a>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <BtnEdit onClick={() => setEditTarget(p)} />
                                                <BtnDelete onClick={() => handleDelete(p.id, p.nama_usaha)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {portfolios?.links && (
                        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <span>{portfolios.from ?? 0}–{portfolios.to ?? 0} dari {portfolios.total ?? 0}</span>
                            <div className="flex gap-1">
                                {portfolios.links.map((link, i) => (
                                    <button key={i} disabled={!link.url}
                                        onClick={() => link.url && router.visit(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-2.5 py-1 rounded-lg transition ${
                                            link.active ? 'bg-teal-600 text-white'
                                            : link.url  ? 'hover:bg-gray-100 text-gray-600'
                                                        : 'text-gray-300 cursor-not-allowed'
                                        }`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Activity Log */}
            {recentLogs?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-sm font-bold text-gray-800">Log Aktivitas Terbaru</h2>
                    </div>
                    <ul className="divide-y divide-gray-50">
                        {recentLogs.map(log => (
                            <li key={log.id} className="px-6 py-3 flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">{log.admin_nama}</span>{' — '}
                                        <span className="text-gray-500">{log.keterangan_perubahan}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{log.created_at}</p>
                                </div>
                                <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded shrink-0">{log.aksi}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ─── Tab: Portofolio UMKM (Tabel Full-Width) ─────────────────────────────────
function TabPortfolio({ portfolios, setEditTarget, setActive }) {
    const handleDelete = (id, nama) => {
        if (confirm(`Apakah Anda yakin ingin menghapus website UMKM "${nama}"?\n\nSemua data produk terkait juga akan dihapus permanen.`))
            router.delete(route('admin.portfolios.destroy', id));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-gray-800">Semua Website UMKM</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Daftar lengkap seluruh website yang telah diterbitkan</p>
                </div>
                <button onClick={() => setActive('dashboard')}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                    <SvgIcon cls="w-3.5 h-3.5" d="M12 4v16m8-8H4" />
                    Tambah Baru
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                            <th className="px-6 py-3">Nama Usaha</th>
                            <th className="px-6 py-3">URL Publik</th>
                            <th className="px-6 py-3">Template</th>
                            <th className="px-6 py-3">Produk</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Tanggal</th>
                            <th className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(!portfolios?.data || portfolios.data.length === 0) && (
                            <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                                Belum ada website. Klik "Tambah Baru" untuk mulai membuat.
                            </td></tr>
                        )}
                        {portfolios?.data?.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {p.logo_url
                                            ? <img src={p.logo_url} alt="" className="w-9 h-9 rounded-xl object-cover shrink-0 border border-gray-100" />
                                            : <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0">
                                                {p.nama_usaha.charAt(0).toUpperCase()}
                                              </div>
                                        }
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{p.nama_usaha}</p>
                                            <p className="text-gray-400 text-xs">WA: {p.nomor_whatsapp}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={`http://localhost:8000/${p.slug}`} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-teal-600 hover:underline font-mono text-xs">
                                        <SvgIcon cls="w-3 h-3" d={D.link} />
                                        localhost:8000/{p.slug}
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs text-gray-500 capitalize">{p.layout_template.replace('_', ' ')}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold inline-flex items-center justify-center">
                                        {p.products_count}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                        ● Aktif
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-400">{p.created_at}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <BtnEdit onClick={() => { setEditTarget(p); setActive('dashboard'); }} />
                                        <BtnDelete onClick={() => handleDelete(p.id, p.nama_usaha)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {portfolios?.links && (
                <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Menampilkan {portfolios.from ?? 0}–{portfolios.to ?? 0} dari {portfolios.total ?? 0} website</span>
                    <div className="flex gap-1">
                        {portfolios.links.map((link, i) => (
                            <button key={i} disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-2.5 py-1 rounded-lg transition ${
                                    link.active ? 'bg-teal-600 text-white'
                                    : link.url  ? 'hover:bg-gray-100 text-gray-600'
                                                : 'text-gray-300 cursor-not-allowed'
                                }`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Tab: Daftar Klien ────────────────────────────────────────────────────────
function TabClients({ portfolios }) {
    const waMsg = (nama) => `Halo kak ${nama}, saya dari tim CMS Web Builder. Ada yang bisa kami bantu?`;
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">Daftar Kontak Klien UMKM</h2>
                <p className="text-xs text-gray-400 mt-0.5">Klik tombol WA untuk langsung menghubungi klien</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Nama Usaha</th>
                            <th className="px-6 py-3">Nomor WhatsApp</th>
                            <th className="px-6 py-3">Link Website</th>
                            <th className="px-6 py-3">Tgl Daftar</th>
                            <th className="px-6 py-3 text-center">Hubungi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(!portfolios?.data || portfolios.data.length === 0) && (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Belum ada klien terdaftar.</td></tr>
                        )}
                        {portfolios?.data?.map((p, i) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold inline-flex items-center justify-center">
                                        {(portfolios.from ?? 1) + i}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {p.logo_url
                                            ? <img src={p.logo_url} alt="" className="w-9 h-9 rounded-xl object-cover shrink-0" />
                                            : <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0">
                                                {p.nama_usaha.charAt(0).toUpperCase()}
                                              </div>
                                        }
                                        <span className="font-semibold text-gray-800">{p.nama_usaha}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-mono text-sm text-gray-700">{p.nomor_whatsapp}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <a href={`http://localhost:8000/${p.slug}`} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-teal-600 hover:underline font-mono text-xs">
                                        <SvgIcon cls="w-3 h-3" d={D.link} />
                                        /{p.slug}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-xs text-gray-400">{p.created_at}</td>
                                <td className="px-6 py-4 text-center">
                                    <a href={`https://wa.me/${p.nomor_whatsapp}?text=${encodeURIComponent(waMsg(p.nama_usaha))}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                        Hubungi via WA
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
        <div className="max-w-lg space-y-5">
            {/* Info Akun */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h2 className="font-bold text-gray-800">Informasi Akun Admin</h2>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white text-2xl font-black flex items-center justify-center shrink-0">
                        {adminName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-gray-800 text-base">{adminName}</p>
                        <p className="text-sm text-gray-500">Administrator</p>
                        <span className="inline-block mt-1 text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">● Sesi Aktif</span>
                    </div>
                </div>
                <div className="space-y-0 divide-y divide-gray-100">
                    {[
                        { label: 'Nama Tampilan', value: adminName },
                        { label: 'Username',      value: 'admin' },
                        { label: 'Role',          value: 'Admin' },
                        { label: 'Sistem',        value: 'CMS Web Builder UMKM' },
                        { label: 'Versi',         value: '2.0' },
                    ].map(row => (
                        <div key={row.label} className="flex justify-between items-center py-3">
                            <span className="text-sm text-gray-500">{row.label}</span>
                            <span className="text-sm font-semibold text-gray-800">{row.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status Sistem */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                <h2 className="font-bold text-gray-800">Status Sistem</h2>
                {[
                    { label: 'Database',      status: 'Terhubung',  ok: true },
                    { label: 'Storage',       status: 'Aktif',      ok: true },
                    { label: 'Mode Publish',  status: 'Auto Publish', ok: true },
                    { label: 'Akses Publik',  status: 'Aktif via /{slug}', ok: true },
                ].map(s => (
                    <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm text-gray-600">{s.label}</span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${s.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                            {s.ok ? '● ' : '○ '}{s.status}
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
                <p className="text-sm font-semibold text-sky-700 mb-1">ℹ Ubah Password</p>
                <p className="text-xs text-sky-600 leading-relaxed">
                    Untuk mengubah password, gunakan perintah Artisan Tinker:<br />
                    <code className="font-mono bg-sky-100 px-1 py-0.5 rounded text-sky-800 block mt-1 text-[11px] leading-relaxed break-all">
                        {'App\\Models\\Admin::where(\'username\',\'admin\')->update([\'password\'=> bcrypt(\'password_baru\')]);'}
                    </code>
                </p>
            </div>
        </div>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Dashboard({ stats, recentLogs = [], portfolios, adminName, flash }) {
    const [active,      setActive]      = useState('dashboard');
    const [editTarget,  setEditTarget]  = useState(null);

    const pageTitle = {
        dashboard: 'Dashboard',
        portfolio: 'Portofolio UMKM',
        clients:   'Daftar Klien',
        settings:  'Pengaturan',
    };

    return (
        <>
            <Head title="Dashboard Admin — CMS Web Builder" />
            <div className="flex min-h-screen bg-gray-50">

                <Sidebar active={active} setActive={setActive} />

                <div className="flex-1 flex flex-col min-w-0">
                    {/* Topbar */}
                    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">{pageTitle[active]}</h1>
                            <p className="text-xs text-gray-400">
                                Selamat datang, <span className="font-semibold text-gray-600">Admin</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="hidden sm:block text-xs text-gray-400">
                                {new Date().toLocaleDateString('id-ID', {
                                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                                })}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                                {adminName?.charAt(0)?.toUpperCase()}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-8 py-6">
                        {/* Flash messages */}
                        {flash?.success && (
                            <div className="mb-5 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm">
                                <SvgIcon cls="w-4 h-4 shrink-0" d={D.check} />
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                <span className="font-bold shrink-0">✕</span>
                                {flash.error}
                            </div>
                        )}

                        {/* ── Tab: Dashboard ── */}
                        {active === 'dashboard' && (
                            <TabDashboard
                                stats={stats}
                                portfolios={portfolios}
                                recentLogs={recentLogs}
                                editTarget={editTarget}
                                setEditTarget={setEditTarget}
                            />
                        )}

                        {/* ── Tab: Portofolio UMKM (full-width tabel) ── */}
                        {active === 'portfolio' && (
                            <TabPortfolio
                                portfolios={portfolios}
                                setEditTarget={setEditTarget}
                                setActive={setActive}
                            />
                        )}

                        {/* ── Tab: Daftar Klien ── */}
                        {active === 'clients' && (
                            <TabClients portfolios={portfolios} />
                        )}

                        {/* ── Tab: Pengaturan ── */}
                        {active === 'settings' && (
                            <TabSettings adminName={adminName} />
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
