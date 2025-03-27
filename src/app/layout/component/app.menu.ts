import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../pages/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {

        const perfil = this.authService.getPerfil();
        this.model = this.getMenuItemsByPerfil(perfil);
        const usuarioLogado = this.authService.getUsuarioLogado();

        if (usuarioLogado) {
            this.model.unshift(
                {
                    label: 'Informações do Usuário',
                    items: [
                        {
                            label: `${usuarioLogado.pessoa.nome}`,
                            icon: 'pi pi-user',
                            styleClass: 'user-info-item'
                        },
                        {
                            label: `Perfil: ${usuarioLogado.perfilAcesso.descricao}`,
                            icon: 'pi pi-id-card',
                            styleClass: 'profile-info-item'
                        }
                    ],
                    styleClass: 'user-profile-group'
                },
                { separator: true }
            );
        }
        if (this.router.url.includes('formparticipantecadastro')) {
            this.model = [];
            return;
        }
        if (!perfil) {
            this.model = [];
            return;
        }
    }

    getMenuItemsByPerfil(perfil: string | null): MenuItem[] {
        const menuItems: MenuItem[] = [
            {
                label: 'Funcionalidades',
                items: [
                    { label: 'Usúarios Cadastrados', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formadministrador']},
                    { label: 'Formulário Cadastro', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    { label: 'Formulário Registro', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formresister'] },
                    { label: 'Gestor', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formgestor'] },
                    { label: 'Supervisor OM', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formsupervisor'] },
                    { label: 'Operadores e Participantes Cadastrados', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formoperador'] },
                    { label: 'Meus Dados', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formparticipante'] },
                    { label: 'Listar Administradores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Listar Gestores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formgestor'] },
                    { label: 'Listar Supervisores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formsupervisor'] },
                ]
            },
        ];

        // Definição de permissões por perfil
        const perfilRestricoes: { [key: string]: string[] } = {
            '1': ['Listar Administradores', 'Listar Gestores', 'Listar Supervisores','Supervisor OM','Gestor','Operador OM','Formulário Cadastro','Formulário Registro','Usúarios Cadastrados','Operadores e Participantes Cadastrados'], // participante
            '2': ['Listar Administradores', 'Listar Gestores', 'Formulário Cadastro'], //
            '3': ['Listar Administradores', 'Listar Gestores', 'Listar Supervisores','Supervisor OM','Gestor','Operador OM','Formulário Cadastro','Formulário Registro','Operadores e Participantes Cadastrados'], // Administrador todas as opções
            '4': ['Listar Administradores','Listar Supervisores','Listar Gestores','Supervisor OM','Gestor','Formulário Registro','Formulário Cadastro','Usúarios Cadastrados'], // Operador
            '5': ['Listar Administradores', 'Listar Gestores', 'Listar Supervisores','Gestor','Operador OM','Formulário Cadastro','Formulário Registro','Usúarios Cadastrados','Operadores e Participantes Cadastrados'], // Supervisor
            '6': ['Supervisor OM','Listar Administradores','Listar Supervisores','Usúarios Cadastrados', 'Formulário Cadastro', 'Formulário Registro','Operadores e Participantes Cadastrados','Listar Gestores'] // Gestor
        };

        return menuItems.map(item => ({
            ...item,
            items: item.items?.filter(menuItem =>
                menuItem.label && !perfilRestricoes[perfil || '']?.includes(menuItem.label)
            ) || []
        }));

    }
}
