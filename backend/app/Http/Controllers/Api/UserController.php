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
        $usuario = User::all();
        return response()->json($usuario);
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
            'rol' => 'required',
            'user' => 'required|unique:users',
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
                'token' => $token,
                'id' => $id,
                'rol' => $rol
            ]);
            /* return response(['token' => ~$token], Response::HTTP_OK); */
        }
        else{
            return response()->json([
                'message' => 'La contraseña es incorrecta. Vuelve a intentarlo o haz clic en "¿Olvidaste la contraseña?" para restablecerla.'
            ], 401);
            /* return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email'); */
        }
    }

    /*     Actualizar datos de un usuario en especifico      */
    public function update(Request $request, string $id)
    {
        $user = User::where('id', $id)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        } else {
            $user->update($request->all());
            return response()->json([
                'message' => 'Usuario actualizado con exito'
            ]);
        }
    }

    /*     Eliminar un usuario      */
    public function destroy(string $id)
    {
        // eliminar usuario
        $usuario = User::find($id); 
        $usuario->delete();
        return response()->json([
            'message' => 'Usuario eliminado con exito'
        ]);
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

    public function restorePassword(Request $request)
    {
        $request->validate([
            'password' => ['required','confirmed', Password::min(8)],
        ]);
        
        $usuario = User::where('email','=', $request->email)->first();
        if ($usuario) {
           
            //Alta del usuario
            $usuario->password = Hash::make($request->password);
            $usuario->code_segurity = null;
            $usuario->save();
            
            // Respuesta
            return response()->json([
                'message' => 'resgistro exitoso'
            ]);
        } else {
            return response()->json(['message'=> 'El correo no existe'], 404);
        }
    }

    // Cerrar sesion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Sesion terminada'
        ]);
    }
}