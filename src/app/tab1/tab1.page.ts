import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TreinoPage } from '../treino/treino.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor (public navController: NavController){}

  showTrainType(type) {
    this.navController.navigateForward(`treino/${type}`);
  }
}
