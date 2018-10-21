import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
 import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
//import { AuthProvider } from '../../services/auth/auth';
import { Usuarios } from '../../providers/auth/user';
 
//import { NativeStorage } from '@ionic-native/native-storage';
//import {HttpClient} from '@angular/common/http'
 //import {Observable} from 'rxjs/Observable'
 import { AuthService } from '../../providers/auth/auth-service';
 import { Events } from 'ionic-angular';
import { ForgotPasswordPage } from "../forgot-password/forgot-password";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
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
  irRegister() {
    this.nav.setRoot(RegisterPage);
  }
   
  login() {
    this.authService.signInWithEmailAndPassword(this.user)
    .then((res: any) => {
     this.popToRoot();
  }).catch((err) => {

    this.handleError(err)
  });
  }

  LoginnWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => {
     this.popToRoot();
       })
      .catch((error) => {
    this.handleError(error);
      //  this.toastCtrl.create({ duration: 3000, position: 'bottom', message: error })
        //  .present();
      });
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(() => {
     this.popToRoot();
       })
      .catch((error) => {
        this.handleError(error);

      });
  }

  resetPassword() {
    this.navCtrl.push(ForgotPasswordPage);
    //this.authService.resetPassword()
  /*  let forgot = this.forgotCtrl.create({
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
    forgot.present();*/
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
