import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

    @Injectable({
    providedIn: 'root'
    })
    export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const requiredRole = route.data['role'];
        const currentUserRole = this.authService.getPerfil();

        if (this.authService.getUsuarioLogado() && currentUserRole === requiredRole) {
        return true;
        } else {
            this.router.navigate(['/auth/access']);
        return false;
        }
    }
    }
