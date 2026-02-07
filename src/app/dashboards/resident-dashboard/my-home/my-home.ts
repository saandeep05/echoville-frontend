import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-home',
  template: `<h2>My Home</h2><p>Details about your home will appear here.</p>`,
  standalone: true,
  imports: [CommonModule]
})
export class MyHomeComponent {}
