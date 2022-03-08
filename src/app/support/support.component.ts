import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(private _contact: ContactService) { }

  contact = {

    name:'',
    email:'',
    tel: '',
    message:''

  }

  loading = false;

  ngOnInit(): void {
  }

  response: any;
  send(){

    this.loading = true;

    this._contact.send(this.contact).subscribe(

      res=>{
        this.loading = false;
       this.response = res;
       if(this.response.sent == true){
         this.contact = {

          name:'',
          email:'',
          tel: '',
          message:''
      
        }
        Swal.fire('Sent...', 'Your message has been sent successfuly!', 'success')

       }else{
        Swal.fire('Oops...', 'Your message not sent!', 'error')

       }
        
      },
      err=>{
        console.log(err);
        
      }


    );
  }




}
