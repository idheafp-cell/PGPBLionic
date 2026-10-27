import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditpointPage } from './editpoint.page';

describe('EditpointPage', () => {
  let component: EditpointPage;
  let fixture: ComponentFixture<EditpointPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
