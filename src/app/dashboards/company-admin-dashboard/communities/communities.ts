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

  newCommunity = { name: '', description: '' };
  newAdmin: { name: string; email: string; communityId: number | null } = { name: '', email: '', communityId: null };

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
    if (!this.newCommunity.name) return;
    // Optimistically add to UI; real backend wiring would POST here
    const id = Date.now();
    this.communities.push({ id, name: this.newCommunity.name, description: this.newCommunity.description });
    this.newCommunity = { name: '', description: '' };
    this.activeForm = 'none';
  }

  createAdmin() {
    if (!this.newAdmin.name || !this.newAdmin.email || !this.newAdmin.communityId) return;
    const id = Date.now();
    this.admins.push({ id, name: this.newAdmin.name, email: this.newAdmin.email, communityId: this.newAdmin.communityId });
    this.newAdmin = { name: '', email: '', communityId: null };
    this.activeForm = 'none';
  }

  getAdminsForCommunity(cid:number) { return this.admins.filter(a => a.communityId === cid); }
}
