<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artical extends Model
{
    use HasFactory;
    protected $table = "articals";
    protected $fillable = [
        "title",
        "shot_description",
        "description",
        "image_file",
        "is_active",
    ];
}
