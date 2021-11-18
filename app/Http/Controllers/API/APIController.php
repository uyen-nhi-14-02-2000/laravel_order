<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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

            if($user == null) {
                return 'error';
            }

            return $user->sdt;

        } catch (\Throwable $th) {
            return 'error';
        }
    }
}
