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
                //->limit(10)
                ->get();
                // = MasTacnapThaiQM::with('village')->selectRaw('mcode, count(mcode) as count')->groupBy('mcode')->get();
        
        // foreach($drops as $drop){
        //     $effects = MasTacnapThaiQM::where('mcode',$drop->mcode)->groupBy('effect')->get(['effect']);
        //     $drop->effects = $effects;
        //     //$need->count = MasTacnapThaiQM::where('chk11',$need->id)->count();
        // }

        return response()->json( $drops );
    }
    public function details(Request $request){

        $mcode = $request->get('mcode');
        if(!$mcode){
            return response()->json('....');
        }


        $village = RefVillages::with('sub_district')->with('district')->where('id',$mcode)->first();
        $data = MasTacnapThaiQM::with('effect')->where('mcode',$mcode)->get();


        $effect_summary = RefThaiQmEffects::get(['id','effect']);
        $effect_summary[0]->count = 0;
        $effect_summary[1]->count = 0;
        $effect_summary[2]->count = 0;
        $effect_summary[3]->count = 0;
        $effect_summary[4]->count = 0;


        $need_summary = RefThaiQmNeeds::orderBy('id')->get(['id','need']);
        $need_summary[0]->count = 0 ;
        $need_summary[1]->count = 0 ;
        $need_summary[2]->count = 0 ;
        $need_summary[3]->count = 0 ;
        $need_summary[4]->count = 0 ;
        $need_summary[5]->count = 0 ;
        $need_summary[6]->count = 0 ;
        $need_summary[7]->count = 0 ;
        $need_summary[8]->count = 0 ;
        $need_summary[9]->count = 0 ;
        $need_summary[10]->count = 0 ;
        $need_summary[11]->count = 0 ;
        $need_summary[12]->count = 0 ;
        $need_summary[13]->count = 0 ;
        $need_summary[14]->count = 0 ;

        $avg_income_day = round($data->avg('income_day'));
        $avg_income_month = round($data->avg('income_month'));
        $male = $data->where('sex','male')->count();
        $female = $data->where('sex','female')->count();
        foreach($data as $d){
            $needs = collect([]);


            $tmp = $effect_summary->where('id',$d->effect)->first();
            if($tmp)$tmp->count++;
            
            if($d->chk11){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk11)->first() );
                $need_summary[0]->count++ ;
            }
            if($d->chk12){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk12)->first() );
                $need_summary[1]->count++ ;
            }
            if($d->chk13){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk13)->first() );
                $need_summary[2]->count++ ;
            }
            if($d->chk14){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk14)->first() );
                $need_summary[3]->count++ ;
            }
            if($d->chk15){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk15)->first() );
                $need_summary[4]->count++ ;
            }
            if($d->chk16){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk16)->first() );
                $need_summary[5]->count++ ;
            }
            if($d->chk17){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk17)->first() );
                $need_summary[6]->count++ ;
            }
            if($d->chk18){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk18)->first() );
                $need_summary[7]->count++ ;
            }
            if($d->chk19){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk19)->first() );
                $need_summary[8]->count++ ;
            }
            if($d->chk20){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk20)->first() );
                $need_summary[9]->count++ ;
            }
            if($d->chk21){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk21)->first() );
                $need_summary[10]->count++ ;
            }
            if($d->chk22){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk22)->first() );
                $need_summary[11]->count++ ;
            }
            if($d->chk23){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk23)->first() );
                $need_summary[12]->count++ ;
            }
            if($d->chk24){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk24)->first() );
                $need_summary[3]->count++ ;
            }
            if($d->chk25){
                $needs->prepend( RefThaiQmNeeds::where('id', $d->chk25)->first() );
                $need_summary[14]->count++ ;
            }
            //$r = $needs->reverse();
            $d->needs = $needs;//->reverse()->toArray();//r->all();
        }
        // for($i = 11 ; $i<26 ; $i++){
        //     $chks->prepend($i);
        // }
        
        //$data->need_summary = $need_summary;

        return response()->json( compact('avg_income_day','avg_income_month','male','female','village','effect_summary','need_summary','data') );



    }

    public function villages(){
        $mcode = MasTacnapThaiQM::with('village')->selectRaw('mcode, count(mcode) as count')->groupBy('mcode')->get();
        return response()->json(compact(
            'mcode'
        ));

    }


}
