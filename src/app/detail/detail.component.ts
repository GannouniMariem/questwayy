import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { EndpointService } from '../services/endpoint.service';
import { FormationService } from '../services/formation.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { PanierService } from '../services/panier.service';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {



  constructor(
    private _formation: FormationService,
    private _categorie: CategorieService,
    public endpoint: EndpointService,
    private route : ActivatedRoute,
    private sanitizer: DomSanitizer,
    private panier: PanierService,
    private _wish: WishlistService,
    private _auth: AuthService,
    private _review: ReviewService,
    private router : Router
     ) { }



     id:any;
     formation:any;
     categories:any;
     response: any; 
     formatteur: any; 
     readmore = true;
   
     user: any;
     reviews:any;
     reviewsType = [1,2,3,4,5];
     reviews5 = [0, 0 , 0, 0 , 0];
     reviewsToCount:any;
     rating = 1;
     isMine = false;
     maxReview = 3;
      

     review = {

      idUser: '',
      idFormation: '',
      date: '',
      review: 0 ,
      comment: '',


     }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.user = this._auth.getUserData();
    this._formation.getformationById(this.id).subscribe(
      res=>{
        this.response = res;
        this.formation = this.response.formation;
        this.formatteur = this.response.formatteur;
        this.isMine = this._formation.myFormations.findIndex(x => x._id === this.formation._id) > -1 ? true: false;



        this._review.getFormationReview(this.id).subscribe(
          res=>{
            this.reviews = res;
            this.reviewsToCount = res;
            for(let rev of this.reviewsToCount){
                if(rev.review == 1){
                  this.reviews5[0]++;
                } else  if(rev.review == 2){
                  this.reviews5[1]++;
                } else  if(rev.review == 3){
                  this.reviews5[2]++;
                } else  if(rev.review == 4){
                  this.reviews5[3]++;
                } else  if(rev.review == 5){
                  this.reviews5[4]++;
                }

            }
            console.log(this.reviewsToCount);
            

            console.log(this.reviews5);
            
            let index = this.reviews.findIndex(x => x.idUser === this.user._id);
            if(index > -1){
              this.review = this.reviews[index];
              this.reviews.splice(index, 1);

            }
         
            

          }
        );



  
        
      }
    );

  }


  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'https://www.youtube.com/embed/'+ match[7] +'?rel=0' );
  }



  addToCart(){
    this.panier.ajoutProduitAuPanier(this.formation);
    Swal.fire({
      title: 'Added ?',
      text: "You won't to !",
      icon: 'success',
      showCancelButton: true,
      cancelButtonText: 'find more courses',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'go to cart'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/panier']);
      }
    })
    
      


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
          }else{
            console.log(this.newWish);
  
            this._wish.wishlist.push(this.newWish.id);
  
          }
         
          
        }
      );
    }else{
      Swal.fire('Oops...', 'Login to your account first!', 'error')
    }

  


  }



  addReview(){

    let index = this._formation.myFormations.findIndex(x => x._id === this.formation._id);
    if(index > -1){
      this.review.idUser = this.user._id;
      this.review.idFormation = this.formation._id;
      this._review.addReview(this.review).subscribe(
        res=>{
          Swal.fire('Sent...', 'Review saved successfuly!', 'success');
          this.ngOnInit();

        },
        err=>{
          console.log(err);
          
          Swal.fire('Oops...', 'error in review!', 'error')
        }
      );
    }

  }



  updateReview(){
      this._review.updateReview(this.review).subscribe(
        res=>{
          Swal.fire('Sent...', 'Review updated successfuly!', 'success');
          
        },
        err=>{
          console.log(err);
          
          Swal.fire('Oops...', 'error in updating review!', 'error')
        }
      );
      
  }




}
