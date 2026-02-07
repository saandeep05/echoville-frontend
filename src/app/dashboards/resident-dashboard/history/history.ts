import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  template: `<h2>History</h2><p>Your activity history will be shown here.</p>`,
  standalone: true,
  imports: [CommonModule]
})
export class HistoryComponent {}
