import { Routes } from '@angular/router';
import { UsersComponent } from './nlr/registre/users/users.component';
import { LoginComponent } from './nlr/login/login.component';
import { RecoverEmailComponent } from './nlr/recover/recover-email/recover-email.component';
import { RecoverCodeComponent } from './nlr/recover/recover-code/recover-code.component';
import { RecoverPassComponent } from './nlr/recover/recover-pass/recover-pass.component';
import { HomeComponent } from './nlr/home/home.component';
import { ProductsComponent } from './nlr/registre/products/products.component';
import { ProductsEditComponent } from './nlr/edit/products-edit/products-edit.component';
import { adminGuard, loginGuard, noLogin, rolesGuard } from './guards/login.guard';
import { UserListComponent } from './nlr/list/user-list/user-list.component';
import { UsersEditComponent } from './nlr/edit/users-edit/users-edit.component';
import { NewUserComponent } from './nlr/registre/new-user/new-user.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Home'},
    { path: 'registre', component: UsersComponent, title: 'Registro de usuario', canActivate: [noLogin]},
    { path: 'login', component: LoginComponent, title: 'Inicio de sesión', canActivate: [noLogin]},
    { path: 'recovere', component: RecoverEmailComponent, title: 'Confirmar Email', canActivate: [noLogin]},
    { path: 'recoverc', component: RecoverCodeComponent, title: 'Codigo de Verificación', canActivate: [noLogin]},
    { path: 'recoverp', component: RecoverPassComponent, title: 'Cambiar contraseña', canActivate: [noLogin]},
    { path: 'registre/products', component: ProductsComponent, title: 'Registro de Productos', canActivate: [loginGuard, rolesGuard]},
    { path: 'registre/user', component: NewUserComponent, title: 'Registrar nuevo usuario', canActivate: [loginGuard, adminGuard]},
    { path: 'edit/product', component: ProductsEditComponent, title: 'Editar Producto', canActivate: [loginGuard, rolesGuard]},
    { path: 'edit/user', component: UsersEditComponent, title: 'Editar Usuario', canActivate: [loginGuard]},
    { path: 'list', component: UserListComponent, title: 'Lista de Usuarios', canActivate: [loginGuard, adminGuard]},
]