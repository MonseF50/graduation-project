import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { authGuard } from './core/gurds/auth/auth.guard';
import { noauthGuard } from './core/gurds/noauth/noauth.guard';

export const routes: Routes = [
    {
        path: '', component: BlankComponent, canActivate: [noauthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then((comp) => comp.HomeComponent),
                title: 'Shop | Home',
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then((comp) => comp.CartComponent),
                title: 'Shop | Cart'
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/porducts/porducts.component').then((comp) => comp.PorductsComponent),
                title: ' Products'
            },
            {
                path: 'productDetailes/:productId',
                loadComponent: () => import('./pages/prodcut-detailes/prodcut-detailes.component').then((comp) => comp.ProdcutDetailesComponent),
                title: 'Shop | Product Detailes'
            },
            {
                path: 'categories',
                loadComponent: () => import('./pages/categories/categories.component').then((comp) => comp.CategoriesComponent),
                title: 'Shop | Categries'
            },
            {
                path: 'brands',
                loadComponent: () => import('./pages/brands/brands.component').then((comp) => comp.BrandsComponent),
                title: 'Shop | Brands'
            },
            {
                path: 'checkOut',
                loadComponent: () => import('./pages/check-out/check-out.component').then((comp) => comp.CheckOutComponent),
                title: 'Shop | Check Out'
            },
            {
                path: 'allorders',
                loadComponent: () => import('./pages/all-orders/all-orders.component').then((comp) => comp.AllOrdersComponent),
                title: 'Shop | All Orders'
            },
        ]
    },
    {
        path: '', component: AuthComponent, canActivate: [authGuard], children: [
            {
                path: 'register',

                loadComponent: () => import('./pages/register/register.component').then((comp) => comp.RegisterComponent),
                title: 'Register'
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then((comp) => comp.LoginComponent),

                title: 'LogIn'
            },
            {
                path: 'forget-password',

                loadComponent: () => import('./pages/forget-password/forget-password.component').then((com) => com.ForgetPasswordComponent),

                title: 'Forget Password'
            },
            {
                path: 'VerifyCode',

                loadComponent: () => import('./pages/verified-code/verified-code.component').then((comp) => comp.VerifiedCodeComponent),

                title: 'Verified Code'
            },
            {
                path: 'ChangePassword',

                loadComponent: () => import('./pages/reset-password/reset-password.component').then((comp) => comp.ResetPasswordComponent),
                title: 'Change Password'
            }
        ]
    },
    {
        path: '**',
        canActivate: [noauthGuard],
        loadComponent: () => import('./pages/not-founded/not-founded.component').then((comp) => comp.NotFoundedComponent),
        title: 'Not Founded'
    }
];