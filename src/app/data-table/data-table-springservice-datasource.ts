
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { DataTableItem } from './data-table-item';
import { DataService } from '../data.service';
import { catchError } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';

// source https://blog.angular-university.io/angular-material-data-table/

export class ServerSideDataSource implements DataSource<DataTableItem> {

    private dataSubject = new BehaviorSubject<DataTableItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.dataSubject.asObservable();
    public total:number;
  
    constructor(private dataService: DataService) {}

    connect(collectionViewer: CollectionViewer): Observable<DataTableItem[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    loadData(id: number, filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);
    
        this.dataService.findData(id, filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => {
            this.dataSubject.next(data['data']); 
            this.total = data['total'];
            console.log(data);
        });
    }    
    
}
