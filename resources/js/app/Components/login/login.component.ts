import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../Services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    returnURL: string;
    loginForm: FormGroup;
    submitted = false;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    login() {

        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {
            this.router.navigate([this.returnURL]);
        });
    }

}
