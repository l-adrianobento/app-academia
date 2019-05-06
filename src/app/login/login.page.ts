import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CadastrarPage } from '../cadastrar/cadastrar.page';

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
              public alertController: AlertController,
              public modalController: ModalController) {

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
          this.presentAlertConfirm(email);
        }      
      
    }).catch(e => {
      console.log("erro", e);
    });
 }

 async presentAlertConfirm(email) {
  const alert = await this.alertController.create({
    header: 'Usuario nao encontrado!',
    //message: 'O que deseja fazer?',
    buttons: [
      {
        text: 'Tentar Novamente',
        cssClass: 'secondary',
      }, {
        text: 'Cadastrar',
        handler: () => {
          this.openCadastro(email)
        }
      }
    ]
  });

  await alert.present();
}

async openCadastro(email) {
  const modal = await this.modalController.create({
    component: CadastrarPage,
    componentProps: {
      'email': email
    }
  });

  modal.onDidDismiss().then((retorno) => {
    if(retorno.data['salvou']){
      this.storage.set('logado', email).then(success => {
        this.navController.navigateForward('treinos');
      }).catch(e => {
        console.log("erro", e);
      });
    }
  }).catch(err => console.log(err));

  return await modal.present();
}

}
