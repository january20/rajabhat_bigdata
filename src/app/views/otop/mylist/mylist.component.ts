import { Component, OnInit } from '@angular/core';
import { OtopService } from '../shared/otop.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  otop: any;

  constructor(
    private otopService: OtopService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  changePage(event) {
    this.loadData(event.pageIndex + 1);
  }

  deleteProduct(id) {
    if(confirm('คุณต้องการลบข้อมูลผู้เชี่ยวชาญใช่หรือไม่ ?')) {
      this.otopService.destroy(id).subscribe(res => this.loadData());
    }    
  }

  loadData(page = 1) {
    this.otopService.getMyList(page).subscribe(data => this.otop = data);
  }

}
