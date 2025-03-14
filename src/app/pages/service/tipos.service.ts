import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Tiposservice {
    private apiUrl = (`${environment.url}/tipos/pessoafisicatipos`);

  constructor(private http: HttpClient) { }

    getTipos(): Observable<any>{
        return this.http.get<any[]>(this.apiUrl);
    }

}
