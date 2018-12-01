import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LoginComponent} from './Components/login/login.component';
import {RegisterComponent} from './Components/register/register.component';
import {PetsComponent} from './Components/pets/pets.component';
import {NavigationComponent} from "./Components/navigation/navigation.component";
import {GuestGuard} from "./Guards/guest.guard";
import {AuthGuard} from "./Guards/auth.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWTHelper} from "./Helpers/jwt.helper";
import {AuthenticationService} from "./Services/authentication.service";

import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {NgProgressRouterModule} from '@ngx-progressbar/router';

import {CollapseModule} from 'ngx-bootstrap/collapse';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PetEditComponent} from './Components/pet-edit/pet-edit.component';

import {ModalModule} from 'ngx-bootstrap';
import {NgSelectModule} from "@ng-select/ng-select";
import {JwtInterceptor} from "./Interceptors/jwt";
import {PetComponent} from "./Components/pet/pet.component";

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard],
        canActivateChild: [GuestGuard],
    },
    {
        path: 'pets',
        component: PetsComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: 'pets',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NavigationComponent,
        PetsComponent,
        PetComponent,
        PetEditComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgProgressModule,
        RouterModule.forRoot(appRoutes),
        NgProgressModule.forRoot({
            color: '#fff'
        }),
        NgProgressHttpModule.forRoot(),
        NgProgressRouterModule.forRoot(),
        CollapseModule.forRoot(),
        ReactiveFormsModule,
        ModalModule.forRoot(),
        NgSelectModule,
        FormsModule
    ],
    providers: [
        GuestGuard,
        AuthGuard,
        JWTHelper,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    entryComponents: [
        PetEditComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
