import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
//import { DataTableDataSource } from './data-table-datasource';
// import { DataTableServiceDataSource } from './data-table-service-datasource';
import { ServerSideDataSource } from './data-table-springservice-datasource';
import { DataService } from '../data.service';
import { DataTableItem} from '../data-table/data-table-service-datasource';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //dataSource: DataTableServiceDataSource;
  dataSource: ServerSideDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','first_name', 'last_name', 'avatar'];
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
      
    // this.dataFromService.getUsers().subscribe(response => {
    //   var JSONresponse = [] as Array<DataTableItem>;
    //   for(var el in response['data']){
    //      //console.log(el);
    //      JSONresponse.push(response['data'][el]);
    //   }
    //   this.dataSource = new DataTableServiceDataSource(this.paginator, this.sort);
    //   this.dataSource.data = JSONresponse;

    // });

    this.dataSource = new ServerSideDataSource(this.dataService);
    this.dataSource.loadData(NaN, '', 'asc', 0, 3); //TODO: Set id parameter here
  }

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadDataPage())
        )
        .subscribe();
  }

  loadDataPage() {
      this.dataSource.loadData(
          NaN, //TODO: implement, set id here 
          '',
          'asc',
          this.paginator.pageIndex+1,
          this.paginator.pageSize);
  }
}
