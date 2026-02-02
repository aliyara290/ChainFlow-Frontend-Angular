import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, Plus, Edit, Trash2, Package, AlertCircle, Search } from 'lucide-angular';
import { Material } from '../../models/material.models';
import { MaterialsService } from '../../services/materials.service';
import { SuppliersService } from '../../../suppliers/services/suppliers.service';
import { Supplier } from '../../../suppliers/models/supplier.models';
import { MaterialFormComponent } from '../material-form/material-form.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-material-list',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, MaterialFormComponent, ConfirmDialogComponent],
    templateUrl: './material-list.component.html',
    styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit, OnDestroy {
    materials: Material[] = [];
    suppliers: Supplier[] = [];
    loading: boolean = false;
    error: string | null = null;

    // Form state
    showForm: boolean = false;
    selectedMaterial: Material | null = null;
    isEditMode: boolean = false;

    // Delete confirmation
    showDeleteDialog: boolean = false;
    materialToDelete: Material | null = null;

    // Icons
    protected readonly Plus = Plus;
    protected readonly Edit = Edit;
    protected readonly Trash2 = Trash2;
    protected readonly Package = Package;
    protected readonly AlertCircle = AlertCircle;
    protected readonly Search = Search;

    private destroy$ = new Subject<void>();

    constructor(
        private materialsService: MaterialsService,
        private suppliersService: SuppliersService
    ) { }

    ngOnInit(): void {
        this.loadMaterials();
        this.loadSuppliers();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadMaterials(): void {
        this.loading = true;
        this.materialsService.getMaterials()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (materials) => {
                    this.materials = materials;
                    this.loading = false;
                },
                error: (error) => {
                    this.error = error.message;
                    this.loading = false;
                }
            });
    }

    loadSuppliers(): void {
        this.suppliersService.getSuppliers()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (suppliers) => {
                    this.suppliers = suppliers;
                },
                error: (error) => {
                    console.error('Failed to load suppliers:', error);
                }
            });
    }

    getSupplierName(supplierId: string): string {
        const supplier = this.suppliers.find(s => s.id === supplierId);
        return supplier ? `${supplier.firstName} ${supplier.lastName}` : 'Unknown';
    }

    isLowStock(material: Material): boolean {
        return material.stock < material.stockMin;
    }

    openCreateForm(): void {
        this.selectedMaterial = null;
        this.isEditMode = false;
        this.showForm = true;
    }

    openEditForm(material: Material): void {
        this.selectedMaterial = material;
        this.isEditMode = true;
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.selectedMaterial = null;
        this.isEditMode = false;
    }

    onFormSave(): void {
        this.closeForm();
        this.loadMaterials();
    }

    confirmDelete(material: Material): void {
        this.materialToDelete = material;
        this.showDeleteDialog = true;
    }

    cancelDelete(): void {
        this.showDeleteDialog = false;
        this.materialToDelete = null;
    }

    deleteMaterial(): void {
        if (!this.materialToDelete) return;

        this.materialsService.deleteMaterial(this.materialToDelete.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.materials = this.materials.filter(m => m.id !== this.materialToDelete!.id);
                    this.cancelDelete();
                },
                error: (error) => {
                    console.error('Failed to delete material:', error);
                    this.error = error.message;
                    this.cancelDelete();
                }
            });
    }

    retry(): void {
        this.error = null;
        this.loadMaterials();
    }
}
