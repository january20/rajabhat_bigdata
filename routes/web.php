<?php

 Route::get('/', function() {

  //View::addExtension('html', 'php');
  //return View::make('index');
  //return "X";

  return redirect("newsite/#/home");
 });

//ชั่วคราว
// Route::get('/', function () {
//     return view('index');
// });

Auth::routes();



// Route::resource('/test', 'Web\Projects\TestProjectsController');

// Route::get('/', 'Web\ProjectsController@index');
Route::get('/phpinfo', function() {
  phpinfo();
});
// Route::get('/', 'Web\VillagesController@index');
Route::get('/debug', 'DebugController@debug');
Route::prefix('projects')->group(function() {
  Route::get('pdf/test', 'Web\PDFController@test_pdf');
  Route::get('pdf/{id}', 'Web\PDFController@project_pdf');
  Route::get('pdftest/{id}', 'Web\PdfDetailController@project_pdf'); //พี่เชนเทส
  Route::get('pdf_html/{id}', 'Web\PDFController@pdf_html'); //HTML Page
  // Route::resource('/assessment', 'Web\Projects\ProjectAssessmentController');
  // Route::get('/', 'Web\ProjectsController@index');
  // Route::get('/files/{name}', 'Web\ProjectsController@file');
  // Route::get('/{project_id}', 'Web\ProjectsController@show');
  // Route::get('/{project_id}/assessment', 'Web\Projects\ProjectAssessmentController@create');
  // Route::post('/assessment', 'Web\Projects\ProjectAssessmentController@store');
});



Route::group(['prefix' => 'admin','middleware' => ['auth:admin']], function() {


      Route::resource('/media', 'MediaUserController');
      Route::get('/media/create', 'MediaUserController@create');
      Route::get('/media/edit', 'MediaUserController@edit');
      Route::get('/media/update', 'MediaUserController@update');
      Route::get('/media/delete', 'MediaUserController@delete');

      Route::resource('/profile', 'Web\Users\UserAdminController');


});


Route::group(['prefix' => 'user', 'middleware' => ['auth']], function() {



    ///// surin.srru.ac.th/user/projects
      Route::resource('/projects', 'Web\Projects\ProjectsController');
      Route::get('/projects/activities/files/{folder}/{name}', 'Web\Projects\ProjectActivityReportsController@files');
      Route::resource('/projects/activities', 'Web\Projects\ProjectActivityReportsController');
    ///// end

    ///// surin.srru.ac.th/user/data-management
      Route::prefix('data-management')->group(function() {
        Route::resource('/experts', 'Web\Experts\ExpertsController');

        Route::patch('/families/multiple_update', 'Web\Families\FamiliesController@updateByMultipleData');
        Route::resource('/families', 'Web\Families\FamiliesController');
        Route::resource('/families/health', 'Web\Families\FamilyHealthController');
        Route::resource('/family_members', 'Web\Families\FamilyMembersController');

        Route::post('/otop/upload/{id}', 'Web\Otop\OtopController@upload');
        Route::resource('/otop', 'Web\Otop\OtopController');

        Route::prefix('bio')->group(function() {
        Route::get('/', 'Web\Bio\BioController@index');
        Route::get('/{id}', 'Web\Bio\BioController@show')->where('id', '[0-9]+');
        Route::get('/diversity', 'Web\Bio\DiversityController@index');
        Route::post('/diversity', 'Web\Bio\DiversityController@store');
        Route::post('/files', 'Web\Bio\DiversityController@files');
        Route::get('/plants', 'Web\Bio\PlantsController@index');
    });

    // Route::resource('/education', 'Web\Data\Population\PopulationEducationController');
    // Route::resource('/income', 'Web\Data\Population\PopulationIncomeController');
  });
  ///// end
});

Route::prefix('data')->group(function() {
  Route::prefix('population')->group(function() {
    Route::resource('/', 'Web\Population\PopulationController');
    Route::resource('/occupation', 'Web\Population\PopulationOccupationController');
    Route::resource('/education', 'Web\Population\PopulationEducationController');
    Route::resource('/income', 'Web\Population\PopulationIncomeController');
    Route::resource('/age', 'Web\Population\AgeController');
  });

  Route::resource('/nature', 'Web\Nature\NatureController');
  Route::resource('/agriculture', 'Web\Agriculture\AgricultureController');
  Route::resource('/health', 'Web\Health\HealthController');
  Route::resource('/air', 'Web\Env\AirController');
  Route::resource('/experts', 'Web\Experts\ExpertsController');
  Route::get('/experts/files/{folder}/{name}', 'Web\Experts\ExpertsController@files');
  Route::resource('/otop', 'Web\Otop\OtopController');

});

// Route::prefix('districts')->group(function() {
//   Route::get('/', 'Web\DistrictsController@index');
//   Route::get('/{id}', 'Web\DistrictsController@show');
// });

Route::prefix('sub_districts')->group(function() {
  Route::get('/', 'Web\SubDistructsController@index');
  Route::get('/{id}', 'Web\SubDistructsController@show');
});

Route::prefix('villages')->group(function() {
  Route::get('/', 'Web\Sys\VillagesController@index');
  Route::get('/{id}', 'Web\Sys\VillagesController@show');
});

Route::prefix('families')->group(function() {
  Route::get('/', 'Web\Sys\FamiliesController@index');
  Route::get('/{id}', 'Web\Sys\FamiliesController@show');
});

Route::prefix('bio')->group(function() {

  Route::get('/', 'Web\Bio\BioController@index');
  Route::get('/{id}', 'Web\Bio\BioController@show')->where('id', '[0-9]+');
  Route::get('/diversity', 'Web\Bio\DiversityController@index');
  Route::post('/diversity', 'Web\Bio\DiversityController@store');
  Route::post('/files', 'Web\Bio\DiversityController@files');
  Route::resource('/plants', 'Web\Bio\PlantsController');

});


// Route::resource('/projects', 'Web\ProjectsController');
Route::resource('/weathers', 'Web\WeatherController');
Route::resource('/incomes', 'Web\IncomesController');
Route::resource('/resources', 'Web\IncomesController');


Route::get('/pdfs/{id}', 'Web\PDFController@show');
Route::get('/files/{path}', 'Web\FilesController@show');
Route::get('projects/pdftest', 'Web\PdfDetailController@index'); //เชนเทสรายละเอียดในไฟล์ pdf

Route::resource('/profile', 'Web\Users\UserProfileController');
//Route::resource('/admin', 'Web\Users\UserAdminController');

Route::prefix('developers')->group(function () {
    Route::resource('/', 'Web\Developers\DeveloperController');
    Route::get('/docs', 'Web\Developers\DeveloperDocController@index');
    Route::get('/docs/apiv1.json', 'Web\Developers\DeveloperDocController@apiv1');
});

Route::group(['prefix' => 'oauth','middleware' => ['auth']], function() {
  Route::get('/authorize', 'Auth\OAuth2Controller@index');
});

// Route::get('/aboutus', function () {
//     return view('aboutus');
// });

Route::get('/ebmn_manual', function () {
    return view('ebmn_manual');
});

Route::get('/demo', function () {
    return view('demo');
});

Route::get('/landing', function () {
    return view('landing');
});


Route::get('/assessment_manual', function () {
    return view('assessment_manual');
});

// Route::get('/resource', function () {
//     return view('resource');
// });

Route::get('/index', 'SurinController@index');
// Route::get('/kpi', 'SurinController@kpi');
Route::get('/download', 'SurinController@download');

Route::resource('/submission', 'SubmissionController');

Route::get('/resource', 'ResourceController@index');

Route::get('/aboutus', 'AboutusController@index');

Route::get('/media', 'MediaController@index');
Route::get('/media/show', 'MediasController@index');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/homes', 'HomesController@index')->name('homes');

// Route::get('/admin', function () {
//     return view('admin.index');
// });

// for test
 // Route::resource('/admin/media', 'MediaUserController');
 //
 // Route::get('admin/media/create', 'MediaUserController@create');
 // Route::get('admin/media/edit', 'MediaUserController@edit');
 // Route::get('admin/media/destroy', 'MediaUserController@destroy');

Route::prefix('test')->group(function() {
  Route::resource('/projects', 'Test\Projects\TestProjectsController');
  Route::get('/projects/activities/files/{folder}/{name}', 'Test\Projects\TestProjectActivityReportsController@files');
  Route::resource('/projects/activities', 'Test\Projects\TestProjectActivityReportsController');
});
