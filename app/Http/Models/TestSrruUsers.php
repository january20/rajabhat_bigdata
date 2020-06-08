<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class TestSrruUsers extends Model
{
    protected $table = 'test_srru_users';
    protected $fillable = [
        'id',
        'sys_user_id',
        'mas_project_id',
        'ref_sys_user_status_id',
        'ref_sys_user_role_id',
        'created_at',
        'updated_at'
    ];
}
