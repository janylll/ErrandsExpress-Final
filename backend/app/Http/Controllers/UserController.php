<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:225',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'Registration successful!',
            'user' => $user->makeHidden(['password']),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
{
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required|string|min:8|max:30',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Invalid email or password'], 401);
    }

    $token = JWTAuth::fromUser($user);

    return response()->json([
        'message' => 'Login successful',
        'user'    => $user->makeHidden(['password']),
        'token'   => $token,
    ], 200);
}


    public function dashboard()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token not found or malformed'], 401);
        }

        return response()->json([
            'message' => 'Welcome to your dashboard',
            'user' => $user,
        ]);
    }

    public function logout()
    {
        try {
            $token = JWTAuth::getToken();

            if (!$token) {
                return response()->json(['error' => 'Token not provided'], 401);
            }

            JWTAuth::invalidate($token);

            return response()->json(['message' => 'Logged out successfully'], 200);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to log out, token invalid'], 401);
        }
    }
}
