import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { CompanyAdminDashboardComponent } from './dashboards/company-admin-dashboard/company-admin-dashboard';
import { CompanyOverviewComponent } from './dashboards/company-admin-dashboard/overview/overview';
import { CompanyCommunitiesComponent } from './dashboards/company-admin-dashboard/communities/communities';
import { CompanyReportsComponent } from './dashboards/company-admin-dashboard/reports/reports';
import { CommunityAdminDashboardComponent } from './dashboards/community-admin-dashboard/community-admin-dashboard';
import { ResidentDashboardComponent } from './dashboards/resident-dashboard/resident-dashboard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/company-admin', component: CompanyAdminDashboardComponent, children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: CompanyOverviewComponent },
    { path: 'communities', component: CompanyCommunitiesComponent },
    { path: 'reports', component: CompanyReportsComponent }
  ] },
  { path: 'dashboard/community-admin', component: CommunityAdminDashboardComponent },
  { path: 'dashboard/resident', component: ResidentDashboardComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
