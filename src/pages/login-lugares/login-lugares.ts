 
import {Component} from "@angular/core";
import {IonicPage,NavController, AlertController, ToastController, MenuController} from "ionic-angular";
 import {HomePage} from "../home/home";
import { Usuarios } from '../../providers/auth/user';
 
 import { AuthService } from '../../providers/auth/auth-service';
 import { Events } from 'ionic-angular';
import { RegistroLugaresPage } from "../registro-lugares/registro-lugares";
/**
 * Generated class for the LoginLugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-lugares',
  templateUrl: 'login-lugares.html',
})
export class LoginLugaresPage {
  user: Usuarios = new Usuarios();
 
 
showUser: boolean = false;
public items:any;
errorMessage: string = '';


  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
  public alertCtrl: AlertController,
  private authService: AuthService,
  public events: Events
  ///public http: HttpClient,
  //public nativeStorage: NativeStorage,
   ) {
   }
 
  // go to register page
  irRegistroLugares() {
    this.nav.setRoot(RegistroLugaresPage);
  }
   
  loginLugares() {
    this.authService.signInWithEmailAndPassword(this.user)
    .then((res: any) => {
     this.popToRoot();
  }).catch((err) => {

    this.handleError(err)
  });
  }

 

  resetPassword() {
    //this.authService.resetPassword()
    let forgot = this.forgotCtrl.create({
      title: '¿Recuperar Contraceña?',
      message: "Ingrese su Email para enviarle un enlace para restablecer su contraseña.",
    inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Enviar clicked');
            let toast = this.toastCtrl.create({
              message: 'Email Enviado Exitosamente',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
 
  popToRoot(){
  	this.navCtrl.setPages([
		  { page: HomePage }
		]);
  }

  handleError(err){
    var toast = this.toastCtrl.create({
     duration: 3000,
      message: err,
  });
  toast.present();

  }
  

}