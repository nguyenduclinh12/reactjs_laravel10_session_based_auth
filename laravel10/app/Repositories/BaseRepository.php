<?php

namespace App\Repositories;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Type\Integer;

abstract class BaseRepository
{
    // có thể dung abstract repository thay cho interface repository . nhưng cũng có thể dùng chung . nhưng abstract có lợi hơn vì ngoài các function abstract thì có thể sử dung
    // thêm các function login bình thường
    protected $model;
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    public function all()
    {
        return $this->model->all();
    }
    public function find(Integer $id)
    {
        return $this->model->find($id);
    }
    public function createBase(array $data)
    {
        try {
            DB::beginTransaction();
            $result =  $this->model->create($data);
            if (!empty($result->id)) {
                DB::commit();
                return $result;
            }
            abort(422, $result);
        } catch (Exception $ex) {
            DB::rollBack();
            return $ex->getMessage();
        }
    }
    public function updateBase(array $data)
    {
        try {
            DB::beginTransaction();
            $result =  $this->model->update($data);
            if (!empty($result->id)) {
                DB::commit();
                return $result;
            }
            abort(422, $result);
        } catch (Exception $ex) {
            DB::rollBack();
            return $ex->getMessage();
        }
    }
    public function delete($model) {}
    public function forceDelete($model) {}
    public function uploadImage($images, $folder = '')
    {
        try {
            $uploadedPaths = [];
            foreach ($images as $image) {
                try {
                    $fileName = $image->getClientOriginalName();
                    // luu file vafo thu muc
                    $path = $image->storeAs('public/uploads/' . $folder, $fileName);
                    // them duong dan vao mang ket qua
                    $uploadedPaths['data'][] = Storage::url(str_replace('public/', '', $path));
                } catch (Exception $ex) {
                    $uploadedPaths['errors'][] = $ex->getMessage();
                }
            }
            return $uploadedPaths;
        } catch (Exception $ex) {
            return $ex->getMessage();
        }
    }
    protected function removeFiles(array $files)
    {
        $errors = [];
        if (!empty($files)) {
            for ($i = 0; $i < count($files); $i++) {
                try {

                    $url = ltrim(str_replace('/storage/', '', $files[$i]));

                    if (Storage::disk('public')->exists($url)) {
                        Storage::disk('public')->delete($url);
                        $errors[] = "Delete File Success " . $url;
                    } else {
                        $errors[] = "file not exist " . $url;
                    }
                } catch (Exception $ex) {
                    $errors[] = "File get error " . $ex->getMessage() . ': ' . $files[$i];
                }
            }
        } else {
            $errors[] = "missing list file";
        }
        return $errors;
    }
}
