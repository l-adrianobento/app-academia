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

  exerciciosTipos: any[];

  constructor (public navController: NavController, private firebaseService: FirebaseService, public storage: Storage){}

  ngOnInit() {
    this.firebaseService.getTodos().subscribe(res => {
      this.exerciciosTipos = res[0].tipos;

      for(let i = 0; i < this.exerciciosTipos.length; i++){
        this.storage.set(this.exerciciosTipos[i].tipo, this.exerciciosTipos[i].exercicios);
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
