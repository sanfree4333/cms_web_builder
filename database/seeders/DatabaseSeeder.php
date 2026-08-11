<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Akun admin default — idempotent (tidak duplikat jika di-run ulang)
        Admin::updateOrCreate(
            ['username' => 'admin'],
            [
                'nama_admin' => 'Admin',
                'password'   => Hash::make('admin123'),
                'role'       => 'SUPER_ADMIN',
            ]
        );
    }
}
