<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'deadline_date',
        'deadline_time',
        'destination',
        'image_url',
        'status',
        'in_inbox',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
