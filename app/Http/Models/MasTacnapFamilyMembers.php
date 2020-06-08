<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasTacnapFamilyMembers extends Model
{
    use SoftDeletes;
    protected $table = 'mas_tcnap_family_members';

}
