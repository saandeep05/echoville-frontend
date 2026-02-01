import { Bill, BillStatus } from '../../../models/bill.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-bill-form',
  templateUrl: './create-bill-form.html',
  styleUrls: ['./create-bill-form.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule]
})
export class CreateBillFormComponent {
  @Input() houseId!: number;
  @Input() communityId!: number;
  @Output() create = new EventEmitter<Partial<Bill>>();
  @Output() cancel = new EventEmitter<void>();

  bill: Partial<Bill> = {
    title: '',
    amount: 0,
    dueDate: '',
    description: '',
    status: BillStatus.UNPAID
  };

  creating = false;
  error: string | null = null;

  submit() {
    if (!this.bill.title || !this.bill.amount || !this.bill.dueDate) {
      this.error = 'Please fill all required fields.';
      return;
    }
    this.creating = true;
    this.error = null;
    // Convert dueDate to ISO string with time for backend compatibility
    let dueDate = this.bill.dueDate;
    if (dueDate && dueDate.length === 10) {
      dueDate = dueDate + 'T00:00:00';
    }
    this.create.emit({
      ...this.bill,
      dueDate,
      houseId: this.houseId,
      communityId: this.communityId
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
