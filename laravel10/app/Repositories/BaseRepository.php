<?php

namespace App\Repositories;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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
    public function create(array $data)
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
    public function update(array $attribute) {}
    public function delete($model) {}
    public function forceDelete($model) {}
}
