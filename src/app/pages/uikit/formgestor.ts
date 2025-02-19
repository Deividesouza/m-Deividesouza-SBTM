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


@Component({
    selector: 'app-formgestor',
    standalone: true,
    providers: [MessageService],
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, FileUploadModule, ToastModule],
    template: `<p-fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-3/4">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Informações Gerenciais</div>
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
                    <div class="flex flex-col gap-6">
                        <div class="font-semibold text-xl">Upload de Arquivo</div>
                            <p-fileupload name="demo[]" (onUpload)="onUpload($event)" [multiple]="true"
                                accept="image/*" maxFileSize="1000000" mode="advanced"
                                url="http://localhost:8080/api/upload"> <!-- Alterar para sua API real -->
                                <ng-template #empty>
                                    <div>Arraste e solte arquivos aqui para fazer upload.</div>
                                </ng-template>
                            </p-fileupload>
                    </div>
                </div>

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
                    <div class="flex flex-col gap-6">
                        <div class="font-semibold text-xl">Upload de Arquivo</div>
                            <p-fileupload name="demo[]" (onUpload)="onUpload($event)" [multiple]="true"
                                accept="image/*" maxFileSize="1000000" mode="advanced"
                                url="http://localhost:8080/api/upload"> <!-- Alterar para sua API real -->
                                <ng-template #empty>
                                    <div>Arraste e solte arquivos aqui para fazer upload.</div>
                                </ng-template>
                            </p-fileupload>
                    </div>
                </div>
            </div>
        </div>
    </p-fluid>`
})
export class FormGestor {
    uploadedFiles: any [] = [];
    constructor(private messageService: MessageService) {}
    onUpload(event: any){
        for (const file of event.files){
            this.uploadedFiles.push(file);
        }
        this.messageService.add({ severity: 'info', summary: 'Sucesso', detail: 'Arquivo enviado com sucesso' });
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
}
