import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../services/company.service';
import { Resident } from '../../../models/resident.model';

@Component({
  selector: 'app-community-residents',
  templateUrl: './residents.html',
  styleUrls: ['./residents.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CommunityResidentsComponent implements OnInit {
  @Input() communityId!: number;
  residents = signal<Resident[]>([]);
  loading = signal(false);

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
      this.fetchResidents();
    }
  }

  fetchResidents() {
    this.loading.update(() => true);
    this.companyService.getResidentsForCommunity(this.communityId).subscribe(res => {
      this.residents.update(() => res);
      this.loading.update(() => false);
    });
  }
}
