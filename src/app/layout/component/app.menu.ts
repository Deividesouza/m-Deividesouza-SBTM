import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

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
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Funcionalidades',
                items: [
                    { label: 'Formulário Cadastro', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Formulário Registro', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formresister'] },
                    { label: 'Gestor', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formgestor'] },
                    { label: 'Supervisor OM', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formsupervisor'] },
                    { label: 'Operador OM', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formoperador'] },
                    { label: 'Participante', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formparticipante'] },
                    { label: 'Credenciada', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formcredenciada'] },
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
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
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
/*                    {
                        label: 'Tela Vazia',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    } */
                ]
            },
        ];
    }
}
