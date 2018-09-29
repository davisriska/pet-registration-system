<template>
    <form v-on:change="validate">
        <div class="col">
            <div class="row">
                <div class="col">
                    <md-field :class="getValidationClass('email')">
                        <md-icon class="md-primary">alternate_email</md-icon>
                        <label>Email</label>
                        <md-input v-model="user.email"></md-input>
                        <span class="md-error" v-if="!$v.user.email.required">The email is required</span>
                        <span class="md-error" v-if="!$v.user.email.email">The email is not valid</span>
                        <span class="md-error" v-for="error in errors.email">
                            {{ error}}
                        </span>
                    </md-field>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <md-field :class="getValidationClass('password')">
                        <md-icon class="md-primary">lock</md-icon>
                        <label>Password</label>
                        <md-input v-model="user.password" type="password"></md-input>
                        <span class="md-error" v-if="!$v.user.password.required">The password is required</span>
                        <span class="md-error" v-else-if="!$v.user.password.minlength">The passwords min length is 6</span>
                        <span class="md-error" v-for="error in errors.password">
                            {{ error}}
                        </span>
                    </md-field>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <md-field :class="getValidationClass('password_confirmation')">
                        <md-icon class="md-primary">lock</md-icon>
                        <label>Password</label>
                        <md-input v-model="user.password_confirmation" type="password"></md-input>
                        <span class="md-error" v-if="!$v.user.password_confirmation.sameAs">The passwords must match</span>
                        <span class="md-error" v-for="error in errors.password_confirmation">
                            {{ error}}
                        </span>
                    </md-field>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <md-button class="md-raised md-accent float-right" @click="register">REGISTER</md-button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import axios from '../HTTP';
    import { validationMixin } from 'vuelidate';
    import {
        required,
        email,
        minLength,
        sameAs
    } from 'vuelidate/lib/validators';

    export default {
        name: "Register",
        mixins: [validationMixin],
        data: () => ({
            sending: false,
            user: {
                email: null,
                password: null
            },
            errors: {}
        }),
        validations: {
            user: {
                email: {
                    required, email
                },
                password: {
                    required, minLength: minLength(6),
                },
                password_confirmation: {
                    sameAsPassword: sameAs('password')
                }
            }
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.user[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty || this.errors[fieldName]
                    };
                }
            },
            validate() {
                this.errors = {};
                this.$v.$touch();
            },
            register() {
                axios.post('register', this.user).then((response) => {
                    localStorage.setItem('token', response.data);
                    this.$router.push('Pets');
                }).catch((error) => {
                    this.errors = error.response.data.errors;
                });
            }
        }
    }
</script>
