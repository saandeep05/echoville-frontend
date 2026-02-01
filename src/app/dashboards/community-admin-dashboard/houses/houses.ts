
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../services/company.service';
import { House } from '../../../models/house.model';
import { CreateBillFormComponent } from './create-bill-form';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-community-houses',
  templateUrl: './houses.html',
  styleUrls: ['./houses.css'],
  standalone: true,
  imports: [CommonModule, CreateBillFormComponent, MatButtonModule]
})
export class CommunityHousesComponent implements OnInit {

  houses: House[] = [];
  loading = signal(true);
  error: string | null = null;

  showBillForm = signal(false);
  selectedHouse: House | null = null;
  billError: string | null = null;


  constructor(private companyService: CompanyService) {}


  ngOnInit() {
    this.loadHouses();
  }


  loadHouses() {
    this.loading.set(true);
    this.error = null;
    this.companyService.getHousesForCommunity().subscribe({
      next: (list) => {
        this.houses = list || [];
        this.loading.set(false);
      },
      error: () => {
        this.error = 'Failed to load houses.';
        this.loading.set(false);
      }
    });
  }

  openBillForm(house: House) {
    this.selectedHouse = house;
    this.showBillForm.set(true);
    this.billError = null;
  }

  closeBillForm() {
    this.showBillForm.set(false);
    this.selectedHouse = null;
    this.billError = null;
  }

  createBill(billData: any) {
    if (!this.selectedHouse) return;
    this.billError = null;
    this.companyService.createBill(billData).subscribe({
      next: (bill) => {
        if (bill) {
          this.closeBillForm();
          this.loadHouses();
        } else {
          this.billError = 'Failed to create bill.';
        }
      },
      error: () => {
        this.billError = 'Failed to create bill.';
      }
    });
  }
}
