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
                    { label: 'Listar Administradores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formcredenciada'] },
                    { label: 'Listar Gestores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formcredenciada'] },
                    { label: 'Listar Supervisores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formcredenciada'] },
                    { label: 'Listar Operadores', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formcredenciada'] },
                ]
            },
            {
                label: 'Paginas',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
  /*                  {
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
                    },     */
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                ]
            },
        ];

        switch (perfil) {
            case '0': // Administrador
                return menuItems;
            case '1': // Credenciada
                return menuItems.map(item => {
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label == 'Credenciada'
                            )
                        };
                    }
                    if (item.label === 'Paginas') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Crud'
                            )
                        }
                    }
                    return item;
                });
            case '2': // Participante
                return menuItems.map(item => {
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label === 'Participante'
                            )
                        };
                    }
                    if (item.label === 'Paginas') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Crud'
                            )
                        }
                    }
                    return item;
                });
            case '3': // Operador
                return menuItems.map(item => {
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Listar Administradores'
                            )
                        };
                    }
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Listar Gestores'
                            )
                        };
                    }
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Listar Supervisores'
                            )
                        };
                    }
                    if (item.label === 'Paginas') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Crud'
                            )
                        }
                    }
                    return item;
                });
            case '4': // Supervisor
                return menuItems.map(item => {
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Listar Administradores'
                            )
                        };
                    }
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Listar Gestores'
                            )
                        };
                    }
                    if (item.label === 'Paginas') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Crud'
                            )
                        }
                    }
                    return item;
                });

            case '5': // Gestor
                return menuItems.map(item => {
                    if (item.label === 'Funcionalidades') {
                        return {
                            ...item,
                            items: item.items?.filter(menuItem =>
                                menuItem.label !== 'Listar Administradores'
                            )
                        };
                    }
                    return item;
                });
            // Adicione mais casos conforme necessário para outros perfis
            default:
                return [];
        }
    }
}
