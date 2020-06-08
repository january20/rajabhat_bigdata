<?php

namespace App\Http\Controllers\Api\Data\Families;
use Carbon\Carbon;
//use Intervention\Image\ImageManagerStatic as Image;
use App\Http\Controllers\BaseController;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Models\MasFamilies;
use App\Http\Models\MasFamilyMembers;
use App\Http\Models\Ref\RefOccupations;

class FamiliesController extends BaseController {

  public function index(Request $request){
    switch($request->get('t')){
      case 'count':
        return $this->count();
        break;
      case 'by_village':
        return $this->byVId($request);
        break;
      case 'count_by_village':
        return $this->countByVId($request);
        break;
      case 'get_population_by_occupation':
        return $this->getPopulationByOccupation($request);
        break;
      case 'occupations' :
        return $this->occupations($request);
        break;
      case 'members' :
        return $this->members($request);
        break;
      case 'filter' :
        return $this->filter($request);
        break;
      default:
        return $this->all();
        break;
    }
    // return response()->json( $villages );
  }

  public function show($id) {
    $family = MasFamilies::where('id', '=', $id)
      ->with('income')
      ->with('occupation')
      ->with('education')
      ->first();

    $members = MasFamilyMembers::where('mas_family_id', '=', $id)
      ->with('income')
      ->with('occupation')
      ->with('education')
      ->get();

    $family->family_members = $members;

    return response()->json($family);
  }

  function all() {
    $families = MasFamilies::limit(20)->get();

    return response()->json($families);
  }

  function count() {
    $count = MasFamilies::get()->count();

    return response()->json(['total_population' => $count]);
  }

  function byVId($request) {
    $families = MasFamilies::where('mas_surin_village_id', '=', $request->get('village_id'))->get();

    return response()->json($families);
  }

  function countByVId($request) {
    $count = MasFamilies::where('mas_surin_village_id', '=', $request->get('village_id'))->count();

    return response()->json(['total_population' => $count]);
  }

  function getPopulationByOccupation() {
    $occupations = RefOccupations::select('id', 'name_th')->get();

    foreach($occupations as $occupation) {
      $occupation->population = MasFamilies::where('occupation_id', '=', $occupation->id)->count();
    }

    return response()->json($occupations);
  }

  function members(Request $request) {
    $family = MasFamilies::where('id', '=', $request->get('id'))
      ->with('family_members')
      ->with('main_member_income')
      ->with('member_income')
      ->first();

    return response()->json($family);
  }

  function filter(Request $request) {

    // $families = MasFamilies::where('firstname', 'like', '%ดฟ%')
    //   ->get();
    $families = MasFamilies::where('firstname', 'like', '%'.$request->get('query').'%')
      ->orWhere('lastname', 'like', '%'.$request->get('query').'%')
      ->orWhere('house_address', 'like', $request->get('query').'%')
      ->with('family_members')
      ->with('family_owner_prefix')
      ->with('income')
      ->with('occupation')
      ->with('education')
      // ->join('ref_villages', 'ref_villages.id', '=', 'mas_families.mas_surin_village_id')
      ->join('ref_villages', 'ref_villages.id', '=' , \DB::raw("case when mas_families.mas_surin_village_id is null then concat(mas_families.sub_district_id, '01') else mas_families.mas_surin_village_id end"))
      ->join('ref_sub_districts', 'ref_sub_districts.id', '=', 'ref_villages.sub_district_id')
      ->join('ref_districts', 'ref_districts.id', '=', 'ref_sub_districts.district_id')
      ->select('mas_families.*',
        \DB::raw("case when mas_families.mas_surin_village_id is null then '' else ref_villages.village_name_th end as village_name"),
          'ref_sub_districts.sub_district_name_th as sub_district_name',
          'ref_districts.district_name_th as district_name'
      )
      ->limit(25)
      ->get();

    // dd('%'.$request->get('query').'%');

    return response()->json($families);
  }

  function occupations(Request $request) {

  }

  public function __construct(){
    parent::__construct();
  }
}
