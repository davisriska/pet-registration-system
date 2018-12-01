import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    private addressesSubject = new BehaviorSubject<Address[]>([]);

    constructor(private http: HttpClient) {
        this.loadAddresses();
    }

    loadAddresses() {
        this.http.get('api/addresses').subscribe((response: Address[]) => {
            this.addressesSubject.next(response);
        });
    }

    addresses() {
        return this.addressesSubject.asObservable();
    }

}
