import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErrorNameComponent } from './modal-error-name.component';

describe('ModalErrorNameComponent', () => {
  let component: ModalErrorNameComponent;
  let fixture: ComponentFixture<ModalErrorNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalErrorNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalErrorNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
