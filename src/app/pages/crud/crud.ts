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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; //para a mascara

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
    imports: [CommonModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, InputTextModule, TableModule, HttpClientModule, DialogModule, ConfirmDialogModule,NgxMaskDirective],
    templateUrl: './crud.component.html',
    providers: [MessageService, ConfirmationService, DialogService,provideNgxMask()]
})
export class Crud implements OnInit {
    products = signal<Product[]>([]);
    exibirModalEdicao = false;
    exibirModalVisualizar = false;

    onView(product: Product) {
        this.usuarioVisualizando = JSON.parse(JSON.stringify(product));
        this.exibirModalVisualizar = true;
    }

    fecharModalVisualizar() {
        this.exibirModalVisualizar = false;
    }

    usuarioEditando: Product = this.getNovoUsuario();
    usuarioVisualizando: Product = this.getNovoUsuario();

    constructor(
        private readonly http: HttpClient,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService,
        private readonly router: Router
    ) {}

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.http.get<Product[]>('http://localhost:9090/pessoas/fisicas').subscribe(
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
        this.usuarioEditando = JSON.parse(JSON.stringify(product));
        this.exibirModalEdicao = true;
    }

    fecharModalEdicao() {
        this.exibirModalEdicao = false;
    }

    salvarEdicao() {

        const payload = {
            pessoaFisica: {
                cpf: this.usuarioEditando.cpf,
                celular: this.usuarioEditando.celular,
                login: this.usuarioEditando.login,
                senha: this.usuarioEditando.senha,
                pessoaFisicaTipo: {
                    id: this.usuarioEditando.pessoaFisicaTipo.id
                },
                perfilAcesso: {
                    id: this.usuarioEditando.perfilAcesso.id
                }
            },
            pessoa: {
                nome: this.usuarioEditando.pessoa.nome,
                telefone: this.usuarioEditando.pessoa.telefone,
                email: this.usuarioEditando.pessoa.email,
                dataValidade: this.usuarioEditando.pessoa.dataValidade,
                endereco: {
                    logradouro: this.usuarioEditando.pessoa.endereco.logradouro,
                    cep: this.usuarioEditando.pessoa.endereco.cep,
                    complemento: this.usuarioEditando.pessoa.endereco.complemento,
                    numeroCasa: this.usuarioEditando.pessoa.endereco.numeroCasa,
                    cidade: {
                        id: this.usuarioEditando.pessoa.endereco.cidade.id,
                        nome: this.usuarioEditando.pessoa.endereco.cidade.nome,
                        uf: {
                            id: this.usuarioEditando.pessoa.endereco.cidade.uf.id,
                            nome: this.usuarioEditando.pessoa.endereco.cidade.uf.nome,
                            sigla: this.usuarioEditando.pessoa.endereco.cidade.uf.sigla
                        }
                    }
                }
            }
        };

        this.http.put(`http://localhost:9090/pessoas/fisicas/editar/${this.usuarioEditando.id}`, payload).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário atualizado com sucesso!',
                    life: 3000
                });
                this.fecharModalEdicao();
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

    onDelete(product: Product) {
        this.confirmationService.confirm({
            message: `Tem certeza que deseja excluir ${product.pessoa.nome}?`,
            header: 'Confirmar Exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptButtonStyleClass: 'p-button-danger', // Vermelho para "Sim"
            rejectButtonStyleClass: 'p-button-secondary', // Cinza para "Não"
            accept: () => {
                this.http.delete(`http://localhost:9090/pessoas/fisicas/deletar/${product.id}`).subscribe(
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


    getNovoUsuario(): Product {
        return {
            id: 0,
            cpf: '',
            celular: '',
            login: '',
            senha: '',
            pessoaFisicaTipo: {
                id: 0,
                descricao: ''
            },
            perfilAcesso: {
                id: 0,
                descricao: ''
            },
            pessoa: {
                id: 0,
                nome: '',
                telefone: '',
                email: '',
                dataCadastro: '',
                dataValidade: [0, 0, 0],
                endereco: {
                    id: 0,
                    logradouro: '',
                    cep: '',
                    complemento: '',
                    numeroCasa: 0,
                    cidade: {
                        id: 0,
                        nome: '',
                        uf: {
                            id: 0,
                            nome: '',
                            sigla: ''
                        }
                    }
                },
                pessoaStatus: {
                    id: 0,
                    descricao: ''
                }
            }
        };
    }
}
