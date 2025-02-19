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
    selector: 'app-formsupervisor',
    standalone: true,
    providers: [MessageService],
    imports: [InputTextModule, FluidModule, ButtonModule, SelectModule, FormsModule, TextareaModule, FileUploadModule, ToastModule],
    template: `<p-fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-3/4">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Informações Supervisão</div>
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
                        <div class="flex flex-col gap-2">
                            <label for="perfilacesso">Perfil de Acesso</label>
                            <input pInputText id="perfilacesso" type="text" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="status">Status</label>
                            <input pInputText id="status" type="text" />
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex flex-col gap-2">
                            <label for="datacadastro">Data Cadastro :</label>
                            <input type="date" id="datacadastro" name="datacadastro">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </p-fluid>`
})
export class FormSupervisor {
    uploadedFiles: any [] = [];
    constructor(private messageService: MessageService) {}
    onUpload(event: any){
        for (const file of event.files){
            this.uploadedFiles.push(file);
        }
        this.messageService.add({ severity: 'info', summary: 'Sucesso', detail: 'Arquivo enviado com sucesso' });
    }

}
