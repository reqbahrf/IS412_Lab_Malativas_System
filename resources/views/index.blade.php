<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>index</title>
    @vite('resources/css/app.css')
</head>
<body>
    <body class="bg-gray-50">
        <!-- Header  -->
        <header class="fixed z-50 w-full bg-teal-800 text-white">
          <div
            class="container mx-auto flex items-center justify-between px-4 py-4"
          >
            <h1 class="text-3xl font-bold">Malativas.com</h1>
            <nav class="flex space-x-4">
              <a
                href="#"
                class="text-lg font-semibold text-white hover:text-teal-200"
                >HOME</a
              >
              <a
                href="#"
                class="text-lg font-semibold text-white hover:text-teal-200"
                >FAQ</a
              >
              <a
                href="#"
                class="text-lg font-semibold text-white hover:text-teal-200"
                >ABOUT</a
              >
              <a
                href="{{ route('login') }}"
                class="text-lg font-semibold text-white hover:text-teal-200"
                >LOG IN</a
              >
            </nav>
          </div>
        </header>

        <div
          class="flex min-h-screen items-center justify-center bg-cover bg-no-repeat"
          style="background-image: url('{{ asset('Assets/indexpage/pagebackground.webp') }}')"
        >
          <!-- Text Section -->
          <div class="absolute w-2/4 bg-teal-800/[0.4] p-4 text-white">
            <h1
              class="relative bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text pb-6 text-5xl font-bold text-transparent"
            >
              Streamline Your Product Workflow
            </h1>
            <p class="z-0 text-gray-200 text-lg font-semibold text-justify">
              Say goodbye to manual spreadsheets and hello to a streamlined product
              workflow. Our platform helps you centralize product information,
              automate tasks, and gain real-time insights. With our intuitive
              interface and customizable workflows, you can focus on what matters
              most.
            </p>
            <div class="flex justify-end">
              <button
                class="mt-6 rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
              >
                Try It Now
              </button>
            </div>
          </div>
        </div>
        @include('footer')
</body>
</html>
