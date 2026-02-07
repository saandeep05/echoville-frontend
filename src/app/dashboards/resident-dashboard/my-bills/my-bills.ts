import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bills',
  template: `<h2>My Bills</h2><p>Your bills will be listed here.</p>`,
  standalone: true,
  imports: [CommonModule]
})
export class MyBillsComponent {}
