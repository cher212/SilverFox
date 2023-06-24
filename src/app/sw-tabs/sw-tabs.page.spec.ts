import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwTabsPage } from './sw-tabs.page';

describe('SwTabsPage', () => {
  let component: SwTabsPage;
  let fixture: ComponentFixture<SwTabsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SwTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
