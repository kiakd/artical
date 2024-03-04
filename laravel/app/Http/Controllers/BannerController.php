<?php

namespace App\Http\Controllers;

use App\Http\Resources\BannerCollection;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BannerController extends Controller
{
    public function index()
    {
        return new BannerCollection(Banner::all());
    }

    public function show(Banner $banner)
    {
        return new BannerResource($banner);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            "name"=> "required|max:255",
            "is_active"=> "sometimes",
            "image_file"=> "sometimes",
        ]);

        if ($request->buffer)
        {
            $dataImage = $this->uploadImage($request, null);
            $validate["image_file"] = $dataImage['image_file'];
        }
        else
        {
            $dataImage = null;
            $validate["image_file"] = null;
        }

        $banner = Banner::create($validate);
        return new BannerResource($banner);
    }

    public function update(Request $request, Banner $banner)
    {
        $validate = $request->validate([
            "name"=> "required|max:255",
            "is_active"=> "sometimes",
            "image_file"=> "sometimes",
        ]);
        if ($request->buffer)
        {
            $dataImage = $this->uploadImage($request, null);
            $validate["image_file"] = $dataImage['image_file'];
        }
        else
        {
            $validate["image_file"] = $banner->image_file;
        }
        $banner->update($validate);
        return new BannerResource($banner);
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();
        return response()->noContent();
    }

    public function getByIsActive()
    {
        $banner = Banner::where('is_active', true)->first();
        return new BannerResource($banner);
    }

    public function uploadImage($datas, $pathFileImageBefore)
    {
        // buffer type and filename
        $buffer = $datas->buffer;
        $arrayBuffer = $buffer["data"];
        $filename = 'image_' . time() . $datas->image_file;
        // convert arraybuffer to string by implode
        // use  base64_encode
        $imageData = base64_encode(implode('', array_map(function($e){
            return pack("C*", $e);
        }, $arrayBuffer)));
        // map path
        $path = "uploads/images/";
        if(File::exists($pathFileImageBefore) && $pathFileImageBefore)
            {
                File::delete($pathFileImageBefore);
            }
        // save image to directory public/uploads/images
        file_put_contents(public_path($path).$filename, base64_decode($imageData));
        $dataImage = ([
            'title'=> 'Artical'.$filename,
            'image_file'=> $path.$filename,
        ]);
        return $dataImage;
    }
}
