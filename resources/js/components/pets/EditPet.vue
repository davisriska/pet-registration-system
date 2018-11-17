<template>
    <div>
        <md-button class="md-icon-button" @click="showDialog = true">
            <md-icon>edit</md-icon>
        </md-button>

        <md-dialog :md-active.sync="showDialog" class="container-fluid">
            <md-dialog-title>Edit a pet</md-dialog-title>

            <form novalidate class="md-layout">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <md-field :class="getValidationClass('category')">
                                <label>Category</label>
                                <md-select v-model="pet.category" :disabled="sending">
                                    <md-option value=""></md-option>
                                    <md-option v-for="category in categories" :value="category.id">
                                        {{ category.value }}
                                    </md-option>
                                </md-select>
                                <span class="md-error" v-if="!$v.pet.category.required">The category is required</span>
                            </md-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <md-field :class="getValidationClass('address')">
                                <label>Address</label>
                                <multiselect placeholder="Address" v-model="pet.address" :options="addresses" :taggable="true" @tag="addAddress" label="value"></multiselect>
                                <span class="md-error" v-if="!$v.pet.category.required">The category is required</span>
                            </md-field>
                        </div>
                    </div>
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
    import Multiselect from 'vue-multiselect';

    export default {
        name: 'EditPet',
        mixins: [validationMixin],
        components: { Multiselect },
        props: ['pet'],
        data: () => ({
            showDialog: false,
            sending: false,
            edit: false,
            categories: [],
            addresses: [],
        }),
        validations: {
            pet: {
                category: {
                    required
                },
                address: {
                    required
                },
                name: {
                    required, minLength: minLength(3), maxLength: maxLength(255)
                },
                image: {
                    required,
                }
            }
        },
        watch: {
            showDialog(to, from) {
                if (to === true) {
                    this.getCategories();
                    this.getAddresses();
                }
            }
        },
        methods: {
            addAddress(newAddress) {
                const tag = {
                    value: newAddress,
                    id: newAddress
                };
                this.addresses.push(tag);
                this.pet.address = tag;
            },
            getCategories() {
                axios.get('categories').then((response) => {
                    this.categories = response.data;
                }).catch((error) => {
                    if (error.response.status === 401) {
                        this.$store.commit('logout');
                    }
                });
            },
            getAddresses() {
                axios.get('addresses').then((response) => {
                    this.addresses = response.data;
                }).catch((error) => {
                    if (error.response.status === 401) {
                        this.$store.commit('logout');
                    }
                });
            },
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
                this.pet.address = null;
                this.pet.category = null;
                this.pet.name = null;
                this.pet.image = null;

                this.showDialog = false;
            },
            save() {
                this.sending = true;

                if (this.edit) {

                    const pet = {
                        ...this.pet,
                        category: this.pet.category.id
                    };

                    axios.put('pets' + this.pet.id, pet).then((response) => {
                        console.log(response);

                        this.close();
                    }).catch((error) => {

                        console.log(error.response.status);

                        if (error.response.status === 401) {
                            this.$store.commit('logout');
                        }

                    }).finally(() => {
                        this.sending = false;
                    });
                } else {

                    const pet = {
                        ...this.pet,
                        address: this.pet.address.id
                    };

                    axios.post('pets', pet).then((response) => {
                        console.log(response);

                        this.close();
                    }).catch((error) => {
                        console.log(error.response.status);

                        if (error.response.status === 401) {
                            this.$store.commit('logout');
                        }

                    }).finally(() => {
                        this.sending = false;
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-dialog {
        max-width: 658px;
    }
</style>

