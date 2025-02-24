import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UFservice {
    private apiUrl = 'http://localhost:9090/uf/uf';

  constructor(private http: HttpClient) { }

    getUF(): Observable<any>{
        return this.http.get<any[]>(this.apiUrl);
    }

}
