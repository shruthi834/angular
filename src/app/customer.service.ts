import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Customer} from './customer';
import { NgForm } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private http:HttpClient) { }
  
  getCustomerById(customerId:number):Observable<Customer>
  {
    let url='http://localhost:3000/customer/';
    // let url="http://localhost:3000/customer/";
    // return this.http.get(url);
    return this.http.get<Customer>(`${url}${customerId}`);

  }

  getCustomers():Observable<Customer[]>
  {
    let url='http://localhost:3000/customer/';
    return this.http.get<Customer[]>(`${url}`);
   
  }

  postCustomer(body: any):Observable<Customer>{
    let url='http://localhost:3000/customer';
    console.log(body);
    return this.http.post<Customer>(url,body);
  }

  updateCustomer(body:Customer):Observable<Customer>
  {
    // let url='http://localhost:3000/update-customer/';
    // return this.http.put<Customer>(`${url}${body}`);
    console.log(body);
      return this.http.put<Customer>('http://localhost:3000/customer/'+body.customerId,body);

  }

  deleteCustomer(customerId:number):Observable<Object>{
    return this.http.delete('http://localhost:3000/customer/'+customerId)

  }

  
}
