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
            $table->string('code_sku', 10)->nullable(); // codigo de facturacion

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