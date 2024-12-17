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
        'code_sku',
        'estado',
        'fecha_compra',
        'iva',
        'total', 
        'productos',
        'informacion_servicio',
    ];

    // Para que Laravel reconozca el campo `productos` como un array al recuperarlo
    protected $casts = [
        'productos' => 'array',
        'informacion_servicio' => 'array',
    ];
}