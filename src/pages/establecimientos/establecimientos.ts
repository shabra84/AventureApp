import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';

/**
 * Generated class for the EstablecimientosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { ViewController } from 'ionic-angular';
import {EstudianteService} from "../../providers/auth/estudiante.service";

 
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'; 
  
@IonicPage()
@Component({
  selector: 'page-establecimientos',
  templateUrl: 'establecimientos.html',
})
export class EstablecimientosPage {
 
  public ciudades={id:null,foto:null,
    nombre :null,
  }
  public params         : NavParams;
   
  datos: Observable<any>;

 @ViewChild('myNav') nav: NavController;

  constructor(
     public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public estudianteService: EstudianteService
     ) {
    this.datos= this.getEstablecimientos();
  }
  getEstablecimientos() :Observable<any>{
    return new Observable(observer =>
      {

    firebase.database().ref('/AdventureApp/Ciudades/').child(this.ciudades.id).child('/Establecimientos')
    .child('/Balnearios')
    //firebase.database().ref('/AdventureApp/Ciudades/').child(this.establecimientos.id).child('/Establecimientos')
   .once('value', (items : any) =>
      
        {
        let user:any=[];
     
           items.forEach((item) =>
           {
             user.push({
              nombre   :item.val().nombre,
               fotoBal     : item.val().fotoBal,
      
            });
         
           });
     
           observer.next(user);
           observer.complete();
        },
        (error) =>
        {
           console.log("Observer error: ", error);
           console.dir(error);
           observer.error(error)
        });
     
     });
  
  }
}
