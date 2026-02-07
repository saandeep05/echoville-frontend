
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CompanyService } from '../../../services/company.service';
import { Bill } from '../../../models/bill.model';

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.html',
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class MyBillsComponent implements OnInit {
  bills = signal<Bill[]>([]);

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    let userId: number | null = null;
    let communityId: number | undefined = undefined;
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        userId = userObj?.userDTO?.id;
        communityId = userObj?.userDTO?.communityId;
      } catch {}
    }
    if (userId) {
      this.companyService.getBillsForUser(userId, communityId).subscribe(
        bills => {
          this.bills.set(bills);
        },
        error => {
          console.error('Error fetching bills:', error);
        }
      );
    }
  }
}
