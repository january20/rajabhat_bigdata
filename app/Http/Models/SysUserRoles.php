<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SysUserRoles extends Model
{
    use SoftDeletes;
    //php artisan make:model Http/Models/SysUserRoles
    protected $table = 'sys_user_roles';
    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at',
    ];
}
