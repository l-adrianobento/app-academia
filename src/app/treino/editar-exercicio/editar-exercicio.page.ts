import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editar-exercicio',
  templateUrl: './editar-exercicio.page.html',
  styleUrls: ['./editar-exercicio.page.scss'],
})
export class EditarExercicioPage implements OnInit {

  constructor( public modalController: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }

}
