import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'treinos', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'treino/:type', loadChildren: './treino/treino.module#TreinoPageModule' },
  { path: 'editar-exercicio', loadChildren: './treino/editar-exercicio/editar-exercicio.module#EditarExercicioPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'cadastrar', loadChildren: './cadastrar/cadastrar.module#CadastrarPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
