import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../shared/expert.service';


@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  experts: Array<Object>;

  constructor(
    private expertService: ExpertService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.expertService.getMyList().subscribe((data: any) => this.experts = data);
  }

  deleteExpert(id) {
    if(confirm('คุณต้องการลบข้อมูลผู้เชี่ยวชาญใช่หรือไม่ ?')) {
      this.expertService.delete(id).subscribe(res => this.loadData());
    }    
  }

}
