import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommandeService } from '../services/commande.service';
import { EndpointService } from '../services/endpoint.service';
import { WishlistService } from '../services/wishlist.service';
import Swal from 'sweetalert2';
import { FormationService } from '../services/formation.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  constructor( 
    private _wish: WishlistService, 
    public endpoint: EndpointService , 
    private _auth: AuthService,
    private _commande: CommandeService,
    private _formation: FormationService
    ) { }

  wishlist: any;
  user: any;
  commandes: any;
  formations = [];
  updateTogglePhoto = false;
  confirmePassword = ''; 
  userClone : any; 
  ngOnInit(): void {

    this.user = this._auth.getUserData();
    this.userClone = this._auth.getUserData();
    this.formations = [];

 
    this._commande.getMyCommande(this.user._id).subscribe(
      res=>{
        this.commandes = res;
        for(let c of this.commandes){

          for(let f of c.formations){
            this.formations.push(f);
          }

        }
        this._formation.myFormations = [...this.formations];
  
        if(this._wish.wishlist.length > 0){
          this._wish.getwishlist().subscribe(
            res=>{
              this.wishlist = res;
              
            }
          );
        }else{
          this.wishlist = [];
        }
        
      }
    );


 

  }

  newWish : any;
  addToWishList(idF:any){

    if(this._auth.loggedIn()){
      this._wish.addWishList(idF).subscribe(
        res=>{
          this.newWish = res;
          
          if(this.newWish.stat == 'deleted'){
            console.log(this.newWish);
  
            this._wish.wishlist.splice( this._wish.wishlist.indexOf(this.newWish.id) ,1);
            this.ngOnInit();
          }else{
            console.log(this.newWish);
  
            this._wish.wishlist.push(this.newWish.id);
            this.ngOnInit(); 
          }
         
          
        }
      );
    }else{
      Swal.fire('Oops...', 'Login to your account first!', 'error')
    }

  


  }


  url : any;


onAdd(event: any) {

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.url = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}
}


showSpinnerUpdatePhoto= false;
uptRes : any;
updatePhoto(){

  this.showSpinnerUpdatePhoto = true;
  const imageBlob = this.fileInput.nativeElement.files[0];
  const file = new FormData();
  file.set('image', imageBlob);
  


  
  this._auth.updateUserPhoto( this.user._id , file).subscribe(

    res=>{


      this.url = null;
      this.showSpinnerUpdatePhoto = false;
      this.uptRes = res;
      localStorage.setItem('token' , this.uptRes.token);
      
      this.ngOnInit();
         
     
    }, 
    err=>{
     
      
  
      
    }
    
  );


}




testName = false;
testEmail = false;
testPassword = false;
testConfirme = false;



validateEmail(sEmail) {
  var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

  if (!sEmail.match(reEmail)) {

    return false;
  }

  return true;

}




updateUser(){


  this.testName = false;
  this.testEmail = false;
  this.testPassword = false;
  this.testConfirme = false;

  let countError = 0;

  if (this.user.nom.length == 0) {
    this.testName = true;
    countError++;
  }


  if (!this.validateEmail(this.user.email)) {
    this.testEmail = true;
    countError++;
  }


  if (this.user.password.length < 6 && this.user.password.length > 0) {
    this.testPassword = true;
    countError++;
  }

  if (this.user.password !== this.confirmePassword) {
    this.testConfirme = true;
    countError++;
  }


  
  if (countError === 0) {
    this._auth.updateAccount(this.user._id ,  this.user).subscribe(
      res=>{
        this.user.password = '';
        this.confirmePassword = '';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Votre modification a été enregistré avec succes',
          showConfirmButton: false,
          timer: 1500
        })
      
      },
      err=>{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Erreur',
          showConfirmButton: false,
          timer: 1500
        })
      }
      );

  }
}


}
