import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import {HttpClientModule} from '@angular/common/http';


describe('CustomerService', () => {
  // let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
        providers: [CustomerService],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    // service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(CustomerService).toBeTruthy();
  });

});
