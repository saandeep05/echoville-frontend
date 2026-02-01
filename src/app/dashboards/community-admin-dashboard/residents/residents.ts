import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../services/company.service';
import { Resident } from '../../../models/resident.model';
import { House } from '../../../models/house.model';

@Component({
  selector: 'app-community-residents',
  templateUrl: './residents.html',
  styleUrls: ['./residents.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule]
})
export class CommunityResidentsComponent implements OnInit {
  @Input() communityId!: number;
  residents = signal<Resident[]>([]);
  loading = signal(false);
  showForm = signal(false);
  creating = signal(false);
  error: string | null = null;
  newResident = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  };

  houses: House[] = [];
  assigningHouse: { [userId: number]: boolean } = {};

  constructor(private companyService: CompanyService) {}


  ngOnInit() {
    // Always get communityId from user object if not provided
    if (!this.communityId) {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          const parsed = JSON.parse(user);
          this.communityId = parsed?.userDTO?.communityId;
        }
      } catch {}
    }
    if (this.communityId) {
      this.fetchResidentsAndHouses();
    }
  }

  fetchResidentsAndHouses() {
    this.loading.set(true);
    this.companyService.getResidentsForCommunity(this.communityId).subscribe(res => {
      this.residents.set(res);
      this.companyService.getHousesForCommunity(this.communityId).subscribe(houses => {
        this.houses = houses || [];
        this.loading.set(false);
      }, () => {
        this.houses = [];
        this.loading.set(false);
      });
    }, () => {
      this.residents.set([]);
      this.houses = [];
      this.loading.set(false);
    });
  }


  // fetchResidents() removed; use fetchResidentsAndHouses instead

  fetchHouses() {
    this.companyService.getHousesForCommunity(this.communityId).subscribe(houses => {
      this.houses = houses || [];
    });
  }

  assignHouse(userId: number, houseId: number) {
    if (!houseId) return;
    this.assigningHouse[userId] = true;
    this.companyService.assignHouseToResident(userId, +houseId, this.communityId).subscribe({
      next: () => {
        this.assigningHouse[userId] = false;
        this.fetchResidentsAndHouses();
      },
      error: () => {
        this.assigningHouse[userId] = false;
        this.error = 'Failed to assign house.';
      }
    });
  }

  openResidentForm() {
    this.showForm.set(true);
    this.error = null;
    this.newResident = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: ''
    };
  }

  cancelForm() {
    this.showForm.set(false);
    this.error = null;
  }

  createResident() {
    this.creating.set(true);
    this.error = null;
    this.companyService.createResident(this.communityId, this.newResident).subscribe({
      next: (res) => {
        this.creating.set(false);
        this.showForm.set(false);
        this.fetchResidentsAndHouses();
      },
      error: (err) => {
        this.creating.set(false);
        this.error = 'Failed to create resident.';
      }
    });
  }
}
