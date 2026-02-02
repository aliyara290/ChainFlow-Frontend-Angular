import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver, DriverRequest } from '../model/driver.model';
import {environment} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DriversService {
    private apiUrl = environment.customServiceUrl + "/drivers";

    constructor(private http: HttpClient) { }

    getDrivers(): Observable<Driver[]> {
        return this.http.get<Driver[]>(this.apiUrl);
    }

    // Note: API for getting single driver, update, delete wasn't strictly detailed in the prompt list
    // but "Update Driver" and "Create Driver" were there. "Get All Drivers" response was List<DriverResponseDTO>.
    // I will assume standard REST for others or stick to what's defined.
    // "Get Driver by ID" is missing from the list in prompt section 4, but let's add it for completeness if needed or stick to knowns.
    // Actually, usually it exists. "Update Driver" exists, enabling it.

    createDriver(driver: DriverRequest): Observable<Driver> {
        return this.http.post<Driver>(this.apiUrl, driver);
    }

    updateDriver(id: string, driver: DriverRequest): Observable<Driver> {
        return this.http.put<Driver>(`${this.apiUrl}/${id}`, driver);
    }
}
