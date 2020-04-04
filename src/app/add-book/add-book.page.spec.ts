import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBookPage } from './add-book.page';

describe('AddBookPage', () => {
  let component: AddBookPage;
  let fixture: ComponentFixture<AddBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
