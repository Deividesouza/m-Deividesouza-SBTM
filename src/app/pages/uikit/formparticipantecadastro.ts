import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importar HttpClient
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'; // Corrigido para DropdownModule
import { FormBuilder, FormsModule, FormArray, FormControl, FormGroup } from '@angular/forms';
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
import { AuthService } from '../service/auth.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-formparticipantecadastro',
    standalone: true,
    providers: [MessageService, provideNgxMask()],
    imports: [InputTextModule, FluidModule, ButtonModule, DropdownModule, FormsModule, TextareaModule, FileUploadModule, ToastModule, ToolbarModule, NgxMaskDirective],
    templateUrl:'formparticipantecadastro.componente.html' ,


})
export class FormParticipanteCadastro implements OnInit {

    [x: string]: any;
    nome: string = '';
    cpf: string = '';
    celular: string = '';
    telefone: string = '';
    telefoneempresa: string = '';
    email: string = '';
    emailempresa: string = '';
    login: string = '';
    senha: string = '';
    cnpj: string = '';
    confirmasenha: string = '';
    datacadastro: string = '';
    datavalidade: string = '';
    logradouro: string = '';
    logradouroempresa: string = '';
    complemento: string = '';
    complementoempresa: string = '';
    descricaoempresa: string = '';
    cep: string = '';
    datapraca: string = '';
    datanascimento: string = '';
    postgrade: string = '';
    databaixa: string = '';
    tipoinstituicao: string = '';
    nomeempresa: string = '';
    cargo: string = '';
    datainicioemprego: string = '';
    datasaidaemprego: string = '';
    instituicao: string = '';
    curso: string = '';
    nivel:  string = '';
    emailinstituicao: string = '';
    telefoneinstituicao: string = '';
    datainiciocurso: string = '';
    dataconclusaocurso: string = '';
    ativareserva: string = '';
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
    vardropdownpostgrad: any[] = [];
    vardropdownativareserva: any[] = [];
    uploadedFiles: any[] = [];
    selectedFile: File | null = null;

    formulario!: FormGroup;

    constructor(
        private readonly messageService: MessageService,
        private readonly http: HttpClient,
        private readonly dropdownStatus: StatusService,
        private readonly fb: FormBuilder,
        private readonly dropdownPerfil: PerfilService,
        private readonly dropdownTipos: Tiposservice,
        private readonly dropdownCidade: Cidadesservice,
        private readonly dropdownItems: UFservice,
        private readonly router: Router,
        private readonly authService: AuthService
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
                // Filtra apenas o perfil de Participante (código 1 no seu exemplo)
                this.vardropdownPerfis = data
                    .filter(perfil => perfil.id === 1) // Filtra apenas o perfil com ID 1
                    .map((perfil) => ({
                        name: perfil.descricao,
                        code: perfil.id
                    }));

                // Define automaticamente o perfil como Participante
                if (this.vardropdownPerfis.length > 0) {
                    this.selectedPerfil = this.vardropdownPerfis[0];
                }
            },
            error: (err: any) => {
                console.error('Erro ao carregar perfil:', err);
            }
        });
    }

    carregarTipos(): void {
        this.dropdownTipos.getTipos().subscribe({
            next: (data: any[]) => {
                this.vardropdownTipos = data
                    .filter(tipos => tipos.id === 1) // Filtra apenas o perfil com ID 1
                    .map((tipos) => ({
                    name: tipos.descricao,
                    code: tipos.id
                }));
                if (this.vardropdownTipos.length > 0) {
                    this.selectedTipo = this.vardropdownTipos[0];
                }
            },
            error: (err: any) => {
                console.error('Erro ao carregar tipos:', err);
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
        this.dropdownItems.getUF().subscribe({
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


    reloadPage() {
        window.location.reload();
    }

    atualizarContador() {
        // Esta função é chamada sempre que o valor do input muda
        // O contador é atualizado automaticamente devido ao binding {{ descricao.length }}
    }
    onSubmit() {
        if (this.formulario.valid) {
            const payload = {
                ...this.formulario.value,
                informacoesProfissionais: this.formulario.value.informacoesProfissionais
            };

            this.http.post(`${environment.url}/pessoas/participantes/cadastrar`, payload).subscribe(
                (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Cadastro realizado com sucesso!',
                        life: 3000
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Erro ao cadastrar!',
                        life: 3000
                    });
                }
            );
        }

        const pessoaData = {
            pessoa: {
                nome: this.nome,
                telefone: this.telefone,
                email: this.email,
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
                    //  pessoaFisicaTipo: { id: this.selectedTipo?.code },
                pessoaFisicaTipo: { id:1},
                    //  perfilAcesso: { id: this.selectedPerfil?.code },
                perfilAcesso: { id:1}  //participante
            },
            pessoaparticipante:{
                dataPraca: this.datapraca,
                dataNasc: this.datanascimento,
                dataBaixa: this.databaixa,
                postgrad: this.postgrade,
                ativaReserva: this.vardropdownativareserva,
                    formacoesacademicas:{
                        instituicao: this.instituicao,
                        curso: this.curso,
                        nivel: this.nivel,
                        anoInicio: this.datainiciocurso,
                        anoConclusao: this.dataconclusaocurso,
                        email: this.emailinstituicao,
                        telefone: this.telefoneinstituicao,
                    },
                    experiencias:{

                            empresa: this.nomeempresa,
                            cargo: this.cargo,
                            dataInicio: this.datainicioemprego,
                            dataFim: this.datasaidaemprego,
                            email:this.emailempresa ,
                            telefone: this.telefoneempresa,
                            descricao: this.descricaoempresa,

                    }

            }
        };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(`${environment.url}/pessoas/participantes/cadastrar`, pessoaData, { headers }).subscribe(

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
