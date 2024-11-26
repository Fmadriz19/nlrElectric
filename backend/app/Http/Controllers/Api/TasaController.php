<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tasa;
use Illuminate\Http\Request;

class TasaController extends Controller
{
    //

    public function index() {
        $tasa = Tasa::all();
        return response()->json($tasa);
    }

    public function store(Request $request){
        
        $tasa = Tasa::create([
            'tasabcv'=> $request->tasabcv
        ]);
        
        return response()->json([
            'message' => 'se registro con exito la tasa del dia'
        ]);
    }

    public function update(Request $request, string $id){
        $tasa = Tasa::find($id);

        $tasa = Tasa::update([
            'tasabcv' => $request-> tasabcv
        ]);

        return response() -> json([
            'message' => 'se actualizo la tasa del bcv'
        ]);
        
        
    }
}