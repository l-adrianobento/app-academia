import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { EditarExercicioPage } from './editar-exercicio/editar-exercicio.page';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.page.html',
  styleUrls: ['./treino.page.scss'],
})
export class TreinoPage implements OnInit {

  exercicios = [];

  type: string;
  
  constructor(public router: ActivatedRoute, 
              public modalController: ModalController, 
              public alertController: AlertController, 
              private firebaseService: FirebaseService,
              public storage: Storage) {
    this.type = this.router.snapshot.paramMap.get('type');
   }

   ngOnInit() {
    this.storage.get(this.type).then((exercicios) => {
      this.exercicios = exercicios;
    });
  }

  async ediar(exercicio) {
    const modal = await this.modalController.create({
      component: EditarExercicioPage,
      componentProps: {
        'exercicio': exercicio,
      }
    });

    modal.onDidDismiss().then((novoExercicio) => {
      if(novoExercicio.data.novo)
        this.exercicios.push(novoExercicio.data.novo);
    }).catch(err => console.log(err));

    return await modal.present();
  }



  async alterarValor() {
    

  }

}
