import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CompanyService } from '../../../services/company.service';
import { Community } from '../../../models/community.model';

@Component({
  selector: 'app-company-communities',
  templateUrl: './communities.html',
  styleUrls: ['./communities.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule]
})
export class CompanyCommunitiesComponent implements OnInit {
  communities: Community[] = [];

  admins = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', communityId: 1 }
  ];

  // Track which form is shown in the right-hand panel: 'none' | 'community' | 'admin'
  activeForm: 'none' | 'community' | 'admin' = 'none';

  loading = signal(true);
  error: string | null = null;

  newCommunity = { name: '', location: '' };
  newAdmin: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    communityId: number | null;
  } = { username: '', email: '', password: '', firstName: '', lastName: '', phone: '', communityId: null };
  creating = signal(false);
  creatingAdmin = signal(false);

  constructor(private companyService: CompanyService) {}

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

  openCommunityForm() { this.activeForm = this.activeForm === 'community' ? 'none' : 'community'; }
  openAdminForm() { this.activeForm = this.activeForm === 'admin' ? 'none' : 'admin'; }
  cancelForm() { this.activeForm = 'none'; }

  createCommunity() {
    if (!this.newCommunity.name || !this.newCommunity.location) return;
    this.creating.set(true);
    this.companyService.createCommunity(this.newCommunity.name, this.newCommunity.location).subscribe({
      next: (created) => {
        this.newCommunity = { name: '', location: '' };
        this.activeForm = 'none';
        this.creating.set(false);
        this.loadCommunities(); // Always reload from backend after create
      },
      error: () => {
        this.creating.set(false);
        // Optionally show error
      }
    });
  }

  createAdmin() {
    if (!this.newAdmin.username || !this.newAdmin.email || !this.newAdmin.password || !this.newAdmin.firstName || !this.newAdmin.lastName || !this.newAdmin.phone || !this.newAdmin.communityId) return;
    this.creatingAdmin.set(true);
    this.companyService.createCommunityAdmin({
      ...this.newAdmin,
      communityId: this.newAdmin.communityId!
    }).subscribe({
      next: (created) => {
        this.newAdmin = { username: '', email: '', password: '', firstName: '', lastName: '', phone: '', communityId: null };
        this.activeForm = 'none';
        this.creatingAdmin.set(false);
        this.loadCommunities(); // Optionally reload communities if needed
      },
      error: () => {
        this.creatingAdmin.set(false);
        // Optionally show error
      }
    });
  }

  getAdminsForCommunity(cid:number) { return this.admins.filter(a => a.communityId === cid); }
}
