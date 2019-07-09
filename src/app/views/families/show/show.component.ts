import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamiliesService } from '../shared/families.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  member: any;

  constructor(
    private route: ActivatedRoute,
    private familiesService: FamiliesService
  ) { }

  ngOnInit() {
    this.familiesService.get(this.route.snapshot.params.id, this.route.snapshot.params.role).subscribe((data: any) => this.member = data);
  }

  convertDate(d) {
    const day_th = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
    const month_th = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
    const date = new Date(d);
    return day_th[date.getUTCDay()] + ' ' + date.getDate() + ' ' + month_th[date.getUTCMonth()] + ' ' + (Number(date.getFullYear()) + 543);
  }

}
