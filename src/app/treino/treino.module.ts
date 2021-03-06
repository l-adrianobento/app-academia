import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TreinoPage } from './treino.page';
import { EditarExercicioPage } from './editar-exercicio/editar-exercicio.page';

const routes: Routes = [
  {
    path: '',
    component: TreinoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    EditarExercicioPage
  ],
  declarations: [TreinoPage, EditarExercicioPage]
})
export class TreinoPageModule {}
