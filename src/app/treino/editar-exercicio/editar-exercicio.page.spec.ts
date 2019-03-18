import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExercicioPage } from './editar-exercicio.page';

describe('EditarExercicioPage', () => {
  let component: EditarExercicioPage;
  let fixture: ComponentFixture<EditarExercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarExercicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarExercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
