import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PetService {

    private petsSubject = new BehaviorSubject<Pet[]>([]);

    constructor(private http: HttpClient) {

    }

    loadPets() {
        this.http.get('api/pets').subscribe((response: Pet[]) => {
            this.petsSubject.next(response);
        });
    }

    pets() {
        return this.petsSubject.asObservable();
    }

    storePet(pet: Pet) {
        return this.http.post('api/pets', pet).pipe(tap(
            (response: any) => {
                if (response.success) {
                    this.loadPets();
                }
            }
        ));
    }

    updatePet(pet: Pet) {
        return this.http.put(`api/pets/${pet.id}`, pet).pipe(tap(
            (response: any) => {
                if (response.success) {
                    this.loadPets();
                }
            }
        ));
    }

    deletePet(id: number) {
        return this.http.delete(`api/pets/${id}`).pipe(tap(
            (response: any) => {
                if (response.success) {
                    this.loadPets();
                }
            }
        ));
    }

}
