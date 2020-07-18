<?php

namespace App\Http\Models;
// namespace App\Http\Models\Ref;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasIotDevices extends Model
{
  use SoftDeletes;
  protected $table = 'mas_iot_devices';

  public function mqtt_names() {
    return $this->hasMany('\App\Http\Models\TrnMqttIotName', 'mas_iot_device_id', 'id')
            ->whereNull('deleted_at');
  }
}
