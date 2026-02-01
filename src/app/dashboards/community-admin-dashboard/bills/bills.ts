import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../services/company.service';
import { Bill } from '../../../models/bill.model';

@Component({
  selector: 'app-community-bills',
  templateUrl: './bills.html',
  styleUrls: ['./bills.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CommunityBillsComponent implements OnInit {
  bills: Bill[] = [];
  loading = signal(true);
  error: string | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    let communityId: number | null = null;
    try {
      const user = localStorage.getItem('user');
      if (user) communityId = JSON.parse(user)?.userDTO?.communityId;
    } catch {}
    if (communityId) {
      this.fetchBills(communityId);
    } else {
      this.loading.set(false);
      this.error = 'Community ID not found.';
    }
  }

  fetchBills(communityId: number): void {
    this.loading.set(true);
    this.companyService.getBillsForCommunity(communityId).subscribe({
      next: (bills) => {
        this.bills = bills || [];
        this.loading.set(false);
      },
      error: () => {
        this.error = 'Failed to load bills.';
        this.loading.set(false);
      }
    });
  }
}
