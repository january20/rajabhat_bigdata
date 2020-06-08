<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class TrnMqttIotName extends Model
{
  protected $table = 'trn_mqttiot_name';

  public function iot_type() {
    return $this->hasOne('\App\Http\Models\Ref\RefIotTypes', 'id', 'ref_iot_type_id');
  }
  public function device() {
    return $this->hasOne('\App\Http\Models\MasIotDevices', 'id', 'mas_iot_device_id');
  }
  public function data() {
    return $this->hasMany('\App\Http\Models\TrnIotData', 'mas_iot_device_id', 'mas_iot_device_id')->limit(10);
  }
}
