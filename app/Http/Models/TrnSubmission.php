<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TrnSubmission extends Model
{
  use SoftDeletes;
  protected $table = 'trn_submission';
  protected $fillable = [
    'prefix_id',
    'firstname',
    'lastname',
    'telephone',
    'note'
  ];

  public function prefix() {
    return $this->hasOne('\App\Http\Models\Ref\RefPrefix', 'id', 'prefix_id');
  }
}
