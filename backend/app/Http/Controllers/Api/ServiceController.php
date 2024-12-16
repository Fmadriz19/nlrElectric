<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    //
    public function index()
    {
        $service = Service::all();
        return response()->json($service);
    }

    public function store(Request $request)
    {
        $request -> validate([
            'name' => 'required',
            'descripcion' => 'required',
            'ejecucion' => 'required',
        ]);

        $existe = Service::where('name', $request -> name)
                        ->where('descripcion', $request -> descripcion)
                        ->where('ejecucion', $request -> ejecucion)
                        ->exists();

        if($existe)
        {
            return response()->json([
            'message' => 'Ya existe un servicio con esas caracteristicas'], 409);
        } 
        else 
        {
            $service = Service::create([
                'name'=> $request -> name,
                'descripcion' => $request -> descripcion,
                'ejecucion' => $request -> ejecucion,
                'img' => $request -> img,
            ]);

            return response() ->json([
                'message'=> 'El servicio se creo con exito'
            ]);
        }
    }

    public function show(string $id)
    {
        $service = Service::find($id);
        return response()->json($service);
    }

    public function update(Request $request, string $id)
    
    {
        $service = Service::where('id', $id)->first();

        if(!$service)
        {
            return response()->json([
            'message' => 'No se encuentra el servicio a actualizar'], 409);
        } 
        else 
        {
            $request -> validate([
                'name' => 'required',
                'descripcion' => 'required',
                'ejecucion' => 'required',
                'img' => 'required',
            ]);
            
            $service -> update($request->all());
            return response()->json([
                'message'=> 'Servicio actualizado con exito'
            ],201);
            
        }
    }

    public function destroy(string $id)
    {
        $service = Service::find($id);
        $service -> delete();

        return response() ->json([
            'message' => 'Se ha eliminado el Servicio con Exito'
        ]);
        
    }
}