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
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-formlayout',
    standalone: true,
    providers: [MessageService, provideNgxMask()],
    imports: [InputTextModule, FluidModule, ButtonModule, DropdownModule, FormsModule, TextareaModule, FileUploadModule, ToastModule, ToolbarModule, NgxMaskDirective],
    templateUrl:'formlayout.componente.html' ,


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
this.http.post(`${environment.url}/pessoas/cadastrar`, pessoaData, { headers }).subscribe(
    (response) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso!' });
        this.reloadPage();
    },
    (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar!' });
        console.error('Erro na requisição:', error); // Adicione um log para depuração
    }
);
    }

}
