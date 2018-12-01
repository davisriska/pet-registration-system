import {Component, Input, OnInit} from '@angular/core';
import {PetService} from "../../Services/pet.service";
import {PetEditComponent} from "../pet-edit/pet-edit.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
    selector: 'pet',
    templateUrl: './pet.component.html',
    styleUrls: ['./pet.component.scss', './pet.component.less']
})
export class PetComponent implements OnInit {

    @Input() pet: Pet;
    private editPetRef: BsModalRef;

    constructor(private petService: PetService, private modalService: BsModalService) {

    }

    ngOnInit() {

    }

    edit() {

        const initialState = {
            pet: this.pet
        };

        this.editPetRef = this.modalService.show(PetEditComponent, {initialState});

    }

    delete() {
        this.petService.deletePet(this.pet.id).subscribe();
    }

}
