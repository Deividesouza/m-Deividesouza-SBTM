import { Component, OnInit, signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../service/';

interface Product {
    id: number;
    cpf: string;
    celular: string;
    login: string;
    senha: string;
    pessoaFisicaTipo: {
        id: number;
        descricao: string;
    };
    perfilAcesso: {
        id: number;
        descricao: string;
    };
    pessoa: {
        id: number;
        nome: string;
        telefone: string;
        email: string;
        dataCadastro: string | null;
        dataValidade: [number, number, number];
        endereco: {
            id: number;
            logradouro: string;
            cep: string;
            complemento: string;
            numeroCasa: number;
            cidade: {
                id: number;
                nome: string;
                uf: {
                    id: number;
                    nome: string;
                    sigla: string;
                };
            };
        };
        pessoaStatus: {
            id: number;
            descricao: string;
        };
    };
}


@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, InputTextModule, TableModule, HttpClientModule, DialogModule],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Novo" icon="pi pi-plus" severity="secondary" class="mr-2" (click)="onNovo()"></p-button>
            </ng-template>
        </p-toolbar>

        <p-table #dt [value]="products()" [rows]="20" [paginator]="true" [globalFilterFields]="['name']">
            <ng-template #header>
                <tr>
                    <th style="min-width: 1rem">ID</th>
                    <th style="min-width: 12rem">Nome</th>
                    <th style="min-width: 12rem">CPF</th>
                    <th style="min-width: 16rem">Logradouro</th>

                    <th style="min-width: 5rem">Perfil de Acesso</th>
                    <th style="min-width: 8rem">Ações</th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td>{{ product.id }}</td>
                    <td>{{ product.pessoa.nome }}</td>
                    <td>{{ product.cpf }}</td>
                    <td>{{ product.pessoa.endereco.logradouro }}</td>
                    <td>{{ product.perfilAcesso.descricao }}</td>
                    <td>
                        <p-button icon="pi pi-pencil" severity="info" class="mr-2" (click)="onEdit(product)"></p-button>
                        <p-button icon="pi pi-trash" severity="danger" (click)="onDelete(product)"></p-button>
                    </td>
                </tr>
            </ng-template>
        </p-table>

            <!-- Modal de Edição -->
            <p-dialog [(visible)]="exibirModalEdicao" header="Editar Usuário" [modal]="true" [closable]="false" [style]="{ width: '40vw' }">
    <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-3/4">
            <div class="font-semibold text-xl">Informações Pessoais</div>

            <div class="p-field">
                <label for="nome">Nome</label>
                <input id="nome" type="text" pInputText [(ngModel)]="usuarioEditando.pessoa.nome"/>
            </div>

            <div class="p-field">
                <label for="cpf">CPF</label>
                <input id="cpf" type="text" pInputText [(ngModel)]="usuarioEditando.cpf"/>
            </div>

            <div class="p-field">
                <label for="celular">Celular</label>
                <input id="celular" type="text" pInputText [(ngModel)]="usuarioEditando.celular"/>
            </div>

            <div class="p-field">
                <label for="login">Login</label>
                <input id="login" type="text" pInputText [(ngModel)]="usuarioEditando.login"/>
            </div>

            <div class="p-field">
                <label for="senha">Senha</label>
                <input id="senha" type="password" pInputText [(ngModel)]="usuarioEditando.senha"/>
            </div>

            <div class="p-field">
                <label for="perfilAcesso">Perfil de Acesso</label>
                <input id="perfilAcesso" type="text" pInputText [(ngModel)]="usuarioEditando.perfilAcesso.descricao"/>
            </div>

            <div class="p-field">
                <label for="logradouro">Logradouro</label>
                <input id="logradouro" type="text" pInputText [(ngModel)]="usuarioEditando.pessoa.endereco.logradouro"/>
            </div>

            <div class="p-field">
                <label for="numeroCasa">Número da Casa</label>
                <input id="numeroCasa" type="text" pInputText [(ngModel)]="usuarioEditando.pessoa.endereco.numeroCasa"/>
            </div>

            <div class="p-field">
                <label for="cidade">Cidade</label>
                <input id="cidade" type="text" pInputText [(ngModel)]="usuarioEditando.pessoa.endereco.cidade.nome"/>
            </div>

            <div class="p-field">
                <label for="uf">Estado (UF)</label>
                <input id="uf" type="text" pInputText [(ngModel)]="usuarioEditando.pessoa.endereco.cidade.uf.sigla"/>
            </div>

            <div class="p-field">
                <label for="status">Status</label>
                <input id="status" type="text" pInputText [(ngModel)]="usuarioEditando.pessoa.pessoaStatus.descricao"/>
            </div>

            <p-footer>
                <p-button label="Cancelar" icon="pi pi-times" severity="secondary" (click)="fecharModal()"></p-button>
                <p-button label="Salvar" icon="pi pi-check" severity="success" (click)="salvarEdicao()"></p-button>
            </p-footer>
        </div>
    </div>
</p-dialog>

        <p-toast></p-toast>
    `,

    providers: [MessageService, ConfirmationService, DialogService]
})
export class Crud implements OnInit {
    products = signal<Product[]>([]);
    exibirModalEdicao = false;

    usuarioEditando: Product = this.getNovoUsuario();

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.http.get<Product[]>('http://10.112.61.74:9090/pessoas/fisicas').subscribe(
            (data) => {
                this.products.set(data);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Dados carregados',
                    detail: 'A lista foi carregada com sucesso',
                    life: 3000
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível carregar os dados da API',
                    life: 3000
                });
            }
        );
    }

    onNovo() {
        this.router.navigate(['/uikit/formlayout']);
    }

    onEdit(product: Product) {
        this.usuarioEditando = JSON.parse(JSON.stringify(product)); // Clona o objeto para evitar mudanças imediatas
        this.exibirModalEdicao = true;
    }

    fecharModal() {
        this.exibirModalEdicao = false;
    }

    salvarEdicao() {
        this.http.put(`http://10.112.61.74:9090/pessoas/${this.usuarioEditando.id}`, this.usuarioEditando).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário atualizado com sucesso!',
                    life: 3000
                });
                this.fecharModal();
                this.loadDemoData();
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao atualizar usuário',
                    life: 3000
                });
            }
        );
    }
/*
    onDelete(product: Product) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir ${product.pessoa.nome}?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.http.delete(`http://10.112.61.74:9090/pessoas/${product.id}`).subscribe(() => {
                    this.loadDemoData();
                });
            }
        });
    }
*/
onDelete(id: String) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir ${id}?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.http.delete(`http://10.112.61.74:9090/pessoas/fisicas/deletar/${id}`).subscribe(
                    () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Excluído',
                            detail: 'Excluído com sucesso',
                            life: 3000
                        });
                        this.loadDemoData();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Não foi possível excluir',
                            life: 3000
                        });
                    }
                );
            }
        });
    }

    getNovoUsuario(){
        return {};
    }
}
