import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
//import { DataTableDataSource } from './data-table-datasource';
import { DataTableServiceDataSource } from './data-table-service-datasource';
import { DataService } from '../data.service';
import { DataTableItem} from '../data-table/data-table-service-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DataTableServiceDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','first_name', 'last_name', 'avatar'];
  
  constructor(private dataFromService: DataService) { }

  ngOnInit() {
   
    
    this.dataFromService.getUsers().subscribe(response => {
      var JSONresponse = [] as Array<DataTableItem>;
      for(var el in response['data']){
         //console.log(el);
         JSONresponse.push(response['data'][el]);
      }
      this.dataSource = new DataTableServiceDataSource(this.paginator, this.sort);
      this.dataSource.data = JSONresponse;

    });
    
     
  }
}
