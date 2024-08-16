<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\recoverMailable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /*      Mostrar Tabla     */
    public function index()
    {
        return response()->json([
            'message' => 'ya basta'
        ]);
    }

    /*           */
    public function create()
    {
        //
    }

    /*      Crear usuario para tabla     */
    public function store(Request $request)
    {
        // Validaciones de los campos
        $request->validate([
            'name' => 'required',
            'user' => 'required',
            'email' => 'required|email|unique:users',
            'password' => ['required','confirmed', Password::min(8)],
        ]);
        
        //Alta del usuario
        $usuario = new User();
        $usuario->name = $request->name;
        $usuario->email = $request->email;
        $usuario->user = $request->user;
        $usuario->password = Hash::make($request->password);
        $usuario->rol = $request->rol;
        $usuario->save();
        
        // Respuesta
        return response()->json([
            'message' => 'resgistro exitoso'
        ]);
        /* return response($user, Response::HTTP_CREATED); */
    }

    /*     Buscar un usuario      */
    public function show(string $id)
    {
        $contact = User::find($id);
        return response()->json($contact);
    }

    /*      Login     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $usuario = Auth::user();
            $token = $usuario->createToken('token')->plainTextToken;
 
            $id = $usuario -> id;
            $rol = $usuario -> rol;
            return response()->json([
                'Token' => $token,
                'id' => $id,
                'rol' => $rol
            ]);
            /* return response(['token' => ~$token], Response::HTTP_OK); */
        }
        else{
            return response()->json([
                'message' => 'error'
            ]);
            /* return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email'); */
        }
 
        
    }

    /*     Actualizar datos de un usuario en especifico      */
    public function update(Request $request, string $id)
    {
        //
    }

    /*     Eliminar un usuario      */
    public function destroy(string $id)
    {
        //
    }

    /*     Enviar Correo      */
    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $usuario = User::where('email','=', $request->email)->first();
        
        if ($usuario) {
            // Generar un código aleatorio de 6 dígitos
            $codigoAleatorio = $this->generarCodigoAleatorio(6);

            // Puedes incluir el código en el correo o en el array que envías
            $data = $request->all();
            $data['codigo'] = $codigoAleatorio; // Agregar el código al array
            $usuario->code_segurity = $codigoAleatorio;
            $usuario->save();
            Mail::to('inversionesnlrelectric@gmail.com')->send(new recoverMailable($data));
            return response()->json([
                'message' => 'Mensaje enviado',
                'id' => $usuario->id,
                'email' => $usuario->email,
            ]);
        } else {
            return response()->json(['message' => 'Correo no encontrado.'], 404);
        }
        
    }

    private function generarCodigoAleatorio($longitud)
    {
        // Generar un número aleatorio de la longitud especificada
        return str_pad(rand(0, 999999), $longitud, '0', STR_PAD_LEFT);
    }
}