import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error401Component } from './views/errors/error401/error401.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [

  { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'homes', loadChildren: () => import('./views/homes/homes.module').then(m => m.HomesModule) }, //NewLadning
  { path: 'welfares', loadChildren: () => import('./views/welfares/welfares.module').then(m => m.WelfaresModule) }, 
  { path: 'weathers', loadChildren: () => import('./views/weathers/weathers.module').then(m => m.WeathersModule) }, 
  { path: 'human', loadChildren: () => import('./views/human/human.module').then(m => m.HumanModule) }, 
  { path: 'religious', loadChildren: () => import('./views/religious/religious.module').then(m => m.ReligiousModule) }, 

  { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
  // { path: 'projects', loadChildren: () => import('./views/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'bio', loadChildren: () => import('./views/bio/bio.module').then(m => m.BioModule) },
  { path: 'economics', loadChildren: () => import('./views/economics/economics.module').then(m => m.EconomicsModule) },
  { path: 'experts', loadChildren: () => import('./views/experts/experts.module').then(m => m.ExpertsModule) },
  { path: 'families', loadChildren: () => import('./views/families/families.module').then(m => m.FamiliesModule) },
  { path: 'otop', loadChildren: () => import('./views/otop/otop.module').then(m => m.OtopModule) },
  { path: 'download', loadChildren: () => import('./views/download/download.module').then(m => m.DownloadModule) },
  // { path: 'media', loadChildren: () => import('./views/media/media.module').then(m => m.MediaModule) },
  { path: 'info', loadChildren: () => import('./views/info/info.module').then(m => m.InfoModule) },
  { path: 'schools', loadChildren: () => import('./views/schools/schools.module').then(m => m.SchoolsModule) },
  // { path: 'kpi', loadChildren: () => import('./views/kpi/kpi.module').then(m => m.KpiModule) },
  { path: 'developers', loadChildren: () => import('./views/developers/developers.module').then(m => m.DevelopersModule) },
  { path: 'iot', loadChildren: () => import('./views/iot/iot.module').then(m => m.IotModule) },
  { path: '401', component: Error401Component },
  {
    path: '',
    redirectTo: '/homes',
    pathMatch: 'full'
  }
  // {
  //   path: '**',
  //   component: xx
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true , onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
