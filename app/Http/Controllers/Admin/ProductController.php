<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // TODO: Fase 2 — list semua produk (bisa difilter by portfolio)
    }

    public function create()
    {
        // TODO: Fase 2 — form tambah produk baru
    }

    public function store(Request $request)
    {
        // TODO: Fase 2 — simpan produk baru
    }

    public function show(string $id)
    {
        // TODO: Fase 2 — detail satu produk
    }

    public function edit(string $id)
    {
        // TODO: Fase 2 — form edit produk
    }

    public function update(Request $request, string $id)
    {
        // TODO: Fase 2 — update produk
    }

    public function destroy(string $id)
    {
        // TODO: Fase 2 — hapus produk
    }
}
