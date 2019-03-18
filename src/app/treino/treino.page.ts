import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditarExercicioPage } from './editar-exercicio/editar-exercicio.page';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.page.html',
  styleUrls: ['./treino.page.scss'],
})
export class TreinoPage implements OnInit {

  type: string;
  
  constructor(public router: ActivatedRoute, public modalController: ModalController) {
    this.type = this.router.snapshot.paramMap.get('type');
   }

  ngOnInit() {}

  async ediar() {
    const modal = await this.modalController.create({
      component: EditarExercicioPage,
    });
    return await modal.present();
  }

}
