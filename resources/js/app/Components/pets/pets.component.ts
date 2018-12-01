import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {PetService} from "../../Services/pet.service";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'pets',
    templateUrl: './pets.component.html',
    styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<any> = new Subject<any>();

    private pets: Pet[];

    constructor(private petService: PetService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {

        this.petService.pets().pipe(takeUntil(this.ngUnsubscribe)).subscribe((value) => {
            this.pets = value;
        });

        this.activatedRoute.url.subscribe((url) => {
            this.petService.loadPets();
        });

    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }


}
