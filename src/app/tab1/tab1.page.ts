import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TreinoPage } from '../treino/treino.page';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  exercicios: any[];

  constructor (public navController: NavController, private firebaseService: FirebaseService, public storage: Storage){}

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
}
