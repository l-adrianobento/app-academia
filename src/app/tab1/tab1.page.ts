import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TreinoPage } from '../treino/treino.page';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
//import { CadastrarPage } from '../cadastrar/cadastrar.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  exercicios: any[];

  constructor (public navController: NavController, 
               private firebaseService: FirebaseService, 
               public storage: Storage,
               public modalController: ModalController){}

  ngOnInit() {

    if(!this.firebaseService.getTodos())
      this.navController.navigateRoot("/");

    this.firebaseService.getTodos().subscribe(res => {
      this.exercicios = res;

      for(let i = 0; i < this.exercicios.length; i++){
        this.storage.set(this.exercicios[i].tipo, this.exercicios[i]);
      }
    });
  }

  remove(item) {
    this.firebaseService.removeTodo(item.id);
  }

  showTrainType(type) {
    this.navController.navigateForward(`treino/${type}`);
  }

  async addTreino() {
    // const modal = await this.modalController.create({
    //   component: CadastrarPage,
    //   componentProps: {
    //     //'email': email
    //   }
    // });
  
    // modal.onDidDismiss().then((retorno) => {
      
    // }).catch(err => console.log(err));
  
    // return await modal.present();
  }
}
