import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwProfilePage } from './sw-profile.page';

describe('SwProfilePage', () => {
  let component: SwProfilePage;
  let fixture: ComponentFixture<SwProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SwProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
