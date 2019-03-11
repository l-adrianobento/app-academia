import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.page.html',
  styleUrls: ['./treino.page.scss'],
})
export class TreinoPage implements OnInit {

  type: string;
  
  constructor(public router: ActivatedRoute) {
    this.type = this.router.snapshot.paramMap.get('type');
   }

  ngOnInit() {
    console.log(this.type);
  }

}
