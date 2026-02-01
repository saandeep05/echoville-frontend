import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-community-admin-dashboard-section',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class CommunityAdminDashboardSectionComponent implements OnInit {
  housesCount = signal(0);
  residentsCount = signal(0);
  pendingBillsCount = 0;
  loading = signal(true);
  error: string | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.fetchCounts();
  }

  fetchCounts() {
    this.loading.set(true);
    let communityId: number | null = null;
    try {
      const user = localStorage.getItem('user');
      if (user) communityId = JSON.parse(user)?.userDTO?.communityId;
    } catch {}
    if (!communityId) {
      this.error = 'Community ID not found.';
      this.loading.set(false);
      return;
    }
    this.companyService.getHousesForCommunity(communityId).subscribe(houses => {
      this.housesCount.set(houses.length);
      this.companyService.getResidentsForCommunity(communityId).subscribe(residents => {
        this.residentsCount.set(residents.length);
        this.loading.set(false);
      }, () => {
        this.error = 'Failed to load residents.';
        this.loading.set(false);
      });
    }, () => {
      this.error = 'Failed to load houses.';
      this.loading.set(false);
    });
  }
}
