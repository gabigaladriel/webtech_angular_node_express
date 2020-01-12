import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})
export class InputUserDataFormComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  guid: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { 
      this.http.get('/api/v1/generate_uid').subscribe((data:any) => {
      this.guid = data.guid;
    }, error => {
        console.log("There was an error generating the proper GUID on the server", error);
    });
  }

  ngOnInit() {
     this.userForm = this.formBuilder.group({
       title : ['',Validators.required],
       author : ['', Validators.required],
       year : ['',Validators.pattern('[0-9]{4}')],
       description : [''],
       genres : [''],
       rating : ['',Validators.pattern('[0-5]')]
     });
  }

  onSubmit() {
    this.submitted = true;
    if(this.userForm.invalid == true) {
      return;
    }
    else {
      let data: any = Object.assign({guid: this.guid}, this.userForm.value);
      
      this.http.post('/api/v1/book',data).subscribe((data:any) => {
        let path = '/books/' + data.book.uid;
        this.router.navigate([path]);
      }, 
      error => {
        console.log(error);
      })
      this.registered = true;
    }
  }
}
