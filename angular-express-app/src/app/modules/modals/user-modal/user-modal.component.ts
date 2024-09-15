import { Component, EventEmitter, Output } from '@angular/core';
import { DeleteAccountHandler } from '../../../shared/handlers/delete-account-handler';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ConfirmationModalComponent
  ]
})
export class UserModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private deleteAccountHandler: DeleteAccountHandler) {}

  // Variable to track whether confirmation modal should be shown
  showConfirmation: boolean = false;

  closeUserModal() {
    this.close.emit();
  }

  // Show confirmation modal
  confirmDeleteAccount() {
    this.showConfirmation = true;
  }

  // Proceed with deletion logic
  onConfirmDelete() {
    this.deleteAccountHandler.handleDelete();
    this.closeUserModal();
  }

  // Close confirmation modal
  onCancelDelete() {
    this.showConfirmation = false;
  }
}