import { Component } from '@angular/core';

import { ApiService } from './api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task';

  aritcles:any = [];
  loader:boolean = false;
  aritcle:any = {};
  sub:any;
  closeResult: string;

  constructor(
  	private service: ApiService,
  	private modalService: NgbModal) { }

  ngOnInit() {
  	this.getArticles();
  	this.sub = interval(10000)
    	.subscribe((val) => this.getArticles());
  }

  ngDestroy() {
  	this.sub.unsubscribe();
  }

  getArticles() {
  	this.loader = true;
  	this.service.getArticles().then((data) => {
  		this.aritcles = data.hits;
  		this.loader = false;
  	})
  }

  
  open(content, aritcle) {
  	this.aritcle = aritcle;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
