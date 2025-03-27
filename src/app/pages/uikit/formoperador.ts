import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; //para a mascara
import { environment } from '../../../environments/environment';
import { DropdownModule } from 'primeng/dropdown';

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
    selector: 'app-formoperador',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, InputTextModule, TableModule, HttpClientModule, DialogModule, ConfirmDialogModule, NgxMaskDirective, TableModule,DropdownModule],
    templateUrl: './formoperador.componente.html',

    providers: [MessageService, ConfirmationService, DialogService, provideNgxMask()]

})
export class FormOperador implements OnInit {
    @ViewChild('dt') dt! : Table;
    products = signal<Product[]>([]);
    exibirModalEdicao = false;
    exibirModalVisualizar = false;
    termoPesquisa = '';
    dadosFiltrados = signal<Product[]>([]);
    selectedState: any;
    dropdownCidade: any;
    selectedCidade: any;
    vardropdownCidades: any;
    selectedPerfil: any;
    selectedTipo: any;
    vardropdownPerfis: any;
    vardropdownTipos: any;
    selectedStatus: any;
    vardropdownStatus: any;
    vardropdownItems: any;
    dropdownItems: any;

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
/*
    ngOnInit() {
        this.loadDemoData();
    }
*/
    ngOnInit(): void {
        this.loadDemoData();

        this.carregarStatus();
        this.carregarPerfil();
        this.carregarTipos();
        this.carregarUF(); // Carrega os estados primeiro

        // Depois que os estados carregarem, carrega as cidades
        this.dropdownItems.getUF().subscribe({
            next: (data: any[]) => {
                this.vardropdownItems = data.map((uf) => ({
                    name: uf.nome,
                    code: uf.id
                }));

                // Se estiver editando, seleciona o estado atual
                if (this.usuarioEditando?.pessoa?.endereco?.cidade?.uf?.id) {
                    this.selectedState = this.vardropdownItems.find(
                        (                        uf: { code: number; }) => uf.code === this.usuarioEditando.pessoa.endereco.cidade.uf.id
                    );
                    this.carregarCidadesPorEstado();
                }
            }
        });
    }
    carregarStatus() {
        throw new Error('Method not implemented.');
    }
    carregarPerfil() {
        throw new Error('Method not implemented.');
    }
    carregarTipos() {
        throw new Error('Method not implemented.');
    }
    carregarUF() {
        throw new Error('Method not implemented.');
    }


    loadDemoData() {
        this.http.get<Product[]>(`${environment.url}/pessoas/fisicas`).subscribe(
            (data) => {
                // Filtra apenas os perfis com ID 1 (Administrador) e 4 (Operador OM)
                const filteredData = data.filter(product =>
                    product.perfilAcesso.id === 1 || product.perfilAcesso.id === 4
                );

                this.products.set(filteredData);
                this.dadosFiltrados.set(filteredData); // Inicializa os dados filtrados com os dados já filtrados
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

    exportCSV() {
        const dados = this.dadosFiltrados();
        if (!dados || dados.length === 0) {
            console.error('Nenhum dado para exportar.');
            return;
        }

        const cabecalho = ['ID', 'Nome', 'CPF', 'Logradouro', 'Perfil de Acesso'];
        const linhas = dados.map(product => [
            product.id,
            product.pessoa.nome,
            product.cpf,
            product.pessoa.endereco.logradouro,
            product.perfilAcesso.descricao
        ]);

        const csvContent = [cabecalho.join(';'), ...linhas.map(row => row.join(';'))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'usuarios.csv';
        link.click();
    }


    carregarCidadesPorEstado() {
        if (this.selectedState) {
            this.dropdownCidade.getCidadesPorEstado(this.selectedState.code).subscribe({
                next: (data: any[]) => {
                    this.vardropdownCidades = data.map((cidade) => ({
                        name: cidade.nome,
                        code: cidade.id
                    }));
                    // Seleciona a cidade atual do usuário
                    if (this.usuarioEditando?.pessoa?.endereco?.cidade?.id) {
                        this.selectedCidade = this.vardropdownCidades.find(
                            (                            c: { code: number; }) => c.code === this.usuarioEditando.pessoa.endereco.cidade.id
                        );
                    }
                },
                error: (err: any) => {
                    console.error('Erro ao carregar cidades:', err);
                }
            });
        }
    }



    onNovo() {
        this.router.navigate(['/uikit/formoperadorcadastro']);
    }

    onEdit(product: Product) {
        this.usuarioEditando = JSON.parse(JSON.stringify(product));
        // definindo os dropdowns
    //    this.selectedPerfil = this.vardropdownPerfis.find((p: { code: number; }) => p.code === product.perfilAcesso.id);
    //    this.selectedTipo = this.vardropdownTipos.find((t: { code: number; }) => t.code === product.pessoaFisicaTipo.id);
    //    this.selectedStatus = this.vardropdownStatus.find((s: { code: number; }) => s.code === product.pessoa.pessoaStatus.id);
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
                    pessoaFisicaTipo: { id: this.selectedTipo.code }
                    //id: this.usuarioEditando.pessoaFisicaTipo.id
                },
                perfilAcesso: {
                    perfilAcesso: { id: this.selectedPerfil.code },
                    //id: this.usuarioEditando.perfilAcesso.id
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
            }
        };
    }
}
