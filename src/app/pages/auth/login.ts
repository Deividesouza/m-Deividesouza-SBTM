import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../pages/service/auth.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, CommonModule],
    template: `
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 10px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 10px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bem Vindo ao SBTM</div>
                        </div>
                        <div>
                            <form (keydown.enter)="realizarLogin()">
                                <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Login</label>
                                <input pInputText id="email1" type="text" placeholder="Login" class="w-full md:w-[30rem] mb-8" [(ngModel)]="login" name="login" />
                                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                                <p-password id="password1" [(ngModel)]="password" placeholder="Senha" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false" name="password"></p-password>
                                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                    <div class="flex items-center">
                                        <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2" name="rememberme"></p-checkbox>
                                        <label for="rememberme1">Lembrar senha</label>
                                    </div>
                                </div>
                                <p-button label="Entrar" styleClass="w-full" (click)="realizarLogin()"></p-button>
                                <div *ngIf="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    login: string = '';
    password: string = '';
    checked: boolean = false;
    errorMessage: string = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {}

    realizarLogin() {
        const apiUrl = `${environment.url}/pessoas/fisicas`;

        this.http.get<any[]>(apiUrl).subscribe({
            next: (usuarios) => {
                const usuario = usuarios.find((user) => user.login === this.login && user.senha === this.password);

                if (usuario) {
                    this.errorMessage = '';
                    this.authService.setPerfil(usuario.perfilAcesso.id.toString()); // Define o perfil no AuthService
                    this.authService.setUsuarioLogado(usuario);
                    this.redirecionarPorPerfil(usuario.perfilAcesso.id);
                } else {
                    this.errorMessage = 'Usuário ou senha inválidos.';
                }
            },
            error: () => {
                this.errorMessage = 'Erro ao realizar login. Tente novamente.';
            }
        });
    }

    redirecionarPorPerfil(perfilId: number) {
        const rotasPorPerfil: { [key: number]: string } = {
            0: '/pages/crud',
            1: '/uikit/formparticipante', // usuario administrador perfil participante
            2: '/uikit/formparticipante', // usuario administradorjr perfil preposto
            3: '/uikit/formoperador',   //
            4: '/uikit/formsupervisor',
            5: '/pages/crud'  // usuario supervisorsenior supervisor / usuario supervisor perfil gestor

        };

        const rotaDestino = rotasPorPerfil[perfilId] || '/pages/crud';
        this.router.navigate([rotaDestino]);
    }
}
