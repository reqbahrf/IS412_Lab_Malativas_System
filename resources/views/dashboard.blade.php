<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Home</title>
    @vite('resources/css/app.css')
  </head>
  <body class="bg-gray-100">
    <!-- Header  -->
    <header class="fixed w-full bg-teal-800 text-white z-50">
      <div
        class="container mx-auto flex items-center justify-between px-4 py-2"
      >
      <div class="relative group">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-3xl font-bold cursor-pointer flex items-center">
            Malaticas.com
            <!-- Arrow Icon -->
            <span class="ml-2 transform transition-transform duration-300 group-hover:rotate-90">
              &gt;
            </span>
          </h1>
          <div class="hidden md:block">
            <!-- Empty to maintain spacing -->
          </div>
        </div>
        <!-- Pop-up navigation links (vertically) -->
        <div class="absolute left-0 w-full bg-white rounded-lg hidden group-hover:block ring-1 ring-teal-600">
            <a href="#" class="flex items-center px-4 py-3 text-lg font-medium border-b text-black hover:text-teal-600">Dashboard</a>
            <a href="#" class="flex items-center px-4 py-3 text-lg font-medium border-b text-black hover:text-teal-600">Products</a>
            <a href="#" class="flex items-center px-4 py-3 text-lg font-medium border-b text-black hover:text-teal-600">Users</a>
            <a href="#" class="flex items-center px-4 py-3 text-lg font-medium border-b text-black hover:text-teal-600">Settings</a>
        </div>
      </div>

        <div class="flex items-center justify-end gap-4">

          <!-- bell Icon -->
          <div class="relative group">
            <div class="absolute right-0 top-0 p-2">
              <span class="inline-block h-3 w-3 rounded-full bg-red-600"></span>
            </div>
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                width="70px"
                height="70px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7258 7.34056C12.1397 7.32632 12.4638 6.97919 12.4495 6.56522C12.4353 6.15125 12.0882 5.8272 11.6742 5.84144L11.7258 7.34056ZM7.15843 11.562L6.40879 11.585C6.40906 11.5938 6.40948 11.6026 6.41006 11.6114L7.15843 11.562ZM5.87826 14.979L6.36787 15.5471C6.38128 15.5356 6.39428 15.5236 6.40684 15.5111L5.87826 14.979ZM5.43951 15.342L5.88007 15.949C5.89245 15.94 5.90455 15.9306 5.91636 15.9209L5.43951 15.342ZM9.74998 17.75C10.1642 17.75 10.5 17.4142 10.5 17C10.5 16.5858 10.1642 16.25 9.74998 16.25V17.75ZM11.7258 5.84144C11.3118 5.8272 10.9647 6.15125 10.9504 6.56522C10.9362 6.97919 11.2602 7.32632 11.6742 7.34056L11.7258 5.84144ZM16.2415 11.562L16.9899 11.6113C16.9905 11.6025 16.9909 11.5938 16.9912 11.585L16.2415 11.562ZM17.5217 14.978L16.9931 15.5101C17.0057 15.5225 17.0187 15.5346 17.0321 15.5461L17.5217 14.978ZM17.9605 15.341L17.4836 15.9199C17.4952 15.9294 17.507 15.9386 17.5191 15.9474L17.9605 15.341ZM13.65 16.25C13.2358 16.25 12.9 16.5858 12.9 17C12.9 17.4142 13.2358 17.75 13.65 17.75V16.25ZM10.95 6.591C10.95 7.00521 11.2858 7.341 11.7 7.341C12.1142 7.341 12.45 7.00521 12.45 6.591H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM9.74998 16.25C9.33577 16.25 8.99998 16.5858 8.99998 17C8.99998 17.4142 9.33577 17.75 9.74998 17.75V16.25ZM13.65 17.75C14.0642 17.75 14.4 17.4142 14.4 17C14.4 16.5858 14.0642 16.25 13.65 16.25V17.75ZM10.5 17C10.5 16.5858 10.1642 16.25 9.74998 16.25C9.33577 16.25 8.99998 16.5858 8.99998 17H10.5ZM14.4 17C14.4 16.5858 14.0642 16.25 13.65 16.25C13.2358 16.25 12.9 16.5858 12.9 17H14.4ZM11.6742 5.84144C8.65236 5.94538 6.31509 8.53201 6.40879 11.585L7.90808 11.539C7.83863 9.27613 9.56498 7.41488 11.7258 7.34056L11.6742 5.84144ZM6.41006 11.6114C6.48029 12.6748 6.08967 13.7118 5.34968 14.4469L6.40684 15.5111C7.45921 14.4656 8.00521 13.0026 7.9068 11.5126L6.41006 11.6114ZM5.38865 14.4109C5.23196 14.5459 5.10026 14.6498 4.96265 14.7631L5.91636 15.9209C6.0264 15.8302 6.195 15.6961 6.36787 15.5471L5.38865 14.4109ZM4.99895 14.735C4.77969 14.8942 4.58045 15.1216 4.43193 15.3617C4.28525 15.5987 4.14491 15.9178 4.12693 16.2708C4.10726 16.6569 4.24026 17.0863 4.63537 17.3884C4.98885 17.6588 5.45464 17.75 5.94748 17.75V16.25C5.78415 16.25 5.67611 16.234 5.60983 16.2171C5.54411 16.2004 5.53242 16.1861 5.54658 16.1969C5.56492 16.211 5.59211 16.2408 5.61004 16.2837C5.62632 16.3228 5.62492 16.3484 5.62499 16.3472C5.62513 16.3443 5.62712 16.3233 5.6414 16.2839C5.65535 16.2454 5.67733 16.1997 5.70749 16.151C5.73748 16.1025 5.77159 16.0574 5.80538 16.0198C5.84013 15.981 5.86714 15.9583 5.88007 15.949L4.99895 14.735ZM5.94748 17.75H9.74998V16.25H5.94748V17.75ZM11.6742 7.34056C13.835 7.41488 15.5613 9.27613 15.4919 11.539L16.9912 11.585C17.0849 8.53201 14.7476 5.94538 11.7258 5.84144L11.6742 7.34056ZM15.4932 11.5127C15.3951 13.0024 15.9411 14.4649 16.9931 15.5101L18.0503 14.4459C17.3105 13.711 16.9199 12.6744 16.9899 11.6113L15.4932 11.5127ZM17.0321 15.5461C17.205 15.6951 17.3736 15.8292 17.4836 15.9199L18.4373 14.7621C18.2997 14.6488 18.168 14.5449 18.0113 14.4099L17.0321 15.5461ZM17.5191 15.9474C17.5325 15.9571 17.5599 15.9802 17.5949 16.0193C17.629 16.0573 17.6634 16.1026 17.6937 16.1514C17.7241 16.2004 17.7463 16.2463 17.7604 16.285C17.7748 16.3246 17.7769 16.3457 17.777 16.3485C17.7771 16.3497 17.7756 16.3238 17.792 16.2844C17.81 16.241 17.8375 16.211 17.856 16.1968C17.8702 16.1859 17.8585 16.2002 17.7925 16.217C17.7259 16.234 17.6174 16.25 17.4535 16.25V17.75C17.9468 17.75 18.4132 17.6589 18.7669 17.3885C19.1628 17.0859 19.2954 16.6557 19.2749 16.2693C19.2562 15.9161 19.1151 15.5972 18.9682 15.3604C18.8194 15.1206 18.6202 14.8936 18.4018 14.7346L17.5191 15.9474ZM17.4535 16.25H13.65V17.75H17.4535V16.25ZM12.45 6.591V5H10.95V6.591H12.45ZM9.74998 17.75H13.65V16.25H9.74998V17.75ZM8.99998 17C8.99998 18.5008 10.191 19.75 11.7 19.75V18.25C11.055 18.25 10.5 17.7084 10.5 17H8.99998ZM11.7 19.75C13.2089 19.75 14.4 18.5008 14.4 17H12.9C12.9 17.7084 12.3449 18.25 11.7 18.25V19.75Z"
                  fill="#000000"
                />
              </svg>
            </button>
            <div class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50 hidden group-hover:block ring-1 ring-teal-600">
              <div class="px-4 py-2 text-gray-700 font-semibold border-b">Notifications</div>
              <!-- Notification Item 1 -->
              <a href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100">
                <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">📦</div>
                <div class="ml-3">
                  <p class="text-sm text-black font-medium">New Stock added</p>
                  <p class="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </a>
              <!-- Notification Item 2 -->
              <a href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100">
                <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">🎉</div>
                <div class="ml-3">
                  <p class="text-sm text-black font-medium">You have a new follower!</p>
                  <p class="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </a>
              <!-- Notification Item 3 -->
              <a href="#" class="flex items-center px-4 py-3 hover:bg-gray-100">
                <div class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">📦</div>
                <div class="ml-3">
                  <p class="text-sm text-black font-medium">Stock is running out</p>
                  <p class="text-xs text-gray-500">30 minutes ago</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Profile Icon -->
          <div class="relative group">
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
            >
              <svg
                fill="#000000"
                height="70px"
                width="70px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path
                        d="M256,0C114.836,0,0,114.836,0,256c0,55.849,17.988,107.567,48.454,149.692c0.197,0.897,0.479,1.781,0.94,2.625 c0.945,1.719,2.332,3.026,3.937,3.897C100.187,472.863,173.601,512,256,512c141.163,0,256-114.837,256-256 C512,114.836,397.163,0,256,0z M256,492.308c-73.255,0-138.832-33.507-182.212-86.003c47.187-24.817,128.284-62.291,129.164-62.7 c2.423-1.115,4.289-3.173,5.163-5.683c0.885-2.519,0.712-5.279-0.481-7.663c-13.144-26.289-44.01-102.615-29.202-139.635 c0.289-0.721,0.491-1.481,0.606-2.26l9.606-67.231c3.702-6.663,14.154-21.327,26.029-22.587 c7.923-0.808,16.625,4.462,25.692,15.808c1.875,2.336,4.702,3.692,7.692,3.692c3.212,0,78.769,1.01,78.769,88.615 c0,1.058,0.173,2.106,0.51,3.115l9.846,29.538c0.077,0.24,7.625,24.048-17.317,49c-1.077,1.077-1.894,2.394-2.375,3.846 l-9.846,29.539c-1.183,3.538-0.259,7.442,2.375,10.077c2.389,2.399,57.406,56.853,124.505,78.882 C391.163,460.644,327.209,492.308,256,492.308z M328.308,321.99l7.144-21.452c31.423-32.904,20.885-66.029,20.404-67.452 l-9.346-28.048c-0.846-91.683-73.894-104.587-93.606-106.394c-12.712-14.538-26.241-21.163-40.308-19.683 c-25.587,2.712-40.635,31.423-42.269,34.683c-0.471,0.942-0.788,1.961-0.942,3.01l-9.683,67.808 c-16.635,44.202,14.115,119.308,25.99,145.452c-23.195,10.813-85.772,40.233-123.95,60.479 c-26.495-38.183-42.05-84.5-42.05-134.392c0-130.298,106.01-236.308,236.308-236.308S492.308,125.702,492.308,256 c0,51.517-16.584,99.228-44.676,138.101C392.462,378.32,342.937,335.498,328.308,321.99z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 hidden group-hover:block ring-1 ring-teal-600">
              <a href="#" class="flex text-black items-center border-b px-4 py-3 hover:bg-gray-100">
                Profile
              </a>
              <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                @csrf
             </form>
              <button id="logoutbtn" class="flex text-black items-center px-4 py-3 hover:bg-red-600 hover:text-white w-full">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!--
          bg-green-100
          bg-red-100
          border
          border-green-400
          border-red-400",
    -->

    <!-- Pop Taast -->
    <div id="toast" class="fixed top-20 right-0 p-4 bg-green hidden">
      <div id="toast-content" class="shadow-md rounded-lg px-4 py-3">
        <div class="flex items-center">
          <div id="toast-message" class="flex-1 text-sm font-medium text-gray-900">
          </div>
          <button class="ml-3 text-sm font-medium text-blue-500 hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->

    <!-- Modal -->
    <div class="fixed z-50 inset-0 overflow-y-auto modal hidden">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl md:min-h-96 modal-body">
          <div class="model-header bg-teal-800 flex items-center justify-between border-b border-green-50  px-2 py-4">
            <h3 class="text-lg font-extrabold text-white">Update Product</h3>
            <button type="button" data-model="close" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div class="px-4 pb-4">
            <form id="updateProductForm" enctype="multipart/form-data" class="hidden" data-action="UPDATE">
              <div class="space-y-6">
                <div class="mb-4 flex items-center justify-start">
                  <label for="image" class="mr-4">Upload Image</label>
                  <input type="file" name="product-image" accept="image/jpeg, image/png"  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 image-input">
                  <button type="button" class="p-2 rounded-full bg-red-500 text-white hover:bg-red-700 unselect-image" >&#x2715;</button>
                </div>
                <div class="mb-4">
                  <img src="" alt="Image Preview" class="w-3/6 h-3/6 object-cover object-center mx-auto image-preview">
                </div>
                <div>
                  <label for="Product_name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="name" id="Product_name" class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                  <select name="category" id="category" class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option value="">Select a Category</option>
                    <option value="Building Materials">Building Materials</option>
                    <option value="Tools">Tools</option>
                    <option value="Plumbing Supplies">Plumbing Supplies</option>
                    <option value="Electrical Supplies">Electrical Supplies</option>
                    <option value="Paint and Decorating Supplies">Paint and Decorating Supplies</option>
                    <option value="Hardware and Fasteners">Hardware and Fasteners</option>
                    <option value="Lawn and Garden Supplies">Lawn and Garden Supplies</option>
                  </select>
                </div>
                <div class="flex items-center w-full">
                  <div class="w-3/6">
                    <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="text" name="quantity" id="quantity" class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm number-only" />
                  </div>
                  <div class="w-3/6">
                    <label for="updated-price" class="block text-sm font-medium text-gray-700">Price</label>
                    <input type="text" name="price" id="price" class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm number-only" />
                  </div>
                </div>
                <div class="flex justify-end">
                  <button type="submit" class="mt-4 w-2/4 rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                    Update
                  </button>
                </div>
              </div>
            </form>
            <form id="orderProductForm" enctype="multipart/form-data" class="hidden" data-action="ORDER">
              <div class="grid sm:grid-cols-1 md:grid-cols-2">
                <div>
                  <img src="" class="orderProduct" alt="Product Image">
                </div>
                <div class="flex flex-col">
                  <div>
                    <label for="ReadonlyProductName">Product Name</label>
                    <input type="text" class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" name="ReadonlyProductName" value="" readonly>
                  </div>
                  <div>
                    <label for="SelectedQuantity">Quantity</label>
                    <select name="Quantity" id="SelectedQuantity" class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ">
                    </select>
                  </div>
                  <div>
                    <label for="price">Price:</label>
                    <input type="text" name="price" class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500" readonly>
                  </div>
                  <div>
                    <label for="Total">Total:</label>
                    <input type="text" name="Total" class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 font-bold" readonly>
                  </div>
                  <div class="flex justify-end">
                    <button type="submit" class="mt-4 w-2/4 rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>



   <!-- Main Content -->
    <div class="h-auto py-4">
      <div class="grid gap-4 px-6 pt-20 md:grid-cols-4">
        <!-- table container -->
        <div class="md:col-span-4">
          <div class="rounded-lg bg-white p-4 shadow-lg">
            <p class="text-2xl font-bold">Welcome, John Doe</p>
          </div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-lg md:col-span-3 h-[450px] ">
          <div class="mb-4 flex items-center justify-between">
            <span class="text-xl font-bold">Products List</span>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search product"
              class="w-1/4 rounded-full border-2 border-gray-300 px-4 py-2"
            />
          </div>
          <div class="overflow-y-auto h-[330px]">
            <table class="w-full table-auto ">
              <thead>
                <tr class="sticky top-0 bg-white">
                  <th class="px-4 py-2">#</th>
                  <th class="px-4 py-2">Product Image</th>
                  <th class="px-4 py-2">Product Name</th>
                  <th class="px-4 py-2">Product Category</th>
                  <th class="px-4 py-2">Quantity</th>
                  <th class="px-4 py-2">Price</th>
                  <th class="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody id="productList">

              </tbody>
              <tfoot class="sticky bottom-0 bg-white">
                <tr>
                  <td colspan="4" class="border px-4 py-2 font-bold">Total</td>
                  <td class="border text-center font-bold" id="totalQuantity">25</td>
                  <td class="border text-center font-bold" id="totalPrice">₱1000</td>
                  <td class="border"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Add Product Container -->
        <div class="md:col-span-1 h-full">
          <div class="rounded-lg bg-white p-4 shadow-lg h-full">
            <form id="addProductForm" enctype="multipart/form-data">
              <div class="mb-4 flex items-center justify-start">
                <label for="image" class="mr-4">Upload Image</label>
                <input type="file" name="product-image" accept="image/jpeg, image/png"  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 image-input">
                <button type="button" class="p-2 rounded-full bg-red-500 text-white hover:bg-red-700 unselect-image">&#x2715;</button>
              </div>
              <div class="mb-4 w-full h-40">
                <img src="" alt="Image Preview" class="mx-auto max-w-40 max-h-40 object-cover object-center image-preview">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >Product Name</label
                  >
                  <input
                    type="text"
                    name="P-name"
                    id="name"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    for="category"
                    class="block text-sm font-medium text-gray-700"
                    >Category</label
                  >
                  <select
                    name="category"
                    id="category"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                  <option value="">Select a Category</option>
                  <option value="Building Materials">Building Materials</option>
                  <option value="Tools">Tools</option>
                  <option value="Plumbing Supplies">Plumbing Supplies</option>
                  <option value="Electrical Supplies">Electrical Supplies</option>
                  <option value="Paint and Decorating Supplies">Paint and Decorating Supplies</option>
                  <option value="Hardware and Fasteners">Hardware and Fasteners</option>
                  <option value="Lawn and Garden Supplies">Lawn and Garden Supplies</option>
                  </select>
                </div>
                <div>
                  <label
                    for="quantity"
                    class="block text-sm font-medium text-gray-700"
                    >Quantity</label
                  >
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm number-only"
                  />
                </div>
                <div>
                  <label
                    for="price"
                    class="block text-sm font-medium text-gray-700"
                    >Price</label
                  >
                  <input
                    type="text"
                    name="price"
                    id="price"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm number-only"
                  />
                </div>
                <div class="col-span-2">
                  <button
                    type="submit"
                    class="mt-4 w-full rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-lg min-h-40">
          <span class="text-xl font-bold">Recent Order:</span>
          <div class="overflow-y-auto mx-4" >
            <ul class="list-disc pl-4" id="recentOrderList">

            </ul>
          </div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-lg min-h-40 col-span-2">
          <span class="text-xl font-bold">Total Sold and Revenue</span>
          <div class="flex justify-center mt-4 space-x-20">
            <div>
              <span class="text-lg font-bold">Total Sold Items:</span>
              <span class="text-3xl font-bold" id="totalSoldItems"></span>
            </div>
            <div>
              <span class="text-lg font-bold">Total Revenue:</span>
              <span class="text-3xl font-bold" id="totalRevenue"></span>
            </div>
          </div>

        </div>
      </div>
    </div>

    @include('footer')
    <script>
        const PRODUCTS_URL_ENDPOINTS = {
            GET_SALES : '{{ route('sold-products') }}',
            GET_ALL_PRODUCTS: '{{ route('Product.index') }}',
            ADD_PRODUCT: '{{ route('Product.store') }}',
            SHOW_PRODUCT: '{{ route('Product.show', ':id') }}',
            UPDATE_PRODUCT: '{{ route('Product.update', ':id') }}',
            DELETE_PRODUCT: '{{ route('Product.destroy', ':id') }}',
        }

    </script>
    @vite('resources/js/app.js')
  </body>
</html>
