import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, Plus, Edit, Trash2, ShoppingCart, ChevronDown, ChevronUp, AlertCircle, Calendar } from 'lucide-angular';
import { Order } from '../../models/order.models';
import { OrdersService } from '../../services/orders.service';
import { SuppliersService } from '../../../suppliers/services/suppliers.service';
import { Supplier } from '../../../suppliers/models/supplier.models';
import { OrderFormComponent } from '../order-form/order-form.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, OrderFormComponent, ConfirmDialogComponent],
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    suppliers: Supplier[] = [];
    loading: boolean = false;
    error: string | null = null;
    expandedOrderIds: Set<string> = new Set();

    // Form state
    showForm: boolean = false;
    selectedOrder: Order | null = null;
    isEditMode: boolean = false;

    // Delete confirmation
    showDeleteDialog: boolean = false;
    orderToDelete: Order | null = null;

    // Icons
    protected readonly Plus = Plus;
    protected readonly Edit = Edit;
    protected readonly Trash2 = Trash2;
    protected readonly ShoppingCart = ShoppingCart;
    protected readonly ChevronDown = ChevronDown;
    protected readonly ChevronUp = ChevronUp;
    protected readonly AlertCircle = AlertCircle;
    protected readonly Calendar = Calendar;

    private destroy$ = new Subject<void>();

    constructor(
        private ordersService: OrdersService,
        private suppliersService: SuppliersService
    ) { }

    ngOnInit(): void {
        this.loadOrders();
        this.loadSuppliers();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    loadOrders(): void {
        this.loading = true;
        this.ordersService.getOrders()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (orders) => {
                    this.orders = orders;
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

    toggleExpand(orderId: string): void {
        if (this.expandedOrderIds.has(orderId)) {
            this.expandedOrderIds.delete(orderId);
        } else {
            this.expandedOrderIds.add(orderId);
        }
    }

    isExpanded(orderId: string): boolean {
        return this.expandedOrderIds.has(orderId);
    }

    getStatusClass(status: string): string {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('pending')) return 'status-pending';
        if (statusLower.includes('completed') || statusLower.includes('delivered')) return 'status-completed';
        if (statusLower.includes('processing') || statusLower.includes('progress')) return 'status-processing';
        if (statusLower.includes('cancelled')) return 'status-cancelled';
        return 'status-default';
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    openCreateForm(): void {
        this.selectedOrder = null;
        this.isEditMode = false;
        this.showForm = true;
    }

    openEditForm(order: Order): void {
        this.selectedOrder = order;
        this.isEditMode = true;
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.selectedOrder = null;
        this.isEditMode = false;
    }

    onFormSave(): void {
        this.closeForm();
        this.loadOrders();
    }

    confirmDelete(order: Order): void {
        this.orderToDelete = order;
        this.showDeleteDialog = true;
    }

    cancelDelete(): void {
        this.showDeleteDialog = false;
        this.orderToDelete = null;
    }

    deleteOrder(): void {
        if (!this.orderToDelete) return;

        this.ordersService.deleteOrder(this.orderToDelete.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.orders = this.orders.filter(o => o.id !== this.orderToDelete!.id);
                    this.cancelDelete();
                },
                error: (error) => {
                    console.error('Failed to delete order:', error);
                    this.error = error.message;
                    this.cancelDelete();
                }
            });
    }

    retry(): void {
        this.error = null;
        this.loadOrders();
    }
}
