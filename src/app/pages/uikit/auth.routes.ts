import { FormOperador } from './../uikit/formoperador';
import { FormParticipanteCadastro } from '../uikit/formparticipantecadastro';
import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './access';
import { Login } from './login';
import { Error } from './error';
import { FormLayout } from '../uikit/formlayout';
import { FormCredenciada } from '../uikit/formcredenciada';
import { Formresister } from '../uikit/formresister';
import { FormParticipante } from '../uikit/formparticipante';
import { FormSupervisor } from '../uikit/formsupervisor';
import { FormGestor } from '../uikit/formgestor';
import { FormAdministrador } from '../uikit/formadministrador';
import { FormOperadorCadastro } from '../uikit/formoperadorcadastro';
import { FormSupervisorCadastro } from '../uikit/formsupervisorcadastro';
import { FormGestorCadastro } from '../uikit/formgestorcadastro';



export default [
    { path: 'access', component: AccessDeniedComponent },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'formlayout', component: FormLayout },
    { path: 'formcredenciada', component: FormCredenciada },
    { path: 'formresister', component: Formresister },
    { path: 'formparticipante', component: FormParticipante },
    { path: 'formparticipantecadastro', component: FormParticipanteCadastro },
    { path: 'formsupervisor', component: FormSupervisor },
    { path: 'formgestor', component: FormGestor },
    { path: 'formadministrador', component: FormAdministrador },
    { path: 'formoperador', component: FormOperador },
    { path: 'formoperadorcadastro', component: FormOperadorCadastro },
    { path: 'formsupervisorcadastro', component: FormSupervisorCadastro },
    { path: 'formgestorcadastro', component: FormGestorCadastro },

] as Routes;
