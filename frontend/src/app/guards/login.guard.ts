import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const loginGuard: CanActivateFn = (route, state) => {
  
  const sessionIniciada = inject(CookieService);
  const router = inject(Router);

  if(sessionIniciada.check('token_session')){
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  };
};

export const noLogin: CanActivateFn = (route, state) => {
  
  const sessionIniciada = inject(CookieService);
  const router = inject(Router);

  if(!sessionIniciada.check('token_session')){
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  };
};

export const adminGuard: CanActivateFn = (route, state) => {
  
  const sessionIniciada = inject(CookieService);
  const router = inject(Router);
  const rol = sessionIniciada.get('rol_personal');

  if( rol === 'admin'){
    return true;
  } else {
    router.navigateByUrl('/home');
    return false;
  };
};

export const rolesGuard: CanActivateFn = (route, state) => {
  
  const sessionIniciada = inject(CookieService);
  const router = inject(Router);
  const roles = sessionIniciada.get('rol_personal');

  if(roles === 'compras' || roles === 'admin'){
    return true;
  } else {
    router.navigateByUrl('/home');
    return false;
  };
};

export const editsGuard: CanActivateFn = (route, state) => {
  
  const sessionIniciada = inject(CookieService);
  const router = inject(Router);
  const rol = sessionIniciada.get('rol_personal');
  const number = sessionIniciada.check('editar_id');

  if(rol === 'admin' && number === true){
    return true;
  } else {
    router.navigateByUrl('/home');
    return false;
  };
};

