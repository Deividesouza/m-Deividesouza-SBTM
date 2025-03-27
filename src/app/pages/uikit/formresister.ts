import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importar HttpClient
import { Router } from '@angular/router';


@Component({
    selector: 'app-formresister',
    standalone: true,
    providers: [MessageService],
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, FileUploadModule, ToastModule, ToolbarModule],
    template: `<p-fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-3/4">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Informações de Registros Pessoais</div>
                        <div class="flex flex-col gap-2">
                            <label for="name">Nome</label>
                            <input pInputText id="name" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cpf">CPF</label>
                            <input pInputText id="cpf" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="celular">Celular</label>
                            <input pInputText id="celular" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Email</label>
                            <input pInputText id="email1" type="text" />
                        </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Perfil de Acesso</label>
                            <p-select id="state" [(ngModel)]="dropdownPerfil" [options]="dropdownPerfis" optionLabel="name" placeholder="Selecione um Perfil" class="w-full"></p-select>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Status</label>
                            <p-select id="state" [(ngModel)]="dropdownStatus" [options]="dropdownStatuss" optionLabel="name" placeholder="Selecione um Status" class="w-full"></p-select>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Pessoa Fisica Tipo</label>
                            <p-select id="state" [(ngModel)]="dropdownTipo" [options]="dropdownTipos" optionLabel="name" placeholder="Selecione o Tipo" class="w-full"></p-select>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="datacadastro">Data Cadastro :</label>
                            <input type="date" id="datacadastro" name="datacadastro">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="datavalidade">Data Validade :</label>
                            <input type="date" id="datavalidade" name="datavalidade">
                        </div>
                    </div>
                </div>

                <p-toolbar styleClass="mb-2">
                            <div class="card flex flex-col gap-2" >
                                <div class="font-semibold text-xl">Upload de Currículo</div>
                                <input type="file" (change)="onFileSelected($event)" />
                                <p-button label="Upload" (click)="onUpload()"></p-button>
                            </div>
                </p-toolbar>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Informações de Localização</div>
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
                        <p-select id="state" [(ngModel)]="dropdownCidade" [options]="dropdownCidades" optionLabel="name" placeholder="Selecione uma cidade" class="w-full"></p-select>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Estado</label>
                            <p-select id="state" [(ngModel)]="dropdownItem" [options]="dropdownItems" optionLabel="name" placeholder="Selecione um estado" class="w-full"></p-select>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="zip">CEP</label>
                            <input pInputText id="zip" type="text" />
                        </div>
                    </div>
                </div>

                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Informações Profissionais</div>
                        <div class="flex flex-col gap-2">
                            <label for="name">Nome da Empresa</label>
                            <input pInputText id="name" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="cnpj">CNPJ</label>
                            <input pInputText id="cnpj" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="celular">Telefone de Contato</label>
                            <input pInputText id="celular" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="email1">Email</label>
                            <input pInputText id="email1" type="text" />
                        </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Tipo de Instituição</label>
                            <p-select id="state" [(ngModel)]="dropdownInstituicao" [options]="dropdownInstituicoes" optionLabel="name" placeholder="Selecione um Tipo" class="w-full"></p-select>
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
                        <p-select id="state" [(ngModel)]="dropdownCidade" [options]="dropdownCidades" optionLabel="name" placeholder="Selecione uma cidade" class="w-full"></p-select>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="state">Estado</label>
                            <p-select id="state" [(ngModel)]="dropdownItem" [options]="dropdownItems" optionLabel="name" placeholder="Selecione um estado" class="w-full"></p-select>
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="zip">CEP</label>
                            <input pInputText id="zip" type="text" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="flex gap-2 mt-4">
            <p-button label="Salvar" (click)="onSalvar()"></p-button>
            <p-button label="Voltar" severity="secondary" (click)="onVoltar()"></p-button>
        </div>
    </p-fluid>`
})


export class Formresister {

    uploadedFiles: any [] = [];
    selectedFile: File | null = null;

    constructor(
            private messageService: MessageService,
            private http: HttpClient,
           // private fb: FormBuilder    //para a mascara)
            private router: Router
    ){}

    onVoltar() {
        this.router.navigate(['/pages/crud']);
    }

    onSalvar() {
        // Lógica para salvar o formulário
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro salvo com sucesso!' });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0] as File;
    }

    onUpload() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            // Faz o upload do arquivo
            this.http.post('http://localhost:8080/pessoas/cadastrar', formData).subscribe(

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

        dropdownItems = [
            { name: 'Bahia', code: '1' },
            { name: 'Sergipe', code: '2' },
            { name: 'Alagoas', code: '3' },
            { name: 'Pernambuco', code: '4' },
            { name: 'Rio Grande do Norte', code: '5' }
        ];
        dropdownItem = null;

        dropdownCidades = [
            { name: 'Salvador', code: '1' },
            { name: 'Aracaju', code: '2' },
            { name: 'Maceio', code: '3' },
            { name: 'Recife', code: '4' },
            { name: 'Fortaleza', code: '5' }
        ];
        dropdownCidade= null;

        dropdownPerfis = [
            { name: 'Admin', code: '1' },
            { name: 'Participante', code: '2' },
            { name: 'Usuario', code: '3' },
            { name: 'Gerente', code: '4' },
            { name: 'Gerente OM', code: '5' }
        ];
        dropdownPerfil = null;

        dropdownTipos = [
            { name: 'Admin', code: '1' },
            { name: 'Participante', code: '2' },
            { name: 'Usuario', code: '3' },
            { name: 'Gerente', code: '4' },
            { name: 'Gerente OM', code: '5' }
        ];
        dropdownTipo = null;

        dropdownInstituicoes = [
            { name: 'OM', code: '1' },
            { name: 'Instituto Federal', code: '2' },
            { name: 'Universidade', code: '3' },
            { name: 'Faculdade', code: '4' },
            { name: 'Escola Estadual, Municipal ou Federal', code: '5' }
        ];
        dropdownInstituicao = null;

        dropdownStatuss = [
            { name: 'Ativo', code: '1' },
            { name: 'Suspenso', code: '2' },
            { name: 'Vencido', code: '3' },
            { name: 'Pendente', code: '4' },
            { name: 'Excluído', code: '5' }
        ];
        dropdownStatus = null;
}
