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
  

  constructor( public modalController: ModalController, public navParams: NavParams) {
 
    if(this.navParams.get("exercicio")){
      this.dadosForm.exercicio = this.navParams.get("exercicio").nome;
      this.dadosForm.peso = this.navParams.get("exercicio").peso;
    }
   }

  ngOnInit() {
    
  }

  close(novo) {
    this.modalController.dismiss({'novo': novo});
  }

  cadastrar(formCadastro: NgForm) {
     let novo = {
       nome: formCadastro.form.controls.exercicio.value, 
       peso:  formCadastro.form.controls.peso.value
      };

      this.close(novo);
  }



}
