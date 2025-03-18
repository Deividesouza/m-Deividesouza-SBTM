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


export default [
    { path: 'access', component: AccessDeniedComponent },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'formlayout', component: FormLayout },
    { path: 'formcredenciada', component: FormCredenciada },
    { path: 'formresister', component: Formresister },
    { path: 'formparticipante', component: FormParticipante },
    { path: 'formsupervisor', component: FormSupervisor },
    { path: 'formgestor', component: FormGestor },

] as Routes;
