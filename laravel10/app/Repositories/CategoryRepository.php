<?php

namespace App\Repositories;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\UserCollection;
use App\Models\Category;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CategoryRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
    public function paginate($request)
    {
        $user = $request->user();
        // Lọc các Category dựa trên điều kiện:
        // - Nếu user có quyền 'admin' thì lấy tất cả Category
        // - Nếu không phải admin, chỉ lấy các Category do user tạo ra
        $categories = Category::when($user && !$user->tokenCan('admin'), function ($query) use ($user) {
            return $query->where('creator_id', $user->id);
        })->get();
        return [
            'status' => 200,
            'categories' => new CategoryCollection($categories)
        ];
    }
    public function store($request)
    {
        try {
            DB::beginTransaction();


            $data = $request->only($this->payloadSelect());
            if ($request->hasFile('images')) {
                $imageUploadErr = '';
                try {
                    foreach ($request->file('images') as $image) {
                        $fileName = $image->getClientOriginalName();
                        // luu file vafo thu muc
                        $path = $image->storeAs('public/uploads/category', $fileName);
                        // them duong dan vao mang ket qua
                        $uploadedPaths[] = Storage::url(str_replace('public/', '', $path));
                    }
                } catch (Exception $ex) {
                    $imageUploadErr = $ex->getMessage();
                }
                if (!empty($imageUploadErr)) {
                    abort(422, $imageUploadErr);
                }
                $data['image'] = json_encode($uploadedPaths);
                $data['creator_id'] = Auth::id();

                $Category = Category::create(attributes: $data);

                if ($Category) {
                    DB::commit();
                    return [
                        'status' => 200,
                        'message' => 'Category created success !'
                    ];
                }
                abort(422, $Category);
            }
            abort(422, "missing Images");
        } catch (Exception $ex) {
            DB::rollBack();
            return [
                'status' => 500,
                'errors' => $ex->getMessage()
            ];
        }
    }
    public function update($request, $category)
    {
        try {

            DB::beginTransaction();
            if (empty($category)) {
                abort(404, "Category Not exist !");
            }
            $data = $request->only($this->payloadSelect());


            $uploadedPaths = [];
            if ($request->hasFile('images')) {
                $images = $request->file('images');
                $uploadedPaths = $this->uploadImage($images, 'category');
            }
            if (!empty($uploadedPaths['errors'])) {
                // rollback upload image
                $this->removeFiles($uploadedPaths['data']);
                abort(422, "upload image get Error");
            }
            $imageList = array_merge(empty($data['image']) ? [] : $data['image'], empty($uploadedPaths['data']) ? [] : $uploadedPaths['data']);
            if (empty($imageList)) {
                abort(404, "Missing image");
            }
            // thuc hien xoa cac hinh anh da bi remove khoi danh sach
            // array_diff tra ve danh sach cac phan tu nam trong array A nhung khong co trong array B nhung voi van giu nguyen chi muc
            $listImageDelete = array_diff(json_decode($category->image), $imageList);
            $resultRemoveLink = [];
            if (!empty($listImageDelete)) {
                // dung array_values de sap xep lai index bat dau = 0 
                $resultRemoveLink = $this->removeFiles(array_values($listImageDelete));
            }

            $data['image'] = json_encode($imageList);
            $data['creator_id'] = Auth::id();

            $data['status'] = $data['status'] === 'false' ? 0 : 1;


            $result = $category->update($data);
            if ($result) {
                DB::commit();
                return [
                    'status' => 200,
                    'message' => 'Category Update success !',
                    'errorRemoveLink' => $resultRemoveLink
                ];
            }
            abort(422, $result);
        } catch (HttpException $ex) {
            DB::rollBack();
            return [
                'status' => $ex->getStatusCode(),
                'errors' => $ex->getMessage()
            ];
        }
    }
    public function updateStatus($categories)
    {
        try {
            DB::beginTransaction();
            if ($categories) {
                $categories->status = $categories->status == 1 ? 0 : 1;

                if ($categories->save()) {
                    DB::commit();
                    return [
                        'status' => 200,
                        'message' => "Update Status Success"
                    ];
                }
                abort(422, "Category Update get Error" . $categories);
            }
            abort(404, "Missing Data");
        } catch (HttpException $ex) {
            DB::rollBack();
            return [
                'status' => 500,
                'errors' => $ex->getMessage()
            ];
        }
    }


    private function payloadSelect()
    {
        return [
            "name",
            'slug',
            'description',
            'meta_title',
            'meta_keyword',
            'meta_description',
            'image',
            'status',
        ];
    }
}
