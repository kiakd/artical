<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;
    protected $table = "banners";
    protected $fillable = [
        "name",
        "image_file",
        "is_active",
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
