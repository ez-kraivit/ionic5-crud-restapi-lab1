import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBookPage } from './edit-book.page';

describe('EditBookPage', () => {
  let component: EditBookPage;
  let fixture: ComponentFixture<EditBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
