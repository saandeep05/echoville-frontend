import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../services/company.service';
import { House } from '../../../models/house.model';

@Component({
  selector: 'app-community-houses',
  templateUrl: './houses.html',
  styleUrls: ['./houses.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CommunityHousesComponent implements OnInit {
  houses: House[] = [];
  loading = signal(true);
  error: string | null = null;

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
}
