<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        $products->transform(function ($product) {
            if ($product->product_image_url) {
                $product->product_image_url = asset('storage/' . $product->product_image_url);
            }
            return $product;
        });

        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product-image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate the image
            'product-name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        try {

            if ($request->hasFile('product-image')) {
                $image = $request->file('product-image');
                $fileName = Str::slug($request->input('product-name')) . '.' . $image->getClientOriginalExtension();
                $imagePath = Storage::disk('public')->putFileAs('Products-image', $image, uniqid() . '_' . $fileName);

                $validatedData['product_image_url'] = $imagePath;
            }

            // Create the new product
           Product::create([
                'product_image_url' => $validatedData['product_image_url'],
                'product_name' => $validatedData['product-name'],
                'product_categories' => $validatedData['category'],
                'quantity' => $validatedData['quantity'],
                'price' => $validatedData['price'],
            ]);


            return response()->json(['message' => 'Product Added Successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        // Handle the image upload
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $id, Request $request)
    {

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
    public function update(Request $request)
    {

        $validated = $request->validate([
            'product-image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate the image
            'name' => 'required',
            'category' => 'required',
            'quantity' => 'required|numeric',
            'price' => 'required|numeric'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
