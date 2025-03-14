import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Cidadesservice {
    private apiUrl = (`${environment.url}/cidades/cidades`);

  constructor(private http: HttpClient) { }

    getCidades(): Observable<any>{
        return this.http.get<any[]>(this.apiUrl);
    }

}
