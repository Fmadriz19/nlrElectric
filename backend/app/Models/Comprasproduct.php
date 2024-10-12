<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comprasproduct extends Model
{
    use HasFactory;

    protected $table = "comprasproducts";

    protected $fillable = [
        'id_user',
        'name_user',
        'empresa',
        'email',
        'name_servicio',
        'model',
        'price',
        'cantidad',
        'img',
        'marca',
        'descripcion',
        'tipo',
        'amperaje',
        'voltaje',
        'envio',
        'num_factura',
        'estado',
        'fecha_compra',
        'iva',
        'total'
    ];
}