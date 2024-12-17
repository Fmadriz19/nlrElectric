<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Factura;
use App\Models\Product;

class FacturaController extends Controller
{
    //
    public function index()
    {
        $factura = Factura::all();
        return response() -> json($factura);
    }

    public function store (Request $request)
    {
        $request -> validate(['verificar' => 'required']);

        $factura = Factura::create([
            'verificar' => $request -> verificar,
            'id_user' => $request -> id_user,
            'name_user' => $request -> name_user,
            'empresa' => $request -> empresa,
            'email' => $request -> email,
            'code_sku' => $this -> code(),
            'estado' => $request -> estado,
            'fecha_compra' => $request -> fecha_compra,
            'iva' => $request -> iva,
            'total' => $request -> total,
            'productos' => $request -> productos,
            'informacion_servicio' => $request -> informacion_servicio
        ]);
        
         // Actualizar el stock de los productos
        foreach ($request->productos as $producto) {
            // Suponiendo que cada producto tiene un 'id' y 'cantidad'
            $productoId = $producto['id'];
            $cantidadComprada = $producto['quantity'];

            // Buscar el producto en la base de datos
            $productoEnStock = Product::find($productoId);;

            if ($productoEnStock) {

                // Actualizar la cantidad en el stock
                $productoEnStock->stock -= $cantidadComprada;

                // Verificar si el stock llega a cero
                if ($productoEnStock->cantidad_en_el_stock <= 0) {
                    $productoEnStock->estado = 'No disponible'; // Cambiar el estado a "no disponible"
                }
                // Guardar los cambios
                $productoEnStock->save();
            }
        }

        return response() ->json([
            'message'=> 'La factura se registro con exito'
        ]);
        
    }

    public function show(string $id)
    {
        $factura = Factura::find($id);
        return response() -> json($factura);
    }

    public function update (Request $request, string $id)
    {
        $factura = Factura::find($id); 
        
        if ($factura)
        {
            if ($request -> verificar === 'producto')
            {
                $factura = Factura::update([
                    'estado' => $request -> estado, 
                ]);
                
                return response() -> json([
                    'message' => ' Se ha actualizado el estado del producto'
                ], 201);
            }

            else if ($request->verificar === 'servicio')
            {
                $factura = Factura::update([
                    'informe' => $request -> informe,
                    'estado' => $request -> estado,
                ]);

                return response() -> json([
                    'message' => ' Se ha actualizado el estado y el informe del servicio'
                ], 201);
            }
            
        }

        return response() -> json([
            'message' => 'no se encuetra ningun registro con esos datos'
        ]);
        
    }

    public function destroy(string $id)
    {
        $factura = Factura::find($id);
        $factura -> delete();
    }

    // codigo de facturacion
    private function code()
    {
        $prefix = 'FAC-';
        $number = str_pad(mt_rand(0, 999999), 8, '0', STR_PAD_LEFT);
        $code = $prefix . $number;
        
        $factura = Factura::where('code_sku', '=', $code) -> first();

        if($factura)
        {
            return $this -> code();
        }
        
        return $code;
    }
}