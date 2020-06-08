<?php

namespace App\Http\Controllers\Api\Info;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\MasTacnapThaiQM;
use App\Http\Models\Ref\RefVillages;
use App\Http\Models\MasTacnapFamilies;
use App\Http\Models\Ref\RefThaiQmEffects;
use App\Http\Models\Ref\RefThaiQmNeeds;

use Carbon\Carbon;
 
class ThaiQMController extends Controller
{
    public function p1(Request $request) {


        $updated_at = "ข้อมูล ณ วันที่ 26 พ.ค. 2563 9.50 น.";

        $total_data = MasTacnapThaiQM::selectRaw('id')->count();


        $tcode = MasTacnapThaiQM::selectRaw('tcode, count(tcode) as count')->groupBy('tcode')->get();
        $total_tcode = count($tcode);

        $acode = MasTacnapThaiQM::selectRaw('acode, count(acode) as count')->groupBy('acode')->get();
        $total_acode = count($acode);

        $mcode = MasTacnapThaiQM::selectRaw('mcode, count(mcode) as count')->groupBy('mcode')->get();
        $total_mcode = count($mcode);

        $gender = MasTacnapThaiQM::whereNotNull('sex')->selectRaw('sex, count(sex) as count')->groupBy('sex')->get();

        $total_family = MasTacnapFamilies::where('data_source_id',4)->count();

        $income_day = round(MasTacnapThaiQM::whereNotNull('income_day')->selectRaw('avg(income_day) avg_income_day')->first()->avg_income_day);
        // $income_day = MasTacnapThaiQM::selectRaw('income_day')->groupBy('mcode')->get();

        // $total_mno = MasTacnapThaiQM::selectRaw('mno')->groupBy('mno')->count();
       // $total_tcode = MasTacnapThaiQM::selectRaw('tcode, count(tcode) as count')->groupBy('tcode')->get();
        // $total_acode = MasTacnapThaiQM::selectRaw('acode, count(acode) as count')->groupBy('acode')->count();
        $male = $gender->where('sex','male')->first()->count;
        $female = $gender->where('sex','female')->first()->count;


        return response()->json(compact(
            'updated_at',
            'total_data',
            'total_acode',
            'total_tcode',
            'total_mcode',
            'income_day',
            'total_family',
            'female',
            'male'
            // 'total_tcode',
            // 'total_acode'
        ));
    }

    public function p2(){
        $effects = RefThaiQmEffects::get(['id','effect']);// = MasTacnapThaiQM::with('village')->selectRaw('mcode, count(mcode) as count')->groupBy('mcode')->get();
        
        foreach($effects as $effect){
            $effect->count = MasTacnapThaiQM::where('effect',$effect->id)->count();
        }
        return response()->json(compact(
            'effects'
        ));
    }

    public function p3(){
        $needs = RefThaiQmNeeds::get(['id','need']);// = MasTacnapThaiQM::with('village')->selectRaw('mcode, count(mcode) as count')->groupBy('mcode')->get();
        
        foreach($needs as $need){
            $need->count = MasTacnapThaiQM::where('chk11',$need->id)->count();
        }
        return response()->json(compact(
            'needs'
        ));
    }

    public function p4(){
        $drops = MasTacnapThaiQM::with('village')->with('sub_district')->with('district')
                ->selectRaw('round(avg(income_day)) as income_day, round(avg(income_month)) as income_month, mcode, tcode, acode')
                ->groupBy('mcode')
                ->limit(50)
                ->get();
                // = MasTacnapThaiQM::with('village')->selectRaw('mcode, count(mcode) as count')->groupBy('mcode')->get();
        
        // foreach($drops as $drop){
        //     $effects = MasTacnapThaiQM::where('mcode',$drop->mcode)->groupBy('effect')->get(['effect']);
        //     $drop->effects = $effects;
        //     //$need->count = MasTacnapThaiQM::where('chk11',$need->id)->count();
        // }

        return response()->json( $drops );
    }

    public function villages(){
        $mcode = MasTacnapThaiQM::with('village')->selectRaw('mcode, count(mcode) as count')->groupBy('mcode')->get();
        return response()->json(compact(
            'mcode'
        ));

    }


}
