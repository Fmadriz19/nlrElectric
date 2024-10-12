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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('model');
            $table->string('price');
            $table->string('stock');
            $table->string('estado');
            $table->string('code_sku', 8)->unique();
            $table->longText('img');
            $table->string('proveedor');
            $table->string('marca');
            $table->longText('descripcion');
            $table->string('tipo');
            $table->string('amperaje')->nullable();
            $table->string('voltaje')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};