import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanadalloComponent } from './escanadallo.component';

describe('EscanadalloComponent', () => {
  let component: EscanadalloComponent;
  let fixture: ComponentFixture<EscanadalloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscanadalloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscanadalloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
