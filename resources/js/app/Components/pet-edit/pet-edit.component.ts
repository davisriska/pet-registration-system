import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../Services/category.service";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {AddressService} from "../../Services/address.service";
import {PetService} from "../../Services/pet.service";

@Component({
    selector: 'app-pet',
    templateUrl: './pet-edit.component.html',
    styleUrls: ['./pet-edit.component.scss']
})
export class PetEditComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<any> = new Subject<any>();

    private submitted = false;

    private categories: Category[];
    private addresses: Address[];

    private petForm: FormGroup;
    private pet: Pet;

    private image: string;

    constructor(private bsModalRef: BsModalRef,
                private formBuilder: FormBuilder,
                private categoryService: CategoryService,
                private addressService: AddressService,
                private petService: PetService) {
    }

    ngOnInit() {

        this.categoryService.categories().pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
            this.categories = value;
        });

        this.addressService.addresses().pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
            this.addresses = value;
        });

        if (this.pet) {
            this.petForm = this.formBuilder.group({
                category: [this.pet.category.id, Validators.required],
                address: [this.pet.address.id, Validators.required],
                name: [this.pet.name, Validators.required],
                image: [null]
            });
        } else {
            this.pet = new class implements Pet {
                address: Address;
                category: Category;
                id: number;
                image: string;
                name: string;
            }();

            this.petForm = this.formBuilder.group({
                category: [null, Validators.required],
                address: [null, Validators.required],
                name: [null, Validators.required],
                image: [null, Validators.required]
            });
        }

        this.addressService.loadAddresses();

    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    get f() {
        return this.petForm.controls;
    }

    readImage(event) {

        const file = event.target.files[0];

        // Only process image files.
        if (!file.type.match('image.*')) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (result: any) => {
            this.pet.image = result.target.result;
        };

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);

    }

    save() {

        this.submitted = true;

        if (this.petForm.invalid) {
            return;
        }

        let obs: Observable<any> = null;

        if (this.pet.id) {

            this.pet = <Pet>{
                id: this.pet.id,
                name: this.petForm.value.name ? this.petForm.value.name : this.pet.name,
                image: this.pet.image,
                category: this.petForm.value.category ? this.petForm.value.category : this.pet.category.id,
                address: this.petForm.value.address ? this.petForm.value.address : this.pet.address.id
            };

            obs = this.petService.updatePet(this.pet);
        } else {

            this.pet = <Pet>{
                id: this.pet.id,
                name: this.petForm.value.name ? this.petForm.value.name : this.pet.name,
                image: this.pet.image,
                category: this.petForm.value.category ? this.petForm.value.category : this.pet.category.id,
                address: this.petForm.value.address ? this.petForm.value.address : this.pet.address.id
            };

            obs = this.petService.storePet(this.pet);
        }

        obs.subscribe((response) => {
            if (response.success) {
                this.bsModalRef.hide();
            }
        });

    }

    addTag(name) {
        return {value: name, id: name};
    }

    close() {
        this.bsModalRef.hide();
    }


}

