import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../services/company.service';
import { Community } from '../../../models/community.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './overview.html',
  styleUrls: ['./overview.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class CompanyOverviewComponent implements OnInit {
  communities: Community[] = [];
  loading = signal(true);
  error: string | null = null;

  constructor(private router: Router, private companyService: CompanyService) {}

  ngOnInit() {
    this.loadCommunities();
  }

  loadCommunities() {
    this.loading.set(true);
    this.error = null;
    this.companyService.getCommunities().subscribe({
      next: (list) => {
        this.communities = (list || []).map(c => ({
          ...c,
          description: c.description || c.location || ''
        }));
        this.loading.set(false);
      },
      error: (err) => {
        this.error = 'Failed to load communities.';
        this.loading.set(false);
      }
    });
  }

  get communityCount() { return this.communities.length; }
  get houseCount() {
    return this.communities.reduce((sum, c) => sum + (c.houses?.length || 0), 0);
  }

  goTo(route: string) {
    this.router.navigate(['/dashboard/company-admin', route]);
  }
}
