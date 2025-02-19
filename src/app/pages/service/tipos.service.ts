import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Tiposservice {
    private apiUrl = 'http://localhost:9090/tipos/pessoafisicatipos';

  constructor(private http: HttpClient) { }

    getTipos(): Observable<any>{
        return this.http.get<any[]>(this.apiUrl);
    }

}
