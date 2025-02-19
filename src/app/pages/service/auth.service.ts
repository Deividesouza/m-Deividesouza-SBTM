import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://10.112.61.74:9090/pessoas/fisicas';

  constructor(private http: HttpClient) {}

  login(login: string, senha: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((usuarios) => {
        const usuarioEncontrado = usuarios.find(user => user.login === login && user.senha === senha);

        if (usuarioEncontrado) {
          return usuarioEncontrado;
        } else {
          throw new Error('Usuário ou senha inválidos');
        }
      }),
      catchError(error => throwError(() => new Error(error.message || 'Erro ao autenticar')))
    );
  }
}
