import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';    //para a mascara
import { Component } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
    selector: 'app-formlayout',
    standalone: true,
    providers: [MessageService, provideNgxMask()],  //para a mascara
    imports: [
        InputTextModule,
        FluidModule,
        ButtonModule,
        DropdownModule, // Corrigido para DropdownModule
        FormsModule,
        TextareaModule,
        FileUploadModule,
        ToastModule,
        ToolbarModule,
        CommonModule,
        ReactiveFormsModule,
        NgxMaskDirective     //para a mascara
    ],
    template: `<p-fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-3/4">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Informações Pessoais</div>
                    <div class="flex flex-col gap-2">
                        <label for="nome">Nome</label>
                        <input pInputText id="name" [(ngModel)]="nome" type="text" />
                    </div>

                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-col gap-2 w-full">
                            <label for="cpf">CPF</label>
                            <input pInputText id="cpf" mask="CPF_CNPJ" [(ngModel)]="cpf" type="text" />  <!--Mascara cp/cnpj -->
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="celular">Celular</label>
                            <input pInputText id="celular" mask="(00) 00000 0000" [(ngModel)]="celular" type="text" />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="telefone">Telefone</label>
                            <input pInputText id="telefone" mask="(00) 0000 0000" [(ngModel)]="telefone" type="text" />  <!--Mascara tel -->
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                    <div class="flex flex-col gap-2 w-full">
                            <label for="email">Email</label>
                            <input pInputText id="email" placeholder="exemplo@dominio.com" [(ngModel)]="email1" required email />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="login">Login</label>
                            <input pInputText id="login" [(ngModel)]="login" type="text" />
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-col gap-2 w-full">
                            <label for="senha">Senha</label>
                            <input pInputText id="senha" mask="" [(ngModel)]="senha" type="text" />
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="confirmasena">Confirmar a Senha</label>
                            <input pInputText id="confirmasenha" mask="" [(ngModel)]="confirmasenha" type="text" />
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Perfil de Acesso</label>
                            <p-dropdown id="state" [(ngModel)]="selectedPerfil" [options]="dropdownPerfis" optionLabel="name" placeholder="Selecione um Perfil" class="w-full"></p-dropdown>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Pessoa Fisica Tipo</label>
                            <p-dropdown id="state" [(ngModel)]="selectedTipo" [options]="dropdownTipos" optionLabel="name" placeholder="Selecione o Tipo" class="w-full"></p-dropdown>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Status</label>
                            <p-dropdown id="state" [(ngModel)]="selectedStatus" [options]="dropdownStatuss" optionLabel="name" placeholder="Selecione um Status" class="w-full"></p-dropdown>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-col gap-2 w-full">
                            <p-toolbar styleClass="mb-2">
                                    <label for="datacadastro">Data Cadastro :</label>
                                    <input type="date" id="datacadastro" [(ngModel)]="datacadastro" />
                            </p-toolbar>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <p-toolbar styleClass="mb-2">
                                <label for="datavalidade">Data Validade :</label>
                                <input type="date" id="datavalidade" [(ngModel)]="datavalidade" />
                            </p-toolbar>
                        </div>
                    </div>

                    <p-toolbar styleClass="mb-2">
                                <div class="font-semibold text-xl">Upload de Currículo</div>
                                <input type="file" (change)="onFileSelected($event)" />
                                <p-button label="Upload" (click)="onUpload()"></p-button>
                    </p-toolbar>
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
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-3/5">
                            <label for="cidade">Cidade</label>
                            <p-dropdown id="cidade" [(ngModel)]="selectedCidade" [options]="dropdownCidades" optionLabel="name" placeholder="Selecione uma cidade" class="w-full"></p-dropdown>
                        </div>
                        <div class="flex flex-wrap gap-2 w-1/5">
                            <label for="state">Estado</label>
                            <p-dropdown id="state" [(ngModel)]="selectedState" [options]="dropdownItems" optionLabel="name" placeholder="Selecione um estado" class="w-full"></p-dropdown>
                        </div>
                        <div class="flex flex-wrap gap-2 w-1/5">
                            <label for="cep">CEP</label>
                            <input pInputText id="cep" mask= "00000-000" [(ngModel)]="cep" type="text" /> <!--Mascara cep -->
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
                                <input pInputText id="cnpj" mask="CPF_CNPJ" type="text" />
                            </div>
                            <div class="flex flex-col gap-2 w-full">
                                <label for="celular">Telefone de Contato</label>
                                <input pInputText id="celular" mask="(00) 0000 0000" type="text" />
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
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-3/5">
                            <label for="cidade">Cidade</label>
                            <p-dropdown id="cidade" [(ngModel)]="selectedCidade" [options]="dropdownCidades" optionLabel="name" placeholder="Selecione uma cidade" class="w-full"></p-dropdown>
                        </div>
                        <div class="flex flex-wrap gap-2 w-1/5">
                            <label for="state">Estado</label>
                            <p-dropdown id="state" [(ngModel)]="selectedState" [options]="dropdownItems" optionLabel="name" placeholder="Selecione um estado" class="w-full"></p-dropdown>
                        </div>
                        <div class="flex flex-wrap gap-2 w-1/5">
                            <label for="cep">CEP</label>
                            <input pInputText id="cep" mask= "00000-000" [(ngModel)]="cep" type="text" /> <!--Mascara cep -->
                        </div>
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
    </p-fluid>`
})

export class FormLayout {
    nome: string = '';
    cpf: string = '';
    celular: string = '';
    telefone: string = '';
    email1: string = '';
    login: string = '';
    senha: string = '';
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

    dropdownItems = [
        { name: 'Bahia', code: '1' },
        { name: 'Sergipe', code: '2' },
        { name: 'Alagoas', code: '3' },
        { name: 'Pernambuco', code: '4' },
        { name: 'Rio Grande do Norte', code: '5' }
    ];

    dropdownCidades = [
        { name: 'Salvador', code: '1' },
        { name: 'Aracaju', code: '2' },
        { name: 'Maceio', code: '3' },
        { name: 'Recife', code: '4' },
        { name: 'Fortaleza', code: '5' }
    ];

    dropdownPerfis = [
        { name: 'Admin', code: '1' },
        { name: 'Participante', code: '2' },
        { name: 'Usuario', code: '3' },
        { name: 'Gerente', code: '4' },
        { name: 'Gerente OM', code: '5' }
    ];

    dropdownTipos = [
        { name: 'Admin', code: '1' },
        { name: 'Participante', code: '2' },
        { name: 'Usuario', code: '3' },
        { name: 'Gerente', code: '4' },
        { name: 'Gerente OM', code: '5' }
    ];

    dropdownStatuss = [
        { name: 'Ativo', code: '1' },
        { name: 'Suspenso', code: '2' }
    ];

            uploadedFiles: any[] = [];
            selectedFile: File | null = null;

    constructor(
        private messageService: MessageService,
        private http: HttpClient,
        private fb: FormBuilder,    //para a mascara
        private router: Router
    ) {}

    reloadPage() {
        window.location.reload();
    }


    onVoltar() {
        this.router.navigate(['/pages/crud']);
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0] as File;
    }

    onUpload() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            // Faz o upload do arquivo
            this.http.post('http://10.112.61.74:9090/pessoas/cadastrar', formData).subscribe(
                (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Arquivo enviado com sucesso!' });
                },
                (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar arquivo!' });
                }
            );
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Nenhum arquivo selecionado!' });
        }
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
        this.http.post('http://10.112.61.74:9090/pessoas/cadastrar', pessoaData, { headers }).subscribe(
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
