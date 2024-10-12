<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    protected $table = "facturas";

    protected $fillable = [
        'verificar',
        'id_user',
        'name_user',
        'empresa',
        'email',
        'name_compras',
        'model',
        'price',
        'cantidad',
        'img',
        'marca',
        'descripcion',
        'tipo',
        'amperaje',
        'voltaje',
        'proveedor',
        'ejecucion',
        'informe',
        'code_sku',
        'envio',
        'direccion',
        'estado',
        'fecha_realizar',
        'fecha_compra',
        'iva',
        'total'
    ];
}