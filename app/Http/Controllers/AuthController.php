<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'loginUsed' => 'required|sometimes:email',
                'password' => 'required|min:8'
            ]);

            $credentials = [
                $this->username($request->loginUsed) => $request->loginUsed,
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


    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');

    }

    protected function username($userCredentials)
    {

        if(filter_var($userCredentials, FILTER_VALIDATE_EMAIL)){
            return 'email';
        }
        return 'username';
    }

}
