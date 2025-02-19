import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatusService {
    private apiUrl = 'http://localhost:9090/tipos/pessoastatus';

  constructor(private http: HttpClient) { }

    getStatus(): Observable<any>{
        return this.http.get<any[]>(this.apiUrl);
    }

}
