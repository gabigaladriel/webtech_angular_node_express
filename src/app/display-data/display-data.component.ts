import { Component, OnInit } from '@angular/core';
import {BookInfoModel} from '../models/BookInfoModel';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {

  book: BookInfoModel = new BookInfoModel({id:"1",
      title:"Maestrul si Margareta",
      author:"Mihail Bulgakov",
      year:1935,
      description:"Diavolul viziteaza Moscova",
      genres:"Fictiune",
      rating:5
    });
    
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  private subscriber: any;
  
  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
	       
	       this.http.get('/api/v1/customer/' + params.uid).subscribe((data:any) => {

				this.book = new BookInfoModel(data.book);
		    });
	    });
  
  }

}
