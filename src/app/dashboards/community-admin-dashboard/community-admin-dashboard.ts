import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community-admin-dashboard',
  templateUrl: './community-admin-dashboard.html',
  styleUrl: './community-admin-dashboard.css',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule]
})
export class CommunityAdminDashboardComponent implements OnInit {
  user: any;

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
      if (role !== 'COMMUNITY_ADMIN') {
        if (role === 'COMPANY_ADMIN') {
          this.router.navigate(['/dashboard/company-admin']);
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
