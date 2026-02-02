import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap, shareReplay, finalize } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Material, MaterialRequest, MaterialResponse } from '../models/material.models';

@Injectable({
    providedIn: 'root'
})
export class MaterialsService {
    private apiURL: string = environment.supplierServiceUrl;

    // State management with RxJS
    private materialsSubject = new BehaviorSubject<Material[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);

    // Public observables
    public materials$ = this.materialsSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();
    public error$ = this.errorSubject.asObservable();

    constructor(private http: HttpClient) { }

    /**
     * Get all materials
     */
    getMaterials(): Observable<Material[]> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<MaterialResponse[]>(`${this.apiURL}/materials`).pipe(
            tap(materials => this.materialsSubject.next(materials)),
            catchError(error => this.handleError('Failed to load materials', error)),
            finalize(() => this.loadingSubject.next(false)),
            shareReplay(1)
        );
    }

    /**
     * Get material by ID
     */
    getMaterialById(id: string): Observable<Material> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<MaterialResponse>(`${this.apiURL}/materials/${id}`).pipe(
            catchError(error => this.handleError('Failed to load material', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Create new material
     */
    createMaterial(material: MaterialRequest): Observable<Material> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.post<MaterialResponse>(`${this.apiURL}/materials`, material).pipe(
            tap(newMaterial => {
                const currentMaterials = this.materialsSubject.value;
                this.materialsSubject.next([...currentMaterials, newMaterial]);
            }),
            catchError(error => this.handleError('Failed to create material', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Update existing material
     */
    updateMaterial(id: string, material: MaterialRequest): Observable<Material> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.put<MaterialResponse>(`${this.apiURL}/materials/${id}`, material).pipe(
            tap(updatedMaterial => {
                const currentMaterials = this.materialsSubject.value;
                const index = currentMaterials.findIndex(m => m.id === id);
                if (index !== -1) {
                    currentMaterials[index] = updatedMaterial;
                    this.materialsSubject.next([...currentMaterials]);
                }
            }),
            catchError(error => this.handleError('Failed to update material', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Delete material
     */
    deleteMaterial(id: string): Observable<void> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.delete<void>(`${this.apiURL}/materials/${id}`).pipe(
            tap(() => {
                const currentMaterials = this.materialsSubject.value;
                this.materialsSubject.next(currentMaterials.filter(m => m.id !== id));
            }),
            catchError(error => this.handleError('Failed to delete material', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Get materials by supplier
     */
    getMaterialsBySupplier(supplierId: string): Observable<Material[]> {
        return this.materials$.pipe(
            map(materials => materials.filter(m => m.supplierId === supplierId))
        );
    }

    /**
     * Get low stock materials
     */
    getLowStockMaterials(): Observable<Material[]> {
        return this.materials$.pipe(
            map(materials => materials.filter(m => m.stock < m.stockMin))
        );
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
