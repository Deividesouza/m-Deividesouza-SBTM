import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importar HttpClient
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'; // Corrigido para DropdownModule
import { FormBuilder, FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { StatusService } from '../service/status.service';
import { PerfilService } from '../service/perfil.service';
import { Tiposservice } from '../service/tipos.service';
import { Cidadesservice } from '../service/cidades.service';
import { UFservice } from '../service/uf.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; //para a mascara
import { Router } from '@angular/router';

@Component({
    selector: 'app-formlayout',
    standalone: true,
    providers: [MessageService, provideNgxMask()],
    imports: [InputTextModule, FluidModule, ButtonModule, DropdownModule, FormsModule, TextareaModule, FileUploadModule, ToastModule, ToolbarModule, NgxMaskDirective],
    template: `
        <p-fluid>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-3/4">
                    <div class="card flex flex-col gap-4">
                        <div class="font-semibold text-xl">Informações Pessoais</div>
                        <div class="flex flex-col gap-2">
                            <label for="nome">Nome</label>
                            <input pInputText id="name" [(ngModel)]="nome" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cpf">CPF</label>
                            <input pInputText id="cpf" mask="CPF_CNPJ" [(ngModel)]="cpf" type="text" />
                            <!--Mascara cp/cnpj -->
                        </div>
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="flex flex-col gap-2 w-full">
                                <label for="celular">Celular</label>
                                <input pInputText id="celular" mask="(00) 00000-0000" [(ngModel)]="celular" type="tel" />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label for="telefone">Telefone</label>
                                <input pInputText id="telefone" mask="(00) 0000-0000" [(ngModel)]="telefone" type="tel" />
                                <!--Mascara tel -->
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="flex flex-col gap-2 w-full">
                                <label for="email1">Email</label>
                                <input pInputText id="email1" [(ngModel)]="email1" type="text" />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label for="login">Login</label>
                                <input pInputText id="login" [(ngModel)]="login" type="text" />
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="flex flex-col gap-2 w-full">
                                <label for="senha">Senha</label>
                                <input pInputText id="senha" [(ngModel)]="senha" type="text" />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label for="confirmasena">Comfirme a Senha</label>
                                <input pInputText id="confirmasenha" [(ngModel)]="confirmasenha" type="text" />
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="flex flex-wrap gap-2 w-full">
                                <label for="state">Perfil de Acesso</label>
                                <p-dropdown id="state" [(ngModel)]="selectedPerfil" [options]="vardropdownPerfis" optionLabel="name" placeholder="Selecione um Perfil" class="w-full"></p-dropdown>
                            </div>
                            <div class="flex flex-wrap gap-2 w-full">
                                <label for="state">Status</label>
                                <p-dropdown id="state" [(ngModel)]="selectedStatus" [options]="vardropdownStatus" optionLabel="name" placeholder="Selecione um Status" class="w-full"> </p-dropdown>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="flex flex-wrap gap-2 w-full">
                                <label for="state">Pessoa Fisica Tipo</label>
                                <p-dropdown id="state" [(ngModel)]="selectedTipo" [options]="vardropdownTipos" optionLabel="name" placeholder="Selecione o Tipo" class="w-full"></p-dropdown>
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label for="datacadastro">Data Cadastro :</label>
                                <input type="date" id="datacadastro" [(ngModel)]="datacadastro" />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label for="datavalidade">Data Validade :</label>
                                <input type="date" id="datavalidade" [(ngModel)]="datavalidade" />
                            </div>
                        </div>
                        <div class="card flex flex-col gap-4">
                            <div class="font-semibold text-xl">Informações de Localização</div>
                            <div class="flex flex-col gap-2">
                                <label for="logradouro">Logradouro</label>
                                <input pInputText id="logradouro" [(ngModel)]="logradouro" type="text" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="complemento">Complemento</label>
                                <input pInputText id="complemento" [(ngModel)]="complemento" type="text" />
                            </div>
                            <div class="flex flex-wrap gap-2 w-full">
                                <label for="state">Cidade</label>
                                <p-dropdown id="state" [(ngModel)]="selectedCidade" [options]="vardropdownCidades" optionLabel="name" placeholder="Selecione uma cidade" class="w-full"></p-dropdown>
                            </div>
                            <div class="flex flex-col md:flex-row gap-6">
                                <div class="flex flex-wrap gap-2 w-full">
                                    <label for="state">Estado</label>
                                    <p-dropdown id="state" [(ngModel)]="selectedState" [options]="vardropdownItems" optionLabel="name" placeholder="Selecione um estado" class="w-full"></p-dropdown>
                                </div>
                                <div class="flex flex-wrap gap-2 w-full">
                                    <label for="zip">CEP</label>
                                    <input pInputText id="cep" mask="00000-000" [(ngModel)]="cep" type="text" />
                                </div>
                            </div>
                        </div>

                        <div class="card flex flex-col gap-4">
                            <div class="font-semibold text-xl">Informações Profissionais</div>
                            <div class="flex flex-col gap-2">
                                <label for="name">Nome da Empresa</label>
                                <input pInputText id="name" type="text" />
                            </div>
                            <div class="flex flex-col md:flex-row gap-6">
                                <div class="flex flex-col gap-2 w-full">
                                    <label for="cnpj">CNPJ</label>
                                    <input pInputText id="CNPJ" mask="CPF_CNPJ" [(ngModel)]="cnpj" type="text" />
                                </div>
                                <div class="flex flex-col gap-2 w-full">
                                    <label for="celular">Telefone de Contato</label>
                                    <input pInputText id="celular" type="text" />
                                </div>
                                <div class="flex flex-col gap-2 w-full">
                                    <label for="email1">Email</label>
                                    <input pInputText id="email1" type="text" />
                                </div>
                            </div>
                            <div class="flex flex-col md:flex-row gap-6">
                                <div class="flex flex-wrap gap-2 w-full">
                                    <label for="state">Tipo de Instituição</label>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="endereco">Endereço</label>
                                <input pInputText id="endereco" type="text" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="complemento">Complemento</label>
                                <input pInputText id="complemento" type="text" />
                            </div>
                            <div class="flex flex-wrap gap-2 w-full">
                                <label for="state">Cidade</label>
                                <p-dropdown id="state" [(ngModel)]="selectedCidadepj" [options]="vardropdownCidades" optionLabel="name" placeholder="Selecione uma cidade" class="w-full"></p-dropdown>
                            </div>
                            <div class="flex flex-col md:flex-row gap-6">
                                <div class="flex flex-wrap gap-2 w-full">
                                    <label for="state">Estado</label>
                                    <p-dropdown id="estado" [(ngModel)]="selectedStatepj" [options]="vardropdownItems" optionLabel="name" placeholder="Selecione um estado" class="w-full"></p-dropdown>
                                </div>
                                <div class="flex flex-wrap gap-2 w-full">
                                    <label for="zip">CEP</label>
                                    <input pInputText id="zip" mask="00000-000" type="text" />
                                </div>
                            </div>
                            <div class="flex flex-col gap-6">
                                <div class="font-semibold text-xl">Carregar o Curriculo</div>
                                <p-fileupload name="demo[]" [multiple]="true" accept="application/pdf" maxFileSize="1000000" mode="advanced" url="../../../curriculos">
                                    <ng-template #empty>
                                        <div>Arraste e solte arquivos aqui para fazer upload.</div>
                                    </ng-template>
                                </p-fileupload>
                            </div>
                            <p-toolbar styleClass="mb-6">
                                <ng-template #start>
                                    <p-button label="Cadastrar" icon="pi pi-check" severity="primary" class="mr-2" (click)="onSubmit()"></p-button>
                                    <p-button label="Listar" severity="primary" (click)="onVoltar()"></p-button>
                                </ng-template>
                            </p-toolbar>
                        </div>
                    </div>
                </div>
            </div>
        </p-fluid>
    `
})
export class FormLayout implements OnInit {
    [x: string]: any;
    nome: string = '';
    cpf: string = '';
    celular: string = '';
    telefone: string = '';
    email1: string = '';
    login: string = '';
    senha: string = '';
    cnpj: string = '';
    confirmasenha: string = '';
    datacadastro: string = '';
    datavalidade: string = '';
    logradouro: string = '';
    complemento: string = '';
    cep: string = '';
    selectedState: any = null;
    selectedCidade: any = null;
    selectedPerfil: any = null;
    selectedTipo: any = null;
    selectedStatus: any = null;
    selectedStatepj: any = null;
    selectedCidadepj: any = null;

    vardropdownItems: any[] = [];

    vardropdownCidades: any[] = [];

    vardropdownTipos: any[] = [];

    vardropdownStatus: any[] = [];

    vardropdownPerfis: any[] = [];

    uploadedFiles: any[] = [];

    constructor(
        private readonly messageService: MessageService,
        private readonly http: HttpClient,
        private readonly dropdownStatus: StatusService,
        private readonly fb: FormBuilder,
        private readonly dropdownPerfil: PerfilService,
        private readonly dropdownTipos: Tiposservice,
        private readonly dropdownCidade: Cidadesservice,
        private readonly dropdonwItems: UFservice,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.carregarStatus();
        this.carregarPerfil();
        this.carregarTipos();
        this.carregarCidades();
        this.carregarUF();
    }

    carregarStatus(): void {
        this.dropdownStatus.getStatus().subscribe({
            next: (data: any[]) => {
                this.vardropdownStatus = data.map((status) => ({
                    name: status.descricao,
                    code: status.id
                }));
            },
            error: (err: any) => {
                console.error('Erro ao carregar status:', err);
            }
        });
    }

    carregarPerfil(): void {
        this.dropdownPerfil.getPerfil().subscribe({
            next: (data: any[]) => {
                this.vardropdownPerfis = data.map((perfil) => ({
                    name: perfil.descricao,
                    code: perfil.id
                }));
            },
            error: (err: any) => {
                console.error('Erro ao carregar perfil:', err);
            }
        });
    }

    carregarTipos(): void {
        this.dropdownTipos.getTipos().subscribe({
            next: (data: any[]) => {
                this.vardropdownTipos = data.map((tipos) => ({
                    name: tipos.descricao,
                    code: tipos.id
                }));
            },
            error: (err: any) => {
                console.error('Erro ao carregar perfil:', err);
            }
        });
    }

    carregarCidades(): void {
        this.dropdownCidade.getCidades().subscribe({
            next: (data: any[]) => {
                this.vardropdownCidades = data.map((cidades) => ({
                    name: cidades.nome,
                    code: cidades.id
                }));
            },
            error: (err: any) => {
                console.error('Erro ao carregar perfil:', err);
            }
        });
    }

    carregarUF(): void {
        this.dropdonwItems.getUF().subscribe({
            next: (data: any[]) => {
                this.vardropdownItems = data.map((uf) => ({
                    name: uf.nome,
                    code: uf.id
                }));
            },
            error: (err: any) => {
                console.error('Erro ao carregar perfil:', err);
            }
        });
    }

    onVoltar() {
        this.router.navigate(['/pages/crud']);
    }

    reloadPage() {
        window.location.reload();
    }

    onSubmit() {
        const pessoaData = {
            pessoa: {
                nome: this.nome,
                telefone: this.telefone,
                email: this.email1,
                dataValidade: this.datavalidade,
                endereco: {
                    logradouro: this.logradouro,
                    cep: this.cep,
                    complemento: this.complemento,
                    cidade: { id: this.selectedCidade?.code }
                },
                pessoaStatus: { id: this.selectedStatus?.code }
            },
            pessoaFisica: {
                cpf: this.cpf,
                celular: this.celular,
                login: this.login,
                senha: this.senha,
                pessoaFisicaTipo: { id: this.selectedTipo?.code },
                perfilAcesso: { id: this.selectedPerfil?.code }
            }
        };

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post('http://localhost:9090/pessoas/cadastrar', pessoaData, { headers }).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso!' });
                this.reloadPage();
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar!' });
            }
        );
    }
}
