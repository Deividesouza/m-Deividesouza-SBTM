import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    private apiUrl = `${environment.url}/tipos/pessoastatus`;

    constructor(private http: HttpClient) {}

    getStatus(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
