import { Component, OnInit } from '@angular/core';
import { OtopService } from '../shared/otop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Otop } from '../shared/otop';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  product: Otop;
  related_products: any;

  constructor(
    private otopService: OtopService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.product = await this.otopService.get(this.route.snapshot.params.id).toPromise();
    this.related_products = await this.otopService.getRelatedProducts(this.product.category_id).toPromise();
  }

  convertFloat(val): number {
    return parseFloat(val);
  }

}
