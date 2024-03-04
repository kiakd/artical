<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticalCollection;
use App\Http\Resources\ArticalResource;
use App\Models\Artical;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
class ArticalController extends Controller
{
    //
    public function index()
    {
        $data = Artical::orderBy('id');
        if(request()->has('search'))
        {
            // dd($data);
            $data = $data->where('title','like','%'. request()->search .'%');
        }
        return response()->json($data->paginate(6));
        // return new ArticalCollection(Artical::all());
    }

    public function show(Artical $artical)
    {
        return new ArticalResource($artical);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            "title"=> "required|max:255|string",
            "shot_description" => "sometimes",
            "description"=> "sometimes",
            "image_file"=> "sometimes|max:255",
        ]);

        if ($request->has("buffer"))
        {
            $articalImage = $this->uploadImage($request, null);
        }
        else
        {
            $articalImage = null;
        }
        $artical = Artical::create([
            "title"=> $request->title,
            "shot_description"=> $request->shot_description,
            "description"=> $request->description,
            "image_file"=> $articalImage['image_file'],
        ]);
        return new ArticalResource($artical);
    }

    public function update(Request $request, Artical $artical)
    {
        $validate = $request->validate([
            "title"=> "sometimes|required|max:255|string",
            "shot_description" => "sometimes",
            "description"=> "sometimes",
            "image_file"=> "sometimes|max:255",
        ]);
        // dd($request);
        if ($request->buffer)
        {
            $articalImage = $this->uploadImage($request, $artical->image_file);
            $validate['image_file'] = $articalImage['image_file'];
        }
        else
        {
            $validate['image_file'] = $artical->image_file;
        }
        // dd($validate);
        $artical->update($validate);
        return new ArticalResource($artical);
    }

    public function destroy(Artical $artical)
    {
        $artical->delete();
        return response()->noContent();
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
        $artical = ([
            'title'=> 'Artical'.$filename,
            'image_file'=> $path.$filename,
        ]);
        return $artical;
    }
}
