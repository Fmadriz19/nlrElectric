<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->string('verificar'); // Este campo servira para verificar si es un producto, un servicio o una compra realizada por la empresa
            $table->string('id_user'); 
            $table->string('name_user');
            $table->string('empresa'); // Empresa o Personal
            $table->string('email');
            $table->string('name_compras');
            $table->string('model')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->string('price')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->string('cantidad')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->string('img')->nullable();
            $table->string('marca')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->string('descripcion');
            $table->string('tipo')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->string('amperaje')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->string('voltaje')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->string('proveedor')->nullable(); // Este campo solo sera habilitado si el verificar es un uproveedor
            
            $table->string('ejecucion')->nullable(); // Este campo solo sera habilitado si el verificar es un servicio(tiempo de horas a trabajar) 
            $table->string('informe')->nullable(); // Este informe se cumple si es un servicio que se va a realizar
            $table->string('fecha_realizar')->nullable(); // fecha la cual el cliente desea que se realice el servicio
            
            $table->string('code_sku', 8)->nullable(); // // Este campo solo sera habilitado si el verificar es un producto
            $table->string('envio')->nullable(); // Este campo solo sera habilitado si el verificar es un producto
            $table->string('direccion')->nullable(); // // Este campo solo sera habilitado si el verificar es un producto y su vez el campo envio sea aceptado
            $table->string('estado')->nullable(); // Depediendo de que verificar sea se cambia el estado de (entregado o no) a (realizado, pendiente o en ejecucion)
            $table->dateTime('fecha_compra', precision: 0); 
            $table->string('iva');
            $table->string('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};