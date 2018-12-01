import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private categoriesSubject = new BehaviorSubject<Category[]>([]);

    constructor(private http: HttpClient) {
        this.loadCategories();
    }

    loadCategories() {
        this.http.get('api/categories').subscribe((response: Category[]) => {
            this.categoriesSubject.next(response);
        });
    }

    categories() {
        return this.categoriesSubject.asObservable();
    }

}
