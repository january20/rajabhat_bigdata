<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class MasTacnapThaiQM extends Model
{
    protected $table = 'mas_tcnap_thaiqm';

    public function village(){
        return $this->hasOne('\App\Http\Models\Ref\RefVillages', 'id', 'mcode');
    }
}
