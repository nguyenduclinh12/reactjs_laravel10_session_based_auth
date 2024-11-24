<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UploadFileController extends Controller
{
    public function uploadFiles(Request $request)
    {
        try {
            if ($request->hasFile('file')) {
                $imageUploadErr = '';

                try {
                    if (is_array($request->hasFile('file'))) {
                        foreach ($request->file('images') as $image) {
                            $fileName = $image->getClientOriginalName();
                            // luu file vafo thu muc
                            $path = $image->storeAs('public/uploads/general', $fileName);
                            // them duong dan vao mang ket qua
                            $uploadedPaths[] = Storage::url(str_replace('public/', '', $path));
                        }
                    } else {
                        $image = $request->file('file');
                        $fileName = $image->getClientOriginalName();
                        // luu file vafo thu muc
                        $path = $image->storeAs('public/uploads/general', $fileName);
                        // them duong dan vao mang ket qua
                        $uploadedPath = Storage::url(str_replace('public/', '', $path));
                        return response()->json([
                            'status' => 200,
                            'url' => $uploadedPath,
                            'fileName' => $fileName
                        ]);
                    }
                } catch (Exception $ex) {
                    $imageUploadErr = $ex->getMessage();
                }
                if (!empty($imageUploadErr)) {
                    abort(422, $imageUploadErr);
                }

                return response()->json([
                    'status' => 200,
                    'resultUpload' => $uploadedPaths
                ]);
                // $file = $request->file('file');
                // $path = $file->store('uploads', 'public'); // Lưu file vào storage/app/public/uploads
                // return response()->json(['url' => asset('storage/' . $path), 'path' => $path]);
            }
            abort(400, 'No file uploaded');
        } catch (HttpException $ex) {
            return response()->json(['status' => $ex->getStatusCode(), 'error' => $ex->getMessage()]);
        }
    }
    public function uploadVideos(Request $request)
    {
        try {
            
            // $request->validate([
            //     'video' => 'required|mimes:mp4,avi,mov,wmv|max:20480', // Max: 20MB
            // ]);
            return $request->file('video');
            if ($request->hasFile('file')) {
                $imageUploadErr = '';

                try {
                    if (is_array($request->hasFile('file'))) {
                        foreach ($request->file('images') as $image) {
                            $fileName = $image->getClientOriginalName();
                            // luu file vafo thu muc
                            $path = $image->storeAs('public/uploads/general', $fileName);
                            // them duong dan vao mang ket qua
                            $uploadedPaths[] = Storage::url(str_replace('public/', '', $path));
                        }
                    } else {
                        $image = $request->file('file');
                        return $image;
                        $fileName = $image->getClientOriginalName();
                        // luu file vafo thu muc
                        $path = $image->storeAs('public/uploads/general', $fileName);
                        // them duong dan vao mang ket qua
                        $uploadedPath = Storage::url(str_replace('public/', '', $path));
                        return response()->json([
                            'status' => 200,
                            'url' => $uploadedPath,
                            'fileName' => $fileName
                        ]);
                    }
                } catch (Exception $ex) {
                    $imageUploadErr = $ex->getMessage();
                }
                if (!empty($imageUploadErr)) {
                    abort(422, $imageUploadErr);
                }

                return response()->json([
                    'status' => 200,
                    'resultUpload' => $uploadedPaths
                ]);
                // $file = $request->file('file');
                // $path = $file->store('uploads', 'public'); // Lưu file vào storage/app/public/uploads
                // return response()->json(['url' => asset('storage/' . $path), 'path' => $path]);
            }
            abort(400, 'No file uploaded');
        } catch (HttpException $ex) {
            return response()->json(['status' => $ex->getStatusCode(), 'error' => $ex->getMessage()]);
        }
    }
    // public function listFiles()
    // {
    //     $files = Storage::disk('public')->files('uploads'); // Lấy tất cả file trong thư mục uploads
    //     $fileUrls = array_map(fn($file) => asset('storage/' . $file), $files);
    //     return response()->json($fileUrls);
    // }
    // public function deleteFile(Request $request)
    // {
    //     $path = $request->input('path');
    //     if (Storage::disk('public')->exists($path)) {
    //         Storage::disk('public')->delete($path);
    //         return response()->json(['success' => true]);
    //     }
    //     return response()->json(['error' => 'File not found'], 404);
    // }
}
