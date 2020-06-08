<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class RefStaffRoles extends Model
{
    use SoftDeletes;
    protected $table = 'ref_staff_roles';
}
