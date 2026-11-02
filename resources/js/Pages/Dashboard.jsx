import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Hero */}
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg p-6 mb-6 shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Selamat Datang, Admin</h1>
                                <p className="text-sm opacity-90 mt-1">Ikhtisar cepat sistem Anda dan aktivitas terbaru.</p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-xs opacity-80">Pengguna</div>
                                    <div className="text-2xl font-extrabold">1,254</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs opacity-80">Portofolio</div>
                                    <div className="text-2xl font-extrabold">86</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs opacity-80">Produk</div>
                                    <div className="text-2xl font-extrabold">2,430</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h4>
                            <ul className="mt-4 space-y-3 text-sm text-gray-600">
                                <li className="flex justify-between"><span className="font-medium">admin menambahkan produk baru</span><span className="text-xs text-gray-400">10 menit lalu</span></li>
                                <li className="flex justify-between"><span className="font-medium">portofolio diterbitkan</span><span className="text-xs text-gray-400">2 jam lalu</span></li>
                                <li className="flex justify-between"><span className="font-medium">pembaruan template</span><span className="text-xs text-gray-400">1 hari lalu</span></li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h4 className="text-lg font-semibold text-gray-800">Tindakan Cepat</h4>
                            <div className="mt-4 grid grid-cols-1 gap-3">
                                <button className="w-full py-2 bg-teal-600 text-white rounded-md">Buat Portofolio Baru</button>
                                <button className="w-full py-2 border border-gray-200 rounded-md">Tambah Produk</button>
                                <button className="w-full py-2 bg-gray-50 rounded-md">Kelola Pengguna</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
