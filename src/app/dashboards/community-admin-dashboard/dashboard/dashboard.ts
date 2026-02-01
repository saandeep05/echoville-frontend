import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-community-admin-dashboard-section',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class CommunityAdminDashboardSectionComponent {
  housesCount = 0;
  residentsCount = 0;
  pendingBillsCount = 0;
}
