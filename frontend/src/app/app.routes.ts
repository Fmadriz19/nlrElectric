import { Routes } from '@angular/router';
import { UsersComponent } from './nlr/registre/users/users.component';
import { LoginComponent } from './nlr/login/login.component';
import { RecoverEmailComponent } from './nlr/recover/recover-email/recover-email.component';
import { RecoverCodeComponent } from './nlr/recover/recover-code/recover-code.component';
import { RecoverPassComponent } from './nlr/recover/recover-pass/recover-pass.component';
import { HomeComponent } from './nlr/home/home.component';
import { adminGuard, loginGuard, noLogin, rolesGuard } from './guards/login.guard';
import { UserListComponent } from './nlr/list/user-list/user-list.component';
import { UsersEditComponent } from './nlr/edit/users-edit/users-edit.component';
import { StoreProductComponent } from './nlr/home/store-product/store-product.component';
import { StoreServicesComponent } from './nlr/home/store-services/store-services.component';
import { ViewproductsComponent } from './nlr/view/viewproducts/viewproducts.component';
import { SearchProductsComponent } from './nlr/search-products/search-products.component';
import { ContactanosComponent } from './nlr/home/contactanos/contactanos.component';
import { AboutComponent } from './nlr/home/about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home'},
    { path: 'registre', component: UsersComponent, title: 'Registro de usuario', canActivate: [noLogin]},
    { path: 'login', component: LoginComponent, title: 'Inicio de sesión', canActivate: [noLogin]},
    { path: 'recovere', component: RecoverEmailComponent, title: 'Confirmar Email', canActivate: [noLogin]},
    { path: 'recoverc', component: RecoverCodeComponent, title: 'Codigo de Verificación', canActivate: [noLogin]},
    { path: 'recoverp', component: RecoverPassComponent, title: 'Cambiar contraseña', canActivate: [noLogin]},
    { path: 'edit/user', component: UsersEditComponent, title: 'Editar Usuario', canActivate: [loginGuard]},
    { path: 'list', component: UserListComponent, title: 'Lista de Usuarios', canActivate: [loginGuard, adminGuard]},
    { path: 'products', component: StoreProductComponent, title: 'Tienda de Productos'},
    { path: 'services', component: StoreServicesComponent, title: 'Tienda de Servicios'},
    { path: 'products/view', component: ViewproductsComponent, title: 'Vista del Producto'},
    { path: 'contactanos', component: ContactanosComponent, title: 'Contactanos'},
    { path: 'sobre_nosotros', component: AboutComponent, title: 'Sobre Nosotros'},
    { path: 'search/product', component: SearchProductsComponent, title: 'Explorar Productos', canActivate: [loginGuard, adminGuard]},
]