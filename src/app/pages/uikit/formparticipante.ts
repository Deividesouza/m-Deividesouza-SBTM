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
import { environment } from '../../../environments/environment';

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
    pessoaParticipante: {
        id: number;
        dataPraca: number;
        dataNasc: number;
        dataBaixa: number;
        postgrad: string;
        ativaReserva: string;
            formacoesAcademicas: {
                instituicao: string;
                curso: string;
                nivel: string;
                anoInicio: number;
                anoConlusao: number;
                email: string;
                telefone: string;
            };
            curriculo:{
                nomeArquivoHash: string;
            }
            experiencias: {
			empresa: string;
			cargo: string;
			dataInici: number;
			dataFim: number;
			email: string;
			telefone: string;
			descricao: string;
		};
    };
}

@Component({
    selector: 'app-formparticipante',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, InputTextModule, TableModule, HttpClientModule, DialogModule, ConfirmDialogModule, NgxMaskDirective],
    templateUrl: './formparticipante.componente.html',
    providers: [MessageService, ConfirmationService, DialogService, provideNgxMask()]
})
export class FormParticipante implements OnInit {
    products = signal<Product[]>([]);
    exibirModalEdicao = false;
    exibirModalVisualizar = false;
    termoPesquisa = '';
    dadosFiltrados = signal<Product[]>([]);

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
        private http: HttpClient,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    exportCSV() {
        this.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        const usuarioLogadoId = this.getUsuarioLogadoId(); // Obter o ID do usuário logado

        this.http.get<Product[]>(`${environment.url}/pessoas/fisicas`).subscribe(
            (data) => {
                const usuarioLogado = data.find((user) => user.id === usuarioLogadoId);

                if (usuarioLogado) {
                    this.products.set([usuarioLogado]); // Define os produtos com os dados do usuário logado
                    this.dadosFiltrados.set([usuarioLogado]); // Define os dados filtrados
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Dados carregados',
                        detail: 'Dados do usuário logado carregados com sucesso',
                        life: 3000
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Usuário logado não encontrado',
                        life: 3000
                    });
                }
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

    getUsuarioLogadoId(): number | null {
        // Exemplo: Obter o ID do usuário logado do localStorage
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
        return usuarioLogado ? usuarioLogado.id : null;
    }

    filtrarDados() {
        if (!this.termoPesquisa) {
            this.dadosFiltrados.set(this.products());
            return;
        }

        const termo = this.termoPesquisa.toLowerCase();
        const dadosFiltrados = this.products().filter((product) => {
            return (
                product.id.toString().includes(termo) ||
                product.pessoa.nome.toLowerCase().includes(termo) ||
                product.cpf.toLowerCase().includes(termo) ||
                product.pessoa.endereco.logradouro.toLowerCase().includes(termo) ||
                product.perfilAcesso.descricao.toLowerCase().includes(termo)
            );
        });

        this.dadosFiltrados.set(dadosFiltrados);
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

        this.http.put(`${environment.url}/pessoas/fisicas/editar/${this.usuarioEditando.id}`, payload).subscribe(
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
            accept: () => {
                this.http.delete(`${environment.url}/fisicas/deletar/${product.id}`).subscribe(
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
            },
            pessoaParticipante: {
                id: 0,
                dataPraca: 0,
                dataNasc: 0,
                dataBaixa: 0,
                postgrad: '',
                ativaReserva: '',
                formacoesAcademicas: {
                    instituicao: '',
                    curso: '',
                    nivel: '',
                    anoInicio: 0,
                    anoConlusao: 0,
                    email: '',
                    telefone: ''
                },
                curriculo: {
                    nomeArquivoHash: ''
                },
                experiencias: {
                    empresa: '',
                    cargo: '',
                    dataInici: 0,
                    dataFim: 0,
                    email: '',
                    telefone: '',
                    descricao: ''
                }
            }
        };
    }
}
