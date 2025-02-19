import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Cidadesservice {
    private apiUrl = 'http://localhost:9090/cidades/cidades';

  constructor(private http: HttpClient) { }

    getCidades(): Observable<any>{
        return this.http.get<any[]>(this.apiUrl);
    }

}
