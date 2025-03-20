import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../pages/service/auth.service';

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

    constructor(private authService: AuthService) {}

    ngOnInit() {
        const perfil = this.authService.getPerfil();
        this.model = this.getMenuItemsByPerfil(perfil);
        const usuarioLogado = this.authService.getUsuarioLogado();

        if (usuarioLogado) {
            this.model.unshift({
                label: `Usúario : ${usuarioLogado.pessoa.nome}`
            },
            {
                label: `Perfil : ${usuarioLogado.perfilAcesso.descricao}`
            });
        }
    }

    getMenuItemsByPerfil(perfil: string | null): MenuItem[] {
        const menuItems: MenuItem[] = [
            {
                label: 'Funcionalidades',
                items: [
                    { label: 'Formulário Cadastro', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    { label: 'Formulário Registro', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formresister'] },
                    { label: 'Gestor', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formgestor'] },
                    { label: 'Supervisor OM', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formsupervisor'] },
                    { label: 'Operador OM', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formoperador'] },
                    { label: 'Participante', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formparticipante'] },
                    { label: 'Listar Administradores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Listar Gestores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formgestor'] },
                    { label: 'Listar Supervisores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formsupervisor'] },
                    { label: 'Listar Operadores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formoperador'] },
                ]
            },
            {
                label: 'Paginas',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                {
                        label: 'Autorização',
                        icon: 'pi pi-fw pi-user',
                        items: [
                        /*    {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },  */
                            {
                                label: 'Erro',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Acesso Negado',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                ]
            },
        ];

        // Definição de permissões por perfil
        const perfilRestricoes: { [key: string]: string[] } = {
            '1': ['Listar Administradores', 'Listar Gestores', 'Listar Supervisores','Supervisor OM','Gestor','Operador OM','Listar Operadores','Formulário Cadastro','Formulário Registro','Autorização','Crud'], // participante
            '2': ['Listar Administradores', 'Listar Gestores', 'Formulário Cadastro'], //
            '3': [], // Administrador todas as opções
            '4': ['Listar Administradores'], //
            '5': ['Listar Administradores','Autorização','Crud'], // Supervisor
            '6': ['Supervisor OM','Listar Administradores','Listar Supervisores','Autorização','Crud'], // Gestor
        };

        return menuItems.map(item => ({
            ...item,
            items: item.items?.filter(menuItem =>
                menuItem.label && !perfilRestricoes[perfil || '']?.includes(menuItem.label)
            ) || []
        }));

    }
}
