import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule) },
  { path: 'projects', loadChildren: () => import('./views/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'bio', loadChildren: () => import('./views/bio/bio.module').then(m => m.BioModule) },
  { path: 'experts', loadChildren: () => import('./views/experts/experts.module').then(m => m.ExpertsModule) },
  { path: 'families', loadChildren: () => import('./views/families/families.module').then(m => m.FamiliesModule) },
  { path: 'otop', loadChildren: () => import('./views/otop/otop.module').then(m => m.OtopModule) },
  { path: 'download', loadChildren: () => import('./views/download/download.module').then(m => m.DownloadModule) },
  { path: 'media', loadChildren: () => import('./views/media/media.module').then(m => m.MediaModule) },
  { path: 'info', loadChildren: () => import('./views/info/info.module').then(m => m.InfoModule) },
  { path: 'kpi', loadChildren: () => import('./views/kpi/kpi.module').then(m => m.KpiModule) },
  {
    path: '',
    redirectTo: '/home',
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
