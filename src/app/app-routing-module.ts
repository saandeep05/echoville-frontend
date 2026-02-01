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
import { CommunityAdminSidebarComponent } from './dashboards/community-admin-dashboard/sidebar/sidebar';
import { CommunityAdminDashboardSectionComponent } from './dashboards/community-admin-dashboard/dashboard/dashboard';
import { CommunityHousesComponent } from './dashboards/community-admin-dashboard/houses/houses';
import { CommunityResidentsComponent } from './dashboards/community-admin-dashboard/residents/residents';
import { CommunityBillsComponent } from './dashboards/community-admin-dashboard/bills/bills';

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
  { path: 'dashboard/community-admin', component: CommunityAdminDashboardComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: CommunityAdminDashboardSectionComponent },
    { path: 'houses', component: CommunityHousesComponent },
    { path: 'residents', component: CommunityResidentsComponent },
    { path: 'bills', component: CommunityBillsComponent }
  ] },
  { path: 'dashboard/resident', component: ResidentDashboardComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
