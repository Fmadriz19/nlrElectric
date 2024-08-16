import { Routes } from '@angular/router';
import { UsersComponent } from './nlr/registre/users/users.component';
import { LoginComponent } from './nlr/login/login.component';
import { RecoverEmailComponent } from './nlr/recover/recover-email/recover-email.component';
import { RecoverCodeComponent } from './nlr/recover/recover-code/recover-code.component';
import { RecoverPassComponent } from './nlr/recover/recover-pass/recover-pass.component';

export const routes: Routes = [
    { path: '', component: UsersComponent, title: 'Home'},
    { path: 'registre', component: UsersComponent, title: 'Registro de usuario'},
    { path: 'login', component: LoginComponent, title: 'Inicio de sesión'},
    { path: 'recovere', component: RecoverEmailComponent, title: 'Confirmar Email'},
    { path: 'recoverc', component: RecoverCodeComponent, title: 'Codigo de Verificación'},
    { path: 'recoverp', component: RecoverPassComponent, title: 'Cambiar contraseña'}
];
