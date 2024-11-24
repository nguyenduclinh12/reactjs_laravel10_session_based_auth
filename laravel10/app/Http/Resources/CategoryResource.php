<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description ?? '',
            'image' => $this->image,
            'meta_title' => $this->meta_title ?? '',
            // theem cac dieu kien ?? '' de tranh loi phia reactjs  A component is changing a controlled input to be uncontrolled.
            // This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between
            'meta_description' => $this->meta_description ?? '',
            'meta_keyword' => $this->meta_keyword ?? '',
            'status' => $this->status === 0 ? false : true,
        ];
    }
}
