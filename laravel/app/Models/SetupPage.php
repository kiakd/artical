<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SetupPage extends Model
{
    use HasFactory;

    protected $table = "setup_pages";
    protected $fillable = [
        "title", "description", "keywords", "image_file"
    ];
}
