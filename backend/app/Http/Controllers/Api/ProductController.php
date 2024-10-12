<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    //
    public function index(){
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request){

        // FALTA MODIFICAR POR SI EL MISMO PRODUCTO EXISTE
        // PUEDEN SER DOS OPCIONES
        // 1. REBOTAR EL PRODUCTO INDICANDO QUE YA EXISTE Y QUE ACTUALICE EL PRODUCTO
        // 2. IDENTIFICAR EL PRODUCTO QUE COINCIDA Y AUMENTAR EL STOCK, AUNQUE NO SERIA EFICIENTE
        
        // Validaciones
        $request -> validate([
            'name' => 'required',
            'model' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'estado' => 'required',
            'img' => 'required',
            'proveedor' => 'required',
            'marca' => 'required',
            'descripcion' => 'required',
            'tipo' => 'required',
        ]);

        // verificar si el producto ya existe
        $existe = Product::where('name', $request->name)
                        ->where('model', $request->model)
                        ->where('marca', $request->marca)
                        ->where('tipo', $request->tipo)
                        ->where('amperaje', $request->amperaje)
                        ->where('voltaje', $request->voltaje)
                        ->exists();

        if ($existe)
        {
            // Rspuesta
            return response()->json([
                'message' => 'El producto ya existe'
            ], 409); 
        }
        else
        {
            $product = Product::create([
                'name' => $request -> name,
                'model' => $request -> model,
                'price' => $request -> price,
                'stock' => $request -> stock,
                'estado' => $request -> estado,
                'code_sku' => $this->sku(),
                'img' => $request -> img,
                'proveedor' => $request -> proveedor,
                'marca' => $request -> marca,
                'tipo' => $request -> tipo,
                'descripcion' => $request -> descripcion,
                'amperaje' => $request -> amperaje,
                'voltaje' => $request -> voltaje,
            ]);
            
            // Rspuesta
            return response()->json([
                    'message' => 'Registro Exitoso'
            ], 201); 
        }
        
    }

    public function show(string $id)
    {
        $product = Product::find($id);
        return response() -> json($product);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::where('id', $id)->first();
        
        if (!$product) {
            return response()->json([
                'message'=> 'Producto no encontrado'
            ]);
        } 
        else 
        {
            $request -> validate([
                'name' => 'required',
                'model' => 'required',
                'price' => 'required',
                'stock' => 'required',
                'estado' => 'required',
                'img' => 'required',
                'proveedor' => 'required',
                'marca' => 'required',
                'descripcion' => 'required',
                'tipo' => 'required',
            ]);
            
            $product -> update($request->all());
            return response()->json([
                'message'=> 'Producto actualizado con exito'
            ],201);
        }
        
    }

    public function destroy(string $id)
    {
        $product = Product::find($id);
        $product -> delete();
        return response()->json([
            'message'=> 'Producto eliminado exitosamente'
        ]);
    }

    private function sku()
    {
        /*
        Esta funcion se encarga de crear un codigo aleatorio de 8 digitos el cual despues de crearlo
        buscara en la BD si existe ese codigo, de ser asi se hara un llamado a la misma funcion (recursividad)
        el cual volvera a crear un numero aleatorio hasta que no coincida

        pd: si en un futuro medita cambiar o agregar cambios a la funcion recursiva para mejorar su eficiencia 
        acorde la cantidad de productoss que maneje la empresa.
         */
        
        $valor = str_pad(rand(0, 99999999), 8, '0', STR_PAD_LEFT);

        $product = Product::where('code_sku','=', $valor)->first();

        if ($product)
        {
            return $this -> sku();    
        }
        else 
        {
            return $valor;    
        }
    }

}