import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  date: string;
  type: string;
  calendarOptions: CalendarComponentOptions = {
    from: new Date("2018-11-01"),
    weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthPickerFormat: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
    showMonthPicker: false,
    pickMode: 'multi'
  };

  onChange($event) {
    if($event.cssClass == "")
      $event.cssClass = "dia-cumprido";
    else if($event.cssClass == "dia-cumprido")
      $event.cssClass = "dia-nao-cumprido";
    else if($event.cssClass == "dia-nao-cumprido")
      $event.cssClass = "";

  } 
}
