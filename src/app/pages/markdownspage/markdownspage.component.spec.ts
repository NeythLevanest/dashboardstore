import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownspageComponent } from './markdownspage.component';

describe('MarkdownspageComponent', () => {
  let component: MarkdownspageComponent;
  let fixture: ComponentFixture<MarkdownspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
