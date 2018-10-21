import {Component} from "@angular/core";
import { IonicPage,NavController, LoadingController, ToastController } from 'ionic-angular';
 import {HomePage} from "../home/home";
 import { Usuarios } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { LoginLugaresPage } from "../login-lugares/login-lugares";
import { Config } from '../../providers/config';
import { TermsPage } from '../terms/terms';
/**
 * Generated class for the RegistroLugaresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-lugares',
  templateUrl: 'registro-lugares.html',
})
export class RegistroLugaresPage {
  usuarios: Usuarios = new Usuarios();
  public isterms = false;



  constructor(af: AngularFire, public navCtrl: NavController,public nav: NavController,
     public loadingCtrl: LoadingController, public toastCtrl: ToastController,
     private authService: AuthService,
   public config: Config
) {

    this.items = af.database.list('/ciudades');

}



  registerLugares(){
      var toaster = this.toastCtrl.create({
          duration: 3000,
          position: 'bottom'
      });
      if (this.usuarios.nit == '' || this.usuarios.nombre == '' || this.usuarios.tipo_servicio ==''
          || this.usuarios.direccion == '' || this.usuarios.email == '' || this.usuarios.password == ''
      ) {
          toaster.setMessage('Todos los campos son obligatorios');
          toaster.present();
      } else if (this.usuarios.password.length < 7) {
          toaster.setMessage('Password is not strong. Try giving more than six characters');
          toaster.present();
      } else {
        if(this.usuarios.perfilURL==null){
            this.usuarios.perfilURL='https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1';
        }
            this.authService.createUserWithEmailAndPasswordLugares(this.usuarios)
          //    .then(r => this.popToRoot()).catch(this.handleError);
          .then((res: any) => {
              this.popToRoot();
           }).catch((err) => {

             this.handleError(err)
           });

  }
  }

     popToRoot(){
         let loader = this.loadingCtrl.create({
             duration: 1000,
             content: 'Por Favor Espere...'
             });
             loader.present();
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
   // go to login page
   irLoginLugares() {
     this.navCtrl.setRoot(LoginLugaresPage);
   }

   goTerms() {
    this.navCtrl.push(TermsPage, null, this.config.navOptions);
}
clickTerm() {
    if(this.isterms) {
        this.goTerms();
    }
}
  }
