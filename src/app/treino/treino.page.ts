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
  treinoId = null;
  exerciciosIndex = null;

  type: string;
  
  constructor(public router: ActivatedRoute, 
              public modalController: ModalController, 
              public alertController: AlertController, 
              private firebaseService: FirebaseService,
              public storage: Storage) {
    this.type = this.router.snapshot.paramMap.get('type');
   }

   ngOnInit() {
    this.storage.get(this.type).then((treino) => {
      this.exercicios = treino.exercicios;
      this.treinoId = treino.id;
    });
  }

  async ediar(index) {
    this.exerciciosIndex = index;
    const modal = await this.modalController.create({
      component: EditarExercicioPage,
      componentProps: {
        'exercicio': this.exercicios[this.exerciciosIndex],
        'treinoTipo': this.type
      }
    });

    modal.onDidDismiss().then((novoExercicio) => {
      if(Object.keys(novoExercicio.data.exercicio).length){
        
        if(novoExercicio.data.novo)
          this.exercicios.push(novoExercicio.data.exercicio);
        else{
          this.exercicios.map((item, index) => {
            if(index === this.exerciciosIndex){
              item.nome = novoExercicio.data.exercicio.nome;
              item.peso = novoExercicio.data.exercicio.peso;
            }
          });
        }
        let salvar = {
          'exercicios': this.exercicios,
          'tipo': this.type
        };
        // ao invez disso, salva um novo
        this.firebaseService.updateTodo(salvar, this.treinoId).then(success => {
          salvar['id'] = this.treinoId;
          this.storage.set(this.type, salvar);
          this.exerciciosIndex = null;

        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));

    return await modal.present();
  }



  async alterarValor() {
    

  }

}
