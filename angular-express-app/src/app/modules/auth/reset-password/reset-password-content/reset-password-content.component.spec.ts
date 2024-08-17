import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordContentComponent } from './reset-password-content.component';

describe('ResetPasswordContentComponent', () => {
  let component: ResetPasswordContentComponent;
  let fixture: ComponentFixture<ResetPasswordContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
