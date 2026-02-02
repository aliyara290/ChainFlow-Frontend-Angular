import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle, VehicleRequest } from '../model/vehicle.model';
import {environment} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VehiclesService {
    private apiUrl = environment.customServiceUrl + "/vehicles";

    constructor(private http: HttpClient) { }

    getVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(this.apiUrl);
    }

    createVehicle(vehicle: VehicleRequest): Observable<Vehicle> {
        return this.http.post<Vehicle>(this.apiUrl, vehicle);
    }

    updateVehicle(id: string, vehicle: VehicleRequest): Observable<Vehicle> {
        return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle);
    }
}
