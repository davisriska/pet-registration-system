import {Component} from '@angular/core';
import {AuthenticationService} from "../../Services/authentication.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {PetEditComponent} from "../pet-edit/pet-edit.component";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

    isCollapsed = true;
    createPetRef: BsModalRef;

    constructor(private authenticationService: AuthenticationService,
                private modalService: BsModalService) {

    }

    logout() {
        this.authenticationService.logout();
    }

    openCreatePet() {
        this.createPetRef = this.modalService.show(PetEditComponent, {});
    }

}
