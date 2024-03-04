<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validate = $request->validate([
            "email"=> "required|email",
            "password"=> "required",
        ]);

        if (!Auth::attempt($validate)) {
            return response()->json([
                "message"=> "login Fail",
                "status"=> 401,
            ]);
        }

        $user = User::where("email", $request->email)->first();
        $role = RoleUser::where("id_user", $user->id)->first();
        if (!$role) {
            $roleType = "USER";
        }
        return response()->json([
            "access_token" => $user->createToken("api_token")->plainTextToken,
            "token_type" => "Bearer",
            "message"=> "success",
            "status"=> 200,
            "role_type"=> $roleType,
        ]);
    }
}
