<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        // 'id',
        "name",
        'slug',
        'description',
        'meta_title',
        'meta_keyword',
        'meta_description',
        'image',
        'status',
        'image',
        'creator_id'
    ];
}
