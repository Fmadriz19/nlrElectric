<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Factura;

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

        
        if ($request->verificar === 'producto') 
        {
            $request -> validate([
                'id_user' => 'required',
                'name_user' => 'required',
                'empresa' => 'required',
                'email' => 'required',
                'name_compras' => 'required',
                'model' => 'required',
                'price' => 'required',
                'cantidad' => 'required',
                'img' => 'required',
                'marca' => 'required',
                'descripcion' => 'required',
                'tipo' => 'required',
                'amperaje' => 'required',
                'voltaje' => 'required',
                'code_sku' => 'required',
                'envio' => 'required',
                'direccion' => 'required',
                'estado' => 'required',
                'fecha_compra' => 'required',
                'iva' => 'required',
                'total' => 'required',
            ]);

            // crear factura
            $factura = Factura::create([
                'verificar' => $request -> verificar,
                'id_user' => $request -> id_user,
                'name_user' => $request -> name_user,
                'empresa' => $request -> empresa,
                'email' => $request -> email,
                'name_compras' => $request -> name_compras,
                'model' => $request -> model,
                'price' => $request -> price,
                'cantidad' => $request -> cantidad,
                'img' => $request -> img,
                'marca' => $request -> marca,
                'descripcion' => $request -> descripcion,
                'tipo' => $request -> tipo,
                'amperaje' => $request -> amperaje,
                'voltaje' => $request -> voltaje,
                'code_sku' => $request -> code_sku,
                'envio' => $request -> envio,
                'direccion' => $request -> direccion,
                'estado' => $request -> estado,
                'fecha_compra' => $request -> fecha_compra,
                'iva' => $request -> iva,
                'total' => $request -> total,
            ]);  
            
            return response() ->json([
                'message'=> 'La factura se registro con exito'
            ]);
        }
        else if ($request->verificar === 'servicio')
        {
            $request -> validate([
                'id_user' => 'required',
                'name_user' => 'required',
                'empresa' => 'required',
                'email' => 'required',
                'name_compras' => 'required',
                'price' => 'required',
                'img' => 'required',
                'descripcion' => 'required',
                'ejecucion' => 'required',
                'informe' => 'required',
                'estado' => 'required',
                'fecha_realizar' => 'required',
                'fecha_compra' => 'required',
                'iva' => 'required',
                'total' => 'required',
            ]);

            // crear factura
            $factura = Factura::create([
                'verificar' => $request -> verificar,
                'id_user' => $request -> id_user,
                'name_user' => $request -> name_user,
                'empresa' => $request -> empresa,
                'email' => $request -> email,
                'name_compras' => $request -> name_compras,
                'price' => $request -> price,
                'img' => $request -> img,
                'descripcion' => $request -> descripcion,
                'ejecucion' => $request -> ejecucion,
                'informe' => $request -> informe,
                'estado' => $request -> estado,
                'fecha_realizar' => $request -> fecha_realizar,
                'fecha_compra' => $request -> fecha_compra,
                'iva' => $request -> iva,
                'total' => $request -> total,
            ]);  
            
            return response() ->json([
                'message'=> 'La factura se registro con exito'
            ]);   
        }

        // compras de la empresa

        $request -> validate([
            'id_user' => 'required',
            'name_user' => 'required',
            'empresa' => 'required',
            'email' => 'required',
            'name_compras' => 'required',
            'model' => 'required',
            'price' => 'required',
            'cantidad' => 'required',
            'img' => 'required',
            'marca' => 'required',
            'descripcion' => 'required',
            'tipo' => 'required',
            'amperaje' => 'required',
            'voltaje' => 'required',
            'code_sku' => 'required',
            'estado' => 'required',
            'fecha_compra' => 'required',
            'iva' => 'required',
            'total' => 'required',
        ]);

        // crear factura
        $factura = Factura::create([
            'verificar' => $request -> verificar,
            'id_user' => $request -> id_user,
            'name_user' => $request -> name_user,
            'empresa' => $request -> empresa,
            'email' => $request -> email,
            'name_compras' => $request -> name_compras,
            'model' => $request -> model,
            'price' => $request -> price,
            'cantidad' => $request -> cantidad,
            'img' => $request -> img,
            'marca' => $request -> marca,
            'descripcion' => $request -> descripcion,
            'tipo' => $request -> tipo,
            'amperaje' => $request -> amperaje,
            'voltaje' => $request -> voltaje,
            'proveedor' => $request -> proveedor,
            'estado' => $request -> estado,
            'fecha_compra' => $request -> fecha_compra,
            'iva' => $request -> iva,
            'total' => $request -> total,
        ]);  
        
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
}