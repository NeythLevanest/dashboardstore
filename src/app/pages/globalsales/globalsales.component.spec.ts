import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalsalesComponent } from './globalsales.component';

describe('GlobalsalesComponent', () => {
  let component: GlobalsalesComponent;
  let fixture: ComponentFixture<GlobalsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
