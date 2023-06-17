import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePasswordEditPage } from './profile-password-edit.page';

describe('ProfilePasswordEditPage', () => {
  let component: ProfilePasswordEditPage;
  let fixture: ComponentFixture<ProfilePasswordEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilePasswordEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
