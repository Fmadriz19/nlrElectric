<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    
    protected $table = 'products';
    protected $fillable = [
        'name',
        'model',
        'price',
        'stock',
        'estado',
        'code_sku',
        'img',
        'proveedor',
        'marca',
        'descripcion',
        'tipo',
        'amperaje',
        'voltaje',
    ];
}