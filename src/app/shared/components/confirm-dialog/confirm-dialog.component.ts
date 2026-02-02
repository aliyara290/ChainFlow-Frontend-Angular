import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertTriangle, X } from 'lucide-angular';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    @Input() title: string = 'Confirm Action';
    @Input() message: string = 'Are you sure you want to proceed?';
    @Input() confirmText: string = 'Confirm';
    @Input() cancelText: string = 'Cancel';
    @Input() isOpen: boolean = false;
    @Input() isDanger: boolean = false;

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    protected readonly AlertTriangle = AlertTriangle;
    protected readonly X = X;

    onConfirm(): void {
        this.confirm.emit();
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onBackdropClick(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.onCancel();
        }
    }
}
