import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = (`${environment.url}/pessoas/fisicas`);

    private perfilUsuario = signal<string | null>(null); // Estado reativo do perfil
    private usuarioLogado = signal<any | null>(null); // Estado reativo do usuário logado

    constructor(private http: HttpClient) {
        // Ao inicializar o serviço, verifica se há um usuário logado no localStorage
        const usuarioSalvo = localStorage.getItem('usuarioLogado');
        if (usuarioSalvo) {
            this.usuarioLogado.set(JSON.parse(usuarioSalvo));
            this.perfilUsuario.set(JSON.parse(usuarioSalvo).perfilAcesso.id.toString());
        }
    }

    login(login: string, senha: string): Observable<any> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map((usuarios) => {
                const usuarioEncontrado = usuarios.find((user) => user.login === login && user.senha === senha);

                if (usuarioEncontrado) {
                    this.setUsuarioLogado(usuarioEncontrado); // Armazena o usuário logado
                    this.setPerfil(usuarioEncontrado.perfilAcesso.id.toString()); // Define o perfil
                    return usuarioEncontrado;
                } else {
                    throw new Error('Usuário ou senha inválidos');
                }
            }),
            catchError((error) => throwError(() => new Error(error.message || 'Erro ao autenticar')))
        );
    }

    setPerfil(perfil: string) {
        this.perfilUsuario.set(perfil);
    }

    getPerfil(): string | null {
        return this.perfilUsuario();
    }

    setUsuarioLogado(usuario: any) {
        this.usuarioLogado.set(usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // Armazena no localStorage
    }

    getUsuarioLogado(): any | null {
        return this.usuarioLogado();
    }

    logout() {
        this.perfilUsuario.set(null);
        this.usuarioLogado.set(null);
        localStorage.removeItem('usuarioLogado'); // Remove do localStorage
    }
}
