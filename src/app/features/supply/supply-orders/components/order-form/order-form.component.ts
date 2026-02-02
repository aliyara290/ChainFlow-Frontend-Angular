import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, X, Save, Plus, Trash2 } from 'lucide-angular';
import { Order, OrderRequest, OrderMaterialRequest } from '../../models/order.models';
import { Supplier } from '../../../suppliers/models/supplier.models';
import { Material } from '../../../raw-materials/models/material.models';
import { OrdersService } from '../../services/orders.service';
import { MaterialsService } from '../../../raw-materials/services/materials.service';

@Component({
    selector: 'app-order-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
    @Input() order: Order | null = null;
    @Input() isEditMode: boolean = false;
    @Input() suppliers: Supplier[] = [];

    @Output() save = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    orderForm!: FormGroup;
    materials: Material[] = [];
    loading: boolean = false;
    error: string | null = null;

    protected readonly X = X;
    protected readonly Save = Save;
    protected readonly Plus = Plus;
    protected readonly Trash2 = Trash2;

    constructor(
        private fb: FormBuilder,
        private ordersService: OrdersService,
        private materialsService: MaterialsService
    ) { }

    ngOnInit(): void {
        this.loadMaterials();
        this.initForm();
    }

    loadMaterials(): void {
        this.materialsService.getMaterials().subscribe({
            next: (materials) => {
                this.materials = materials;
            },
            error: (error) => {
                console.error('Failed to load materials:', error);
            }
        });
    }

    initForm(): void {
        this.orderForm = this.fb.group({
            supplierId: [this.order?.supplierId || '', [Validators.required]],
            materials: this.fb.array([])
        });

        // If editing, populate materials
        if (this.isEditMode && this.order) {
            this.order.orderMaterials.forEach(material => {
                this.addMaterial(material.materialId, material.quantity);
            });
        } else {
            // Add one empty material row for new orders
            this.addMaterial();
        }
    }

    get materialsFormArray(): FormArray {
        return this.orderForm.get('materials') as FormArray;
    }

    addMaterial(materialId: string = '', quantity: number = 1): void {
        const materialGroup = this.fb.group({
            materialId: [materialId, [Validators.required]],
            quantity: [quantity, [Validators.required, Validators.min(1)]]
        });

        this.materialsFormArray.push(materialGroup);
    }

    removeMaterial(index: number): void {
        this.materialsFormArray.removeAt(index);
    }

    onSubmit(): void {
        if (this.orderForm.invalid) {
            this.orderForm.markAllAsTouched();
            return;
        }

        // Check if at least one material is added
        if (this.materialsFormArray.length === 0) {
            this.error = 'Please add at least one material to the order';
            return;
        }

        this.loading = true;
        this.error = null;

        const orderData: OrderRequest = {
            supplierId: this.orderForm.value.supplierId,
            materials: this.orderForm.value.materials
        };

        const operation = this.isEditMode && this.order
            ? this.ordersService.updateOrder(this.order.id, orderData)
            : this.ordersService.createOrder(orderData);

        operation.subscribe({
            next: () => {
                this.loading = false;
                this.save.emit();
            },
            error: (error) => {
                this.loading = false;
                this.error = error.message || 'Failed to save order';
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

    getFieldError(fieldName: string, index?: number): string {
        let field;
        if (index !== undefined) {
            field = this.materialsFormArray.at(index).get(fieldName);
        } else {
            field = this.orderForm.get(fieldName);
        }

        if (field?.hasError('required')) return 'This field is required';
        if (field?.hasError('min')) return 'Quantity must be at least 1';
        return '';
    }

    isFieldInvalid(fieldName: string, index?: number): boolean {
        let field;
        if (index !== undefined) {
            field = this.materialsFormArray.at(index).get(fieldName);
        } else {
            field = this.orderForm.get(fieldName);
        }
        return !!(field && field.invalid && field.touched);
    }

    getMaterialName(materialId: string): string {
        const material = this.materials.find(m => m.id === materialId);
        return material ? material.name : '';
    }
}
