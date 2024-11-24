<?php

namespace App\Repositories;

use App\Http\Resources\UserCollection;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
    public function paginate()
    {
        return new UserCollection(User::all());
    }
    public function register($request)
    {
        try {
            DB::beginTransaction();
            $data = $request->only(['username', 'email', 'password']);
            $data['role_id'] = $request->role_as ? (int)$request->role_id : 0;
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);


            if ($user) {
                $token = "";
                if (empty($user->role_as)) {
                    $token = $user->createToken('_userViewToken', ['user:view'])->plainTextToken;
                }
                // else if ($user->role_as === 2) {
                //     $token = $user->createToken('_creatorViewToken', ['user:creator'])->plainTextToken;
                // } else if ($user->role_as === 3) {
                //     $token = $user->createToken('_creatorViewToken', ['user:censor'])->plainTextToken;
                // } else if ($user->role_as === 4) {
                //     $token = $user->createToken('_managerViewToken', ['manager'])->plainTextToken;
                // }

                DB::commit();
                return [
                    'status' => 200,
                    'username' => $user->username,
                    'token' => $token,
                ];
            }
            abort(422, $user);
        } catch (Exception $ex) {
            DB::rollBack();
            return [
                'status' => 500,
                'errors' => $ex->getMessage()
            ];
        }
    }
    public function login($request)
    {
        try {
            $data = $request->only(['email', 'password']);

            $validate = Validator::make($data, [
                'email' => 'required|email',
                'password' => 'required'
            ]);
            // khi dùng response()->json([]) : nếu có thêm mã lỗi thì nó sẽ vào catch() phía client , còn nếu không thêm mã lỗi thì sẽ vào response của then()
            if ($validate->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validate->errors()
                ], 422);
            }
            if (!Auth::attempt(credentials: $data)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Email & Password does not match with our record'
                ], 401);
            }
            $user = User::where('email', $request->email)->first();
            if ($user) {
                $token = '';
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
            abort(404, "User not exist !");
        } catch (HttpException $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage(),
            ], 500);
        }
    }
}
