import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-company-admin-dashboard',
  templateUrl: './company-admin-dashboard.html',
  styleUrl: './company-admin-dashboard.css',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule, SidebarComponent]
})
export class CompanyAdminDashboardComponent implements OnInit {
  user: any;

  // Sidebar configuration (shared component) — specific to Company Admin
  sidebarItems = [
    { label: 'Dashboard', route: 'overview' },
    { label: 'Communities', route: 'communities' },
    { label: 'Reports', route: 'reports' }
  ];

  baseRoute = '/dashboard/company-admin';

  constructor(private router: Router) {
    this.user = null;
  }

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    // If token is not found, redirect to login
    if (!token || !userData) {
      this.router.navigate(['/login']);
      return;
    }

    // Parse and set user data
    try {
      this.user = JSON.parse(userData);
      const role = this.user?.userDTO?.role;
      
      // If user role doesn't match, redirect to their respective dashboard
      if (role !== 'COMPANY_ADMIN') {
        if (role === 'COMMUNITY_ADMIN') {
          this.router.navigate(['/dashboard/community-admin']);
        } else if (role === 'RESIDENT') {
          this.router.navigate(['/dashboard/resident']);
        } else {
          this.router.navigate(['/login']);
        }
        return;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
