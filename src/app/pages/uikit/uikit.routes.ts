import { FormParticipanteCadastro } from './formparticipantecadastro';
import { FormCredenciada } from './formcredenciada';
import { FormParticipante } from './formparticipante';
import { FormOperador } from './formoperador';
import { FormSupervisor } from './formsupervisor';
import { FormGestor } from './formgestor';
import { Routes } from '@angular/router';
import { Button } from './button';
import { File } from './file';
import { FormLayout } from './formlayout';
import { Formresister } from './formresister';
import { FormAdministrador } from './formadministrador';
import { FormOperadorCadastro } from './formoperadorcadastro';
import { FormSupervisorCadastro } from './formsupervisorcadastro';
import { FormGestorCadastro } from './formgestorcadastro';


export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: Button },
    { path: 'file', data: { breadcrumb: 'File' }, component: File },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayout },
    { path: 'formresister', data: { breadcrumb: 'Form Resister' }, component: Formresister },
    { path: 'formgestor', data: { breadcrumb: 'Form Gestor' }, component: FormGestor },
    { path: 'formsupervisor', data: { breadcrumb: 'Form Supervisor' }, component: FormSupervisor },
    { path: 'formoperador', data: { breadcrumb: 'Form Operador' }, component: FormOperador },
    { path: 'formparticipante', data: { breadcrumb: 'Form Participante' }, component: FormParticipante },
    { path: 'formparticipantecadastro', data: { breadcrumb: 'Form Participante Cadastro' }, component: FormParticipanteCadastro },
    { path: 'formcredenciada', data: { breadcrumb: 'Form Credenciada' }, component: FormCredenciada },
    { path: 'formadministrador', data: { breadcrumb: 'Form Administrador' }, component: FormAdministrador },
    { path: 'formoperadorcadastro', data: { breadcrumb: 'Form Operador Cadastro' }, component: FormOperadorCadastro },
    { path: 'formsupervisorcadastro', data: { breadcrumb: 'Form Supervisor Cadastro' }, component: FormSupervisorCadastro },
    { path: 'formgestorcadastro', data: { breadcrumb: 'Form Gestor Cadastro' }, component: FormGestorCadastro },



    { path: '**', redirectTo: '../auth/error.ts' }
] as Routes;
