import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  dadosForm = {nome: "", peso: "", email: "", tipo: "", descricao: ""};
  email = "";

  constructor(private firebaseService: FirebaseService, public navParams: NavParams, public modalController: ModalController) { 
      if(this.navParams.get("email")){
        this.email = this.navParams.get("email");
        this.dadosForm.email = this.email;
      }
    }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss({'salvou': false});
  }

  saveUser(formUsuario: NgForm) {
    let userObj = {
      exercicios: [{
        nome: formUsuario.form.controls.nome.value,
        peso: formUsuario.form.controls.peso.value,
        tipo: formUsuario.form.controls.tipo.value
      }],
      tipo: formUsuario.form.controls.tipo.value,
      descricao: formUsuario.form.controls.descricao.value,
      email: formUsuario.form.controls.email.value,
    };

    this.firebaseService.createUser(userObj).then(success => {
      console.log("salvou");
      this.modalController.dismiss({'salvou': true});
    }).catch(e => {
      console.log("erroooooo");
    });
  }

}
