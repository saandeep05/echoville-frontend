import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SidebarItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-community-admin-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CommunityAdminSidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() baseRoute = '';

  buildLink(item: SidebarItem) {
    if (item.route.startsWith('/')) return item.route;
    const base = this.baseRoute?.replace(/\/$/, '');
    const route = item.route?.replace(/^\//, '');
    return `${base}/${route}`;
  }
}
