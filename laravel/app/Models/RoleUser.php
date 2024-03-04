<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoleUser extends Model
{
    use HasFactory;

    protected $table = "role_users";
    protected $fillable = [
        "id_user",
        "role",
        "is_active",
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
