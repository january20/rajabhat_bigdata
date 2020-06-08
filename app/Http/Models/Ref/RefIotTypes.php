<?php

namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;

class RefIotTypes extends Model
{
  protected $table = 'ref_iot_types';

  public function mqtt_name() {
    return $this->hasMany('App\Http\Models\TrnMqttIotName', 'ref_iot_type_id', 'id');
  }
}
