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
    selector: 'app-formgestorcadastro',
    standalone: true,
    providers: [MessageService, provideNgxMask()],
    imports: [InputTextModule, FluidModule, ButtonModule, DropdownModule, FormsModule, TextareaModule, FileUploadModule, ToastModule, ToolbarModule, NgxMaskDirective],
    templateUrl:'formgestorcadastro.componente.html' ,


})
export class FormGestorCadastro implements OnInit {

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
    descricao: string = '';
    cep: string = '';
    tipoinstituicao: string = '';
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
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.inicializarFormulario();
        this.carregarStatus();
        this.carregarPerfil();
        this.carregarTipos();
        this.carregarCidades();
        this.carregarUF();
    }

    inicializarFormulario() {
        this.formulario = this.fb.group({
            // Outros campos do formulário...
            informacoesProfissionais: this.fb.array([]) // Inicializa um FormArray vazio
        });
        // Adiciona um campo de informação profissional inicial
        this.adicionarInformacaoProfissional();
    }

    get informacoesProfissionais(): FormArray {
        return this.formulario.get('informacoesProfissionais') as FormArray;
    }

    adicionarInformacaoProfissional() {
        const informacaoProfissionalGroup = this.fb.group({
            nomeempresa: [''],
            cnpj: [''],
            telefoneempresa: [''],
            emailempresa: [''],
            tipoinstituicao: [''],
            descricao: [''],
            logradouroempresa: [''],
            complementoempresa: ['']
        });
        this.informacoesProfissionais.push(informacaoProfissionalGroup);
    }

    removerInformacaoProfissional(index: number) {
        this.informacoesProfissionais.removeAt(index);
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
                this.vardropdownPerfis = data
                    .filter(perfil => perfil.id === 1 || perfil.id === 4 || perfil.id === 5 || perfil.id === 6) // [Participante 1, Operador 4, Supervisor 5, Gestor 6] pelos IDs desejados
                    .map((perfil) => ({
                        name: perfil.descricao,
                        code: perfil.id
                    }));

                if (this.vardropdownPerfis.length === 0) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Aviso',
                        detail: 'Nenhum perfil disponível para cadastro',
                        life: 3000
                    });
                }
            },
            error: (err: any) => {
                console.error('Erro ao carregar perfis:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar perfis',
                    life: 3000
                });
            }
        });
    }

    carregarTipos(): void {
        this.dropdownTipos.getTipos().subscribe({
            next: (data: any[]) => {
                // Filtra apenas os tipos desejados (ajuste os IDs conforme sua regra de negócio)
                this.vardropdownTipos = data
                    .filter(tipo => [1, 4, 5, 6].includes(tipo.id)) //  [Participante 1, Operador 4, Supervisor 5, Gestor 6] pelos IDs desejados
                    .map((tipos) => ({
                        name: tipos.descricao,
                        code: tipos.id
                    }));
            },
            error: (err: any) => {
                console.error('Erro ao carregar tipos:', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível carregar os tipos de pessoa',
                    life: 3000
                });
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

    onVoltar() {
        this.router.navigate(['/uikit/formgestor']);
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

            this.http.post(`${environment.url}/pessoas/fisicas/cadastrar`, payload).subscribe(
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

            // Validação do perfil
        if (this.selectedPerfil?.code !== 1 && this.selectedPerfil?.code !== 4 && this.selectedPerfil?.code !== 5 && this.selectedPerfil?.code !== 6) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Selecione um perfil válido (Administrador ou Operador OM)',
                life: 3000
            });
            return;
        }

        // Restante do código de envio...
        const payload = {
            // ... outros campos ...
            perfilAcesso: { id: this.selectedPerfil?.code }
        };


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
                pessoaFisicaTipo: { id: this.selectedTipo?.code },
                perfilAcesso: { id: this.selectedPerfil?.code }
            }
        };
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post('http://localhost:8080/pessoas/cadastrar', pessoaData, { headers }).subscribe(

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
