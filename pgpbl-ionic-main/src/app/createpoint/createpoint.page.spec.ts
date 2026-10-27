import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatepointPage } from './createpoint.page';

describe('CreatepointPage', () => {
  let component: CreatepointPage;
  let fixture: ComponentFixture<CreatepointPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
