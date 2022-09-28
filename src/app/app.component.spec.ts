import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {CustomerService} from './customer.service';
import { Observable, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import {AppComponent} from './app.component'
// import { Component } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  // let componentInstance: AppComponent;
  let fixture:ComponentFixture<AppComponent>;
  let service:CustomerService;
  let deb:DebugElement;
  let de:DebugElement;
  let el:HTMLElement;
  
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CustomerService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents().then(()=>{
      fixture=TestBed.createComponent(AppComponent);
      component=fixture.componentInstance;
    });
  });

  
  beforeEach(()=>{
    
    // componentInstance=fixture.componentInstance;
    service=TestBed.get(CustomerService);
    
    fixture.detectChanges();
    deb=fixture.debugElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Should have the title`,()=>{
    // expect(component.heading).toBe('CUSTOMER INFORMATION')
    const title=deb.query(By.css('h1')).nativeElement;
    expect(title).toBeTruthy();
    expect(title.innerHTML).toEqual(component.heading);
  })

  it('should have correct color', () => {
    let customColor = 'rgb(0, 0, 0)';
        component.color = customColor;
        fixture.detectChanges();
        const colorEl: HTMLElement = fixture.debugElement.query(By.css('.colored-div')).nativeElement;
        expect(colorEl.style.color).toBe(customColor);
    });

    xit('should have button disabled', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#no-btn');
      expect(btn.disabled).toBeTruthy();
    });

    it(`testing the button click`,fakeAsync(()=>{
      let buttonElement = fixture.debugElement.query(By.css('.buttoninfo'));
      spyOn(component, 'getCustomerOne');
      //Trigger click event after spyOn
      buttonElement.triggerEventHandler('click', null);
      tick();
      expect(component.getCustomerOne).toHaveBeenCalled();
    }));

  xit(`for loop testing`,()=>{
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      
      const element:DebugElement[]= fixture.debugElement.queryAll(By.css('.forTesting'))
      // component.ngOnInit();
      // service.getCustomers();
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        expect(element.length).toEqual(6);
      })
      
    })
  })

 
  it(`should test the table`,()=>{
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();

    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(1);

    // Header row
    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe('Id');
    expect(headerRow.cells[1].innerHTML).toBe('Email');
    expect(headerRow.cells[2].innerHTML).toBe('FirstName');
    expect(headerRow.cells[3].innerHTML).toBe('Action');

    // Data rows
    // let row1 = tableRows[1];
    // expect(row1.cells[0].innerHTML).toBe('dummy@mail.com');
    // expect(row1.cells[1].innerHTML).toBe('01-01-2020');
    // expect(row1.cells[2].innerHTML).toBe('admin,standard');
  });
});


  it(`Calling the getCustomers API to be truthy`,()=>{
    // fakeAsync(()=>{
    const data=[{"customerId" :2,"email":"" ,"firstName": ""}];
    // let service= fixture.debugElement.injector.get(CustomerService);
    spyOn(service,'getCustomers').and.returnValue(of(data));
    component.ngOnInit();
    expect(component.customers[0].customerId).toBeTruthy();

  // });
  });




});
