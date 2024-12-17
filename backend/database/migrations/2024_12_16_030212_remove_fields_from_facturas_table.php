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
        // si deseo modificar cualquier otra tabla, seria casi lo mismo pero con el nombre de la tabla
        Schema::table('facturas', function (Blueprint $table) {
            // ELIMINANDO CAMPOS DE LA TABLA FACTURAS
            $table->dropColumn('name_compras');
            $table->dropColumn('model')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->dropColumn('price')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->dropColumn('cantidad')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->dropColumn('img')->nullable();
            $table->dropColumn('marca')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->dropColumn('descripcion');
            $table->dropColumn('tipo')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->dropColumn('amperaje')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->dropColumn('voltaje')->nullable(); // Este campo solo sera habilitado si el verificar es productos o proveedores
            $table->dropColumn('proveedor')->nullable(); // Este campo solo sera habilitado si el verificar es un uproveedor
            
            $table->dropColumn('ejecucion')->nullable(); // Este campo solo sera habilitado si el verificar es un servicio(tiempo de horas a trabajar) 
            $table->dropColumn('informe')->nullable(); // Este informe se cumple si es un servicio que se va a realizar
            $table->dropColumn('fecha_realizar')->nullable(); // fecha la cual el cliente desea que se realice el servicio
            
            $table->dropColumn('envio')->nullable(); // Este campo solo sera habilitado si el verificar es un producto
            $table->dropColumn('direccion')->nullable(); // // Este campo solo sera habilitado si el verificar es un producto y su vez el campo envio sea aceptado

            // AGREGANDO CAMPOS A LA TABLA FACTURAS
            $table->json('productos'); // Aquí se almacenarán los productos como un array en formato JSON
            $table->json('informacion_servicio'); // Aquí se almacenarán la informacion de servicio como un array en formato JSON

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('facturas', function (Blueprint $table) {
            //
        });
    }
};