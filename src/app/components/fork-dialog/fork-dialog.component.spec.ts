import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkDialogComponent } from './fork-dialog.component';

describe('ForkDialogComponent', () => {
  let component: ForkDialogComponent;
  let fixture: ComponentFixture<ForkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
