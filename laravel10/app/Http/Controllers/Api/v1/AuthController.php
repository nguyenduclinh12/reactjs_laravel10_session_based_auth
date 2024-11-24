<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthController extends Controller
{
    public function checkAuth(Request $request)
    {
        try {
            if ($request->user()) {
                return response()->json([
                    'authenticated' => true,
                    'user' => $request->user()
                ], 200);
            }
            return response()->json([
                'authenticated' => false,
                'message' => 'User is not authenticated'
            ], 401);
        } catch (HttpException $ex) {
            return response()->json([
                'authenticated' => false,
                'message' => $ex->getMessage()
            ], 500);
        }
    }
}
