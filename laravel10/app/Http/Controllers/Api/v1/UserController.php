<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserController extends Controller
{
    protected $repository;
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }
    public function index() {}
    public function store(StoreUserRequest $request)
    {
        try {
            $data = $request->only(['username', 'email', 'password']);
            $data['role_as'] = $request->role_as ? (int)$request->role_as : 0;
            $data['password'] = bcrypt($data['password']);
            $user = $this->repository->create($data);

            if ($user) {
                $token = "";
                if (empty($user->role_as)) {
                    $token = $user->createToken('_userToken', ['user'])->plainTextToken;
                } else if ($user->role_as === 2) {
                    $token = $user->createToken('_managerToken', ['manager'])->plainTextToken;
                } else if ($user->role_as === 3) {
                    $token = $user->createToken('_creatorToken', ['creator'])->plainTextToken;
                }


                return response()->json([
                    'status' => 200,
                    'username' => $user->username,
                    'token' => $token,
                ]);
            }
            abort(422, $user);
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ]);
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
