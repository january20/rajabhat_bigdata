import { Component, OnInit } from '@angular/core';

import { MediaService } from './shared/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  otop:any;

  constructor(
    private media:MediaService
  ) { }

  ngOnInit() {

    this.media.testAPI().subscribe(data=>{
      console.log(data);
      this.otop = data;
    });

  }

}
