
import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CompanyService } from '../../../services/company.service';
import { House } from '../../../models/house.model';
import './my-home.css';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.html',
  standalone: true,
  imports: [CommonModule, MatCardModule]
})

export class MyHomeComponent implements OnInit {
  house = signal<House | null>(null);

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
      this.companyService.getHouseForUser(userId, communityId).subscribe(
        house => {
          console.log('House API result:', house); // Debug log
          this.house.set(house);
        },
        error => {
          console.error('Error fetching house:', error);
        }
      );
    }
  }
}
