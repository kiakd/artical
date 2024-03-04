<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleUserCollection;
use App\Http\Resources\RoleUserResource;
use App\Models\RoleUser;
use Illuminate\Http\Request;

class RoleUserController extends Controller
{
    public function index()
    {
        return new RoleUserCollection(RoleUser::all());
    }

    public function show(RoleUser $rouleUser)
    {
        return new RoleUserResource($rouleUser);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            ""=> "",
        ]);

        $rouleUser = RoleUser::create($validate);
        return new RoleUserResource($rouleUser);
    }

    public function update(Request $request, RoleUser $rouleUser)
    {
        $validate = $request->validate([
            ""=> "",
        ]);
        $rouleUser->update($validate);
        return new RoleUserResource($rouleUser);
    }

    public function destroy(RoleUser $rouleUser)
    {
        $rouleUser->delete();
        return response()->noContent();
    }
}
