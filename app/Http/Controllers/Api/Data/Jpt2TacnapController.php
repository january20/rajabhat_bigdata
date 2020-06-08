<?php

namespace App\Http\Controllers\Api\Data;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Http\Response;
use App\Http\Models\MasFamilies;
use App\Http\Models\MasTacnapFamilies;
use App\Http\Models\MasTacnapFamilyMembers;
use App\Http\Models\Ref\RefDistricts;

use App\Http\Models\Ref\RefSubDistricts;

class Jpt2TacnapController extends Controller
{
    //
    public function index(Request $request){
        $family = MasFamilies::with('family_income')
                  ->find( $request->get('id') );
        $subdistrict = RefSubDistricts::where('id',$family->sub_district_id)->first();
        $income = 0;
        if(!empty($family->family_income)){
            $family->income = $family->family_income[0]->yearly_income;
        }

//INSERT INTO `surin`.`mas_tcnap_families` (`data_source_id`, `survey_status_id`, `explanation_year_id`, `explanation_year`, `inquire_start_time`, `inquire_end_time`, `responder1`, `region_id`, `province_id`, `district_id`, `sub_district_id`, `yearlySalary`) VALUES ('2', '1', '1', '2563', 'TS', 'TS', 'Robot A', 'NE', '32', 'X', 'X', 'S');
        
        $id = MasTacnapFamilies::insertGetId([
            'data_source_id'       =>  2,
            'survey_status_id'     =>  1,
            'explanation_year_id'  =>  1,
            'explanation_year'     =>  2563,
            'inquire_start_time'   =>  $family->created_at,
            'inquire_end_time'     =>  $family->updated_at,
            'responder1'           =>  'Robot A01',
            'yearlySalary'         =>  $family->income,
            'yearlyTotalIncome'    =>  $family->income,
            'region_id'            =>  'NE',
            'province_id'          =>  32,
            'district_id'          =>  $subdistrict->district_id,
            'sub_district_id'      =>  $family->sub_district_id,
            'village_id'           =>  $family->mas_surin_village_id,
            'bann_no'              => $family->house_address
        ]);
 //INSERT INTO `surin`.`mas_tcnap_family_members` (`family_id`, `card_type_id`, `prefix_name_id`, `prefix_name`, `first_name`, `last_name`, `gender_id`, `nation_id`, `religion_id`) VALUES ('X', '1', 'X', 'X', 'X', 'X', 'X', '1', '1');
        $mem = MasTacnapFamilyMembers::insertGetId([
            'family_id'     =>  $id,
            'card_type_id'  =>  1, 
            'prefix_name_id' =>  $family->prefix_id, 
            'first_name'    =>  $family->firstname, 
            'last_name'     =>  $family->lastname, 
            'gender_id'     =>  $family->gender_id, 
            'nation_id'     =>  1, 
            'religion_id'   =>  1,
            'education_level_id' => $family->education_id,
            'age'           =>  $family->age,
            'occupation_id' =>  $family->occupation_id
        ]);
        return response()->json([
            'family' => $id,
            'member' => $mem,
            'msg'   => 'inserted...!'
        ]);

        // return response()->json(
        //     compact('subdistrict','family')
        // );

    }
}
