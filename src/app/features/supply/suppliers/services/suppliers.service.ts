import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Supplier } from '../models/supplier.models';
import { catchError, tap, shareReplay, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private apiURL: string = environment.supplierServiceUrl;

  // State management with RxJS
  private suppliersSubject = new BehaviorSubject<Supplier[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Public observables
  public suppliers$ = this.suppliersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Get all suppliers
   */
  getSuppliers(): Observable<Supplier[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Supplier[]>(`${this.apiURL}/suppliers`).pipe(
      tap(suppliers => this.suppliersSubject.next(suppliers)),
      catchError(error => this.handleError('Failed to load suppliers', error)),
      finalize(() => this.loadingSubject.next(false)),
      shareReplay(1)
    );
  }

  /**
   * Get supplier by ID
   */
  getSupplierById(id: string): Observable<Supplier> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Supplier>(`${this.apiURL}/suppliers/${id}`).pipe(
      catchError(error => this.handleError('Failed to load supplier', error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * Create new supplier
   */
  createSupplier(supplier: Supplier): Observable<Supplier> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.post<Supplier>(`${this.apiURL}/suppliers`, supplier).pipe(
      tap(newSupplier => {
        const currentSuppliers = this.suppliersSubject.value;
        this.suppliersSubject.next([...currentSuppliers, newSupplier]);
      }),
      catchError(error => this.handleError('Failed to create supplier', error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * Update existing supplier
   */
  updateSupplier(id: string, supplier: Supplier): Observable<Supplier> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.put<Supplier>(`${this.apiURL}/suppliers/${id}`, supplier).pipe(
      tap(updatedSupplier => {
        const currentSuppliers = this.suppliersSubject.value;
        const index = currentSuppliers.findIndex(s => s.id === id);
        if (index !== -1) {
          currentSuppliers[index] = updatedSupplier;
          this.suppliersSubject.next([...currentSuppliers]);
        }
      }),
      catchError(error => this.handleError('Failed to update supplier', error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * Delete supplier
   */
  deleteSupplier(id: string): Observable<void> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.delete<void>(`${this.apiURL}/suppliers/${id}`).pipe(
      tap(() => {
        const currentSuppliers = this.suppliersSubject.value;
        this.suppliersSubject.next(currentSuppliers.filter(s => s.id !== id));
      }),
      catchError(error => this.handleError('Failed to delete supplier', error)),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * Search suppliers
   */
  searchSuppliers(query: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiURL}/suppliers/search?query=${query}`);
  }

  /**
   * Error handler
   */
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    const errorMessage = error.error?.message || error.message || message;
    this.errorSubject.next(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Clear error
   */
  clearError(): void {
    this.errorSubject.next(null);
  }
}
