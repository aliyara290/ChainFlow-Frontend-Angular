import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplier} from '../models/supplier.models';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private apiURL: string = environment.supplierServiceUrl;

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiURL}/suppliers`);
  }
}
