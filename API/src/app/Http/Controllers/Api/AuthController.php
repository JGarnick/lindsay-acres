<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function getUser(Request $request){
        return response()->json([
            'success' => true,
            'message' => 'User Retrieved Successfully',
            'user' => auth()->user()
        ], 200);
    }

    public function createUser(Request $request){
        try{
            //Validated
            $validateUser = Validator::make($request->all(), [
                "name" => "required",
                "email" => "required|email|unique:users,email",
                "password_confirmation" => "required",
                "password" => ["required", "confirmed", Password::min(8)->letters()->mixedCase()->numbers()]
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'User Created Successfully',
                // 'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        }catch(\Throwable $th){
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function loginUser(Request $request){
        try{
            $validateUser = Validator::make($request->all(),[
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'success' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if( !Auth::attempt($request->only(["email", "password"])) ){
                return response()->json([
                    'success' => false,
                    'message' => 'Email & Password does not match any records.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'success' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'user' => $user
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logoutUser(Request $request){
        Auth::logout();

        return response()->json([
            'success' => true,
            'message' => 'User Logged Out Successfully'
        ], 200);
    }
}
