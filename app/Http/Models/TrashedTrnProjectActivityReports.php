<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TrashedTrnProjectActivityReports extends Model
{
  use SoftDeletes;
  protected $table = 'trashed_trn_project_activity_reports';
  protected $fillable = [
    'trn_project_activity_report_id',
    'images_path',
    'files_path'
  ];
    //
}
