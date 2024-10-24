<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::with('salesInfo')->get();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product-image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate the image
            'P-name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        // Handle the image upload
        if ($request->hasFile('product-image')) {
            $image = $request->file('product-image');
            $fileName = Str::slug($request->input('P-name')) . '.' . $image->getClientOriginalExtension();

            $imagePath = Storage::disk('public')->putFileAs('product_images', $image, $fileName);

            // Append image path to the validated data
            $validatedData['product_image_url'] = $imagePath;
        }

        // Create the new product
        $product = Product::create([
            'product_image_url' => $validatedData['product_image_url'],
            'product_name' => $validatedData['P-name'],
            'product_categories' => $validatedData['category'],
            'quantity' => $validatedData['quantity'],
            'price' => $validatedData['price'],
        ]);

        return response()->json(['message' => 'Product Added Successfully', 'product' => $product], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
