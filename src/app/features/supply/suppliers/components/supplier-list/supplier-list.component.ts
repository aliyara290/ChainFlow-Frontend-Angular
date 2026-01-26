import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Supplier} from '../../models/supplier.models';
import {SuppliersService} from '../../services/suppliers.service';
import {CommonModule} from '@angular/common';
import {
  LucideAngularModule
} from 'lucide-angular';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {catchError, finalize, of, timeout} from 'rxjs';

@Component({
  selector: 'app-supplier-list',
  imports: [CommonModule, LucideAngularModule, TableModule,
    ButtonModule,
    InputTextModule],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css',
})

export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private supplierService: SuppliersService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.fetchSuppliers();
  }

  fetchSuppliers(): void {
    this.loading = true;
    this.error = null;

    this.supplierService.getSuppliers()
      .pipe(
        timeout(5000),
        catchError(err => {
          this.error =
            err.name === 'TimeoutError'
              ? 'Request timed out. Please try again.'
              : 'Failed to load suppliers.';

          return of([] as Supplier[]);
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(data => {
        console.log('Suppliers:', data);
        this.suppliers = data;
      });
  }

  viewSupplier(supplier: Supplier): void {
    console.log('View supplier:', supplier);
  }

  editSupplier(supplier: Supplier): void {
    console.log('Edit supplier:', supplier);
  }

  deleteSupplier(supplierId: string): void {
    if (!supplierId) return ;
    this.supplierService.deleteSupplier(supplierId).subscribe(
      {
        next: () => {
          this.suppliers = this.suppliers.filter(supplier => supplier.id !== supplierId);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to delete supplier:', err);
        }
      }
    )
  }
}
