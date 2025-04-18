import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostoGraducacaoService {
    private apiUrl = `${environment.url}/postograducacao/postograducacao`;

    constructor(private http: HttpClient) {}

    getPostoGraducacao(): Observable<any> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
