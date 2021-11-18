<?php

namespace App\Http\Controllers\API;

use App\Models\Menu;
use App\Models\User;
use App\Models\TheLoai;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class APIController extends Controller
{

    private $user = null;
    private $data = null;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function login(Request $request)
    {
        try {
            $sdt = $request->sdt;
            $pass = $request->pass;

            $user = $this->user->where([
                ['sdt', '=', $sdt],
                ['password_text', '=', $pass],
            ])->first();

            if ($user == null) {
                return 'error';
            }

            return $user->sdt;
        } catch (\Throwable $th) {
            return 'error';
        }
    }

    public function thuongHieu(ThuongHieu $model)
    {
        $this->data = $model->all();
        return response()->json($this->data);
    }

    public function menu(Menu $model)
    {
        $this->data = $model->all();
        return response()->json($this->data);
    }

    public function getMenu(Request $request, Menu $model)
    {

        try {
            $idTheLoai = $request->idtheloai;

            $this->data = $model->where('idtheloai', '=', $idTheLoai)->get();
            return response()->json($this->data);
        } catch (\Exception $th) {
            return response()->json([
                'message' => 'Error!',
            ], 500);
        }
    }
    public function getTH(Request $request, Menu $model)
    {

        try {
            $idTH = $request->idth;

            $this->data = $model->where('idth', '=', $idTH)->get();
            return response()->json($this->data);
        } catch (\Exception $th) {
            return response()->json([
                'message' => 'Error!',
            ], 500);
        }
    }

    public function theLoai(TheLoai $model)
    {
        $this->data = $model->all();
        return response()->json($this->data);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'ten' => ['required', 'string', 'max:255'],
                'sdt' => ['required', 'numeric', 'unique:users,sdt'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
                'pass' => ['required', Rules\Password::defaults()],
            ]);
    
            $user = User::create([
                'sdt' => $request->sdt,
                'ten' => $request->ten,
                'email' => $request->email,
                'password' => Hash::make($request->pass),
                'password_text' => $request->pass,        ]);
    
            event(new Registered($user));
            if($user) {
                return 'success';
            }
            return 'error';
        } catch (\Exception $th) {
            return 'error';
        }
    }
}
