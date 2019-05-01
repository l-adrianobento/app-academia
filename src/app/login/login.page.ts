import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dadosForm = {email: ""};

  constructor(private firebaseService: FirebaseService, 
              public storage: Storage, 
              public navController: NavController,
              public alertController: AlertController) {
    this.storage.get('logado').then((email) => {
      if(email){
        this.firebaseService.connectUser(email).then(success => {
          this.navController.navigateForward('treinos');
        }).catch(e => {
          console.log("erro", e);
        });
      }
    });
   }

  ngOnInit() {
  }

  entrar(formLogin: NgForm) {
    
    let email = formLogin.form.controls.email.value;

    this.firebaseService.connectUser(email).then(success => {
      if(success){
          this.storage.set('logado', email).then(success => {
            this.navController.navigateForward('treinos');
          }).catch(e => {
            console.log("erro", e);
          });
        }
        else {
          console.log("precisa cadastrar");
          this.presentAlertConfirm();
        }      
      
    }).catch(e => {
      console.log("erro", e);
    });
 }

 async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Usuario nao encontrado!',
    //message: 'O que deseja fazer?',
    buttons: [
      {
        text: 'Tentar Novamente',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Cadastrar',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
}

}
