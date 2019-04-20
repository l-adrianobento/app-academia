import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-editar-exercicio',
  templateUrl: './editar-exercicio.page.html',
  styleUrls: ['./editar-exercicio.page.scss'],
})
export class EditarExercicioPage implements OnInit {

  dadosForm = {exercicio: "", peso: ""};
  treinoTipo = "";
  novo = true;
  

  constructor( public modalController: ModalController, public navParams: NavParams) {
    this.novo = true;
 
    if(this.navParams.get("exercicio")){
      this.dadosForm.exercicio = this.navParams.get("exercicio").nome;
      this.dadosForm.peso = this.navParams.get("exercicio").peso;
      this.novo = false;
    }

    if(this.navParams.get("treinoTipo"))
      this.treinoTipo = this.navParams.get("treinoTipo");
   }

  ngOnInit() {
    
  }

  close(exercicio = {}) {
    this.modalController.dismiss({'exercicio': exercicio, 'novo': this.novo});
  }

  cadastrar(formCadastro: NgForm) {
     let exercicio = {
       nome: formCadastro.form.controls.exercicio.value, 
       peso:  formCadastro.form.controls.peso.value,
       tipo: this.treinoTipo
      };

      this.close(exercicio);
  }



}
