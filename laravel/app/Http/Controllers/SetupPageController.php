<?php

namespace App\Http\Controllers;

use App\Http\Resources\SetUpPageCollection;
use App\Http\Resources\SetUpPageResouce;
use App\Models\SetupPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SetupPageController extends Controller
{
    public function index()
    {
        return new SetUpPageCollection(SetupPage::all());
    }

    public function show($id)
    {
        $setupPage = SetupPage::findOrFail($id);
        return new SetUpPageResouce($setupPage);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            "title" => "required|max:255|string",
            "description" => "sometimes",
            "keywords" => "sometimes",
            "image_file"=> "sometimes",
        ]);
        if($request->buffer)
        {
            $icon = $this->uploadIcon($request, null);
            $validate['image_file'] = $icon['image_file'];
        }
        else
        {
            $validate['image_file'] = null;
        }
        $setupPage = SetupPage::create($validate);
        return new SetUpPageResouce($setupPage);
    }

    public function update(Request $request, $id)
    {

        $validate = $request->validate([
            "title" => "sometimes|required|max:255|string",
            "description" => "sometimes",
            "keywords" => "sometimes",
            "image_file"=> "sometimes",
        ]);
        $setupPage = SetupPage::findOrFail($id);
        if($request->buffer)
        {

            $icon = $this->uploadIcon($request, $setupPage->image_file);
            $validate['image_file'] = $icon['image_file'];

        }
        else
        {
            $validate['image_file'] = $setupPage->image_file;
        }
        $setupPage->update($validate);
        return new SetUpPageResouce($setupPage);
    }

    public function destroy(SetupPage $setupPage)
    {
        $setupPage->delete();
        return response()->noContent();
    }

    public function uploadIcon($datas, $pathFileImageBefore)
    {
        // buffer type and filename
        $buffer = $datas->buffer;
        $arrayBuffer = $buffer["data"];
        $filename = 'icon.png';
        // convert arraybuffer to string by implode
        // use  base64_encode
        $imageData = base64_encode(implode('', array_map(function($e){
            return pack("C*", $e);
        }, $arrayBuffer)));
        // map path
        $path = "uploads/icon/";
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
