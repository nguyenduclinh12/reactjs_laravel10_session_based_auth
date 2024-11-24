<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserController extends Controller
{
    protected $repository;
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }
    public function index()
    {
        return $this->repository->paginate();
        
    }
    public function store(StoreUserRequest $request)
    {
        try {
            $result = $this->repository->register($request);
            if ($result['status'] === 200) {
                return response()->json($result, 200);
            }
            return response()->json($result, 401);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ], 500);
        }
    }
    public function login(Request $request)
    {

        return $this->repository->login($request);
    }
    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            if ($user->currentAccessToken()) {
                $user->currentAccessToken()->delete();
            }
            return response()->json([
                'status' => 200,
                'message' => 'User logout Successfully'
            ]);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ]);
        }
    }
}
