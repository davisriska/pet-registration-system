import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../Services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    returnURL: string;
    registerForm: FormGroup;
    submitted = false;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.compose([Validators.required,])],
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    register() {5

        // TODO: Add errors handling

        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.authenticationService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.password_confirmation).subscribe((response) => {
            this.router.navigate([this.returnURL]);
        });
    }

}
