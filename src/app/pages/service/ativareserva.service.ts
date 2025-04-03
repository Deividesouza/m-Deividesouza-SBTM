import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AtivaReservaService {
    private apiUrl = `${environment.url}/ativareserva/ativareserva`;

    constructor(private http: HttpClient) {}

    getAtivaReserva(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
