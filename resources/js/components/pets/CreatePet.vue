<template>
    <div>
        <md-button class="md-icon-button" @click="showDialog = true">
            <md-icon>add_circle</md-icon>
        </md-button>

        <md-dialog :md-active.sync="showDialog" class="container-fluid">
            <md-dialog-title>Create a pet</md-dialog-title>

            <form novalidate class="md-layout">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <md-field :class="getValidationClass('name')">
                                <label>Pets name</label>
                                <md-input v-model="pet.name" :disabled="sending"></md-input>
                                <span class="md-error" v-if="!$v.pet.name.required">The name is required</span>
                                <span class="md-error" v-else-if="!$v.pet.name.minlength">Min length is 3</span>
                                <span class="md-error" v-else-if="!$v.pet.name.maxLength">Max length is 255</span>
                            </md-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <md-field :class="getValidationClass('image')">
                                <label>Pets image</label>
                                <md-file v-on:md-change="imageSelected" accept="image/*" :disabled="sending"/>
                                <span class="md-error" v-if="!$v.pet.image.required">The image is required</span>
                            </md-field>
                        </div>
                    </div>
                </div>
            </form>

            <md-dialog-actions>
                <md-button @click="close">Close</md-button>
                <md-button @click="validate">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>

    import { validationMixin } from 'vuelidate';
    import {
        required,
        minLength,
        maxLength,
    } from 'vuelidate/lib/validators';
    import axios from '../../HTTP';

    export default {
        name: 'CreatePet',
        mixins: [validationMixin],
        data: () => ({
            showDialog: false,
            sending: false,
            edit: false,
            pet: {
                id: null,
                name: null,
                image: null,
            }
        }),
        validations: {
            pet: {
                name: {
                    required, minLength: minLength(3), maxLength: maxLength(255)
                },
                image: {
                    required,
                }
            }
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.pet[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    };
                }
            },
            validate() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.save();
                }
            },
            imageSelected(fileList) {
                const reader = new FileReader();
                reader.onload = e => this.pet.image = e.target.result;
                reader.readAsDataURL(fileList[0]);
            },
            close() {
                this.$v.$reset();

                this.pet.id = null;
                this.pet.name = null;
                this.pet.image = null;

                this.showDialog = false;
            },
            save() {
                this.sending = true;

                if (this.edit) {
                    axios.put('/api/pets/' + this.pet.id, this.pet).then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    axios.post('/api/pets', this.pet).then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.log(error);
                    });
                }

                console.log(this.pet);

                this.close();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-dialog {
        max-width: 658px;
    }
</style>

