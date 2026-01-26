import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, X, Save } from 'lucide-angular';
import { Material, MaterialRequest } from '../../models/material.models';
import { Supplier } from '../../../suppliers/models/supplier.models';
import { MaterialsService } from '../../services/materials.service';

@Component({
    selector: 'app-material-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
    templateUrl: './material-form.component.html',
    styleUrls: ['./material-form.component.scss']
})
export class MaterialFormComponent implements OnInit {
    @Input() material: Material | null = null;
    @Input() isEditMode: boolean = false;
    @Input() suppliers: Supplier[] = [];

    @Output() save = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    materialForm!: FormGroup;
    loading: boolean = false;
    error: string | null = null;

    protected readonly X = X;
    protected readonly Save = Save;

    constructor(
        private fb: FormBuilder,
        private materialsService: MaterialsService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.materialForm = this.fb.group({
            name: [this.material?.name || '', [Validators.required, Validators.minLength(2)]],
            stock: [this.material?.stock || 0, [Validators.required, Validators.min(0)]],
            stockMin: [this.material?.stockMin || 0, [Validators.required, Validators.min(0)]],
            unit: [this.material?.unit || '', [Validators.required]],
            supplierId: [this.material?.supplierId || '', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.materialForm.invalid) {
            this.materialForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.error = null;

        const materialData: MaterialRequest = this.materialForm.value;

        const operation = this.isEditMode && this.material
            ? this.materialsService.updateMaterial(this.material.id, materialData)
            : this.materialsService.createMaterial(materialData);

        operation.subscribe({
            next: () => {
                this.loading = false;
                this.save.emit();
            },
            error: (error) => {
                this.loading = false;
                this.error = error.message || 'Failed to save material';
            }
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }

    onBackdropClick(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.onCancel();
        }
    }

    getFieldError(fieldName: string): string {
        const field = this.materialForm.get(fieldName);
        if (field?.hasError('required')) return 'This field is required';
        if (field?.hasError('minLength')) return 'Minimum length is 2 characters';
        if (field?.hasError('min')) return 'Value must be 0 or greater';
        return '';
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.materialForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }
}
