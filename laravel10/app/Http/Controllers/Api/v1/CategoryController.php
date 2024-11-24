<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CategoryController extends Controller
{
    protected  $repository;
    public function __construct(CategoryRepository $repository)
    {
        // tham số thứ nhất là model, tham số thứ 2 là tên route
        $this->authorizeResource(Category::class, 'category');
        $this->repository = $repository;
    }
    public function index(Request $request)
    {
        return response()->json($this->repository->paginate($request));
    }
    public function show(Request $request, Category $category)
    {
        return new CategoryResource($category);
    }
    public function create() {}
    public function store(Request $request)
    {
        try {
            return response()->json($this->repository->store($request));
        } catch (Exception $ex) {
            return response()->json([
                'status' => 500,
                'errors' => $ex->getMessage()
            ]);
        }
    }
    public function edit() {}
    public function update(Request $request, Category $category)
    {
        try {
            $result = $this->repository->update($request, $category);
            return $result;
            if ($result['status'] === 200) {
                return response()->json($result);
            }
            // return response()->json([
            //     'status' => $result['status'],
            //     "errors" => $result['errors']
            // ]);
            abort($result['status'], $result['errors']);
        } catch (HttpException $ex) {
            return response()->json([
                'errors' => $ex->getMessage()
            ], $ex->getStatusCode());
        }
    }
    public function destroy() {}
    public function updateStatus(Request $request, Category $category){
        try{
            return response()->json($this->repository->updateStatus($category));
        }catch(HttpException $ex){
            return response()->json([
                'status'=>$ex->getStatusCode(),
                'errors'=>$ex->getMessage()
            ]);
        }
    }
}
