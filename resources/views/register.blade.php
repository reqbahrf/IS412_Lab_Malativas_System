<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register</title>
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-50">
    <!-- Header  -->
    <header class="fixed w-full bg-teal-800 text-white z-20">
        <div class="container mx-auto flex items-center justify-between px-4 py-4">
            <h1 class="text-3xl font-bold">Malativas.com</h1>
        </div>
    </header>

    <!-- Registration Form -->
    <div class="flex justify-center items-center relative min-h-screen bg-cover bg-no-repeat"
        style="background-image: url('{{ asset('Assets/indexpage/pagebackground.webp') }}')"">
        <div class="w-96 rounded-lg bg-white p-8 shadow-lg">
            <h2 class="mb-6 text-center text-2xl font-semibold">Sign Up</h2>
            <form method="POST" action="{{ route('submit_register') }}">
                @csrf
                @if (session()->has('error'))
                    <div class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {{ session()->get('error') }}
                    </div>
                @endif
                <div class="mb-4">
                    <label for="username" class="mb-2 block">Username</label>
                    <input name="username" type="text" class="w-full rounded-lg border px-4 py-2"
                        placeholder="Choose a unique username" value="{{ old('username') }}" required/>
                    @error('username')
                        <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>
                <div class="mb-4">
                    <label for="email" class="mb-2 block">Email</label>
                    <input name="email" type="email" class="w-full rounded-lg border px-4 py-2"
                        placeholder="Enter your email" value="{{ old('email') }}" required/>
                    @error('email')
                        <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>
                <div class="mb-4 relative">
                    <label for="password" class="mb-2 block">Password</label>
                    <input name="password" type="password" class="w-full rounded-lg border px-4 py-2 pr-10"
                        placeholder="Create a password" id="password" required/>
                    <button type="button" class="absolute right-2 top-[60%]" id="toggle_Password">
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                    stroke="#1C274C" stroke-width="1.5"></path>
                                <path
                                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                    stroke="#1C274C" stroke-width="1.5"></path>
                            </g>
                        </svg>
                    </button>
                    @error('password')
                        <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>
                <div class="mb-4 relative">
                    <label for="password_confirmation" class="mb-2 block">Confirm Password</label>
                    <input name="password_confirmation" type="password" class="w-full rounded-lg border px-4 py-2 pr-10"
                        placeholder="Confirm your password" id="password_confirmation" required/>
                </div>
                <button type="submit"
                    class="w-full rounded-lg bg-teal-800 py-2 px-4 block text-center text-white transition hover:bg-teal-700">
                    Create Account
                </button>
                <div class="mt-4 text-center">
                    <span>Already have an account? </span><a href="/login" class="text-teal-800">Login</a>
                </div>
            </form>
        </div>
    </div>
    @include('footer')
    @vite('resources/js/app.js')
</body>

</html>
