<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    private $menu = null;
    private $data = null;

    public function __construct(Menu $menu)
    {
        $this->menu = $menu;
    }

    public function index(Request $request)
    {
        // $request->session()->flush();
        return response()->json([
            'status' => true,
            'cart' => Session::get('cart'),
        ], 200);
    }

    public function add(Request $request)
    {
        $id = $request->id;
        $qty = $request->qty;

        $product = $this->menu->find($id);
        // $product = null;
        if ($product == null) {
            return response()->json([
                'status' => false,
                'icon' => 'error',
                'title' => __('Error'),
                'message' => __('Product not found!'),
            ], 404);
        }

        if ($request->session()->exists('cart.product.' . $product->id)) {
            // dd("OK");
            $qty += Session::get('cart.product.' . $product->id . '.qty');
        }

        $request->session()->put("cart.product." . $product->id, [
            'id' => $product->id,
            'tenmon' => $product->tenmon,
            'gia' => $product->gia,
            'anh' => $product->anh,
            'qty' => $qty,
        ]);

        return response()->json([
            'status' => true,
            'icon' => 'success',
            'title' => __('Đã thêm vào giỏ hàng'),
            'message' => __('Thêm vào giỏ hàng thành công!'),
        ], 200);
    }
}
