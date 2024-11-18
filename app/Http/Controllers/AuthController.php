<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'loginUsed' => 'required',
                'password' => 'required|min:8'
            ]);

            $credentials = [
                $this->loginUse($request->loginUsed) => $request->loginUsed,
                'password' => $request->password
            ];

            if (!Auth::attempt($credentials)) {
                return redirect()->route('login')->with('error', 'Invalid Credentials')->withInput();
            }

            return redirect()->route('dashboard');
        } catch (Exception $e) {
            return redirect()->route('login')->with('error', $e->getMessage())->withInput();
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Auth::login($user);

            return redirect()->route('dashboard')->with('success', 'Registration successful!');
        } catch (Exception $e) {
            return redirect()->route('register')
                ->with('error', 'Registration failed: ' . $e->getMessage())
                ->withInput();
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');

    }

    protected function loginUse($userCredentials)
    {

        if(filter_var($userCredentials, FILTER_VALIDATE_EMAIL)){
            return 'email';
        }
        return 'username';
    }

}
