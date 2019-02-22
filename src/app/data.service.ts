import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataTableItem } from './data-table/data-table-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('https://reqres.in/api/users');
  }

  findData(
    id:number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<any[]> {

    return this.http.get<any>('https://reqres.in/api/users', {
        params: new HttpParams()
            //.set('id', id.toString())
            .set('filter', filter)
            .set('sort_order', sortOrder)
            .set('page', pageNumber.toString())
            .set('per_page', pageSize.toString())
    }).pipe(
        // map(res =>  res["data"])
        map(res => res)
    );
  }
}
