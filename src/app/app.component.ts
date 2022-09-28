import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CustomerService } from './customer.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import {Customer} from './customer'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  closeResult!: string;
  customers!: Customer[];
  errors!:string;
  currentCustomer!:Customer;
  firstName!:string;
  title = 'my-app';
  email!:string;
  errorMessage!:string
  customerExists!:boolean
  heading='CUSTOMER INFORMATION';
  form!:NgForm;
  color!:string
  
  constructor(private customerService:CustomerService,
    private httpClient:HttpClient,
    private modalService: NgbModal
  )
  {}

  ngOnInit(): void 
  {
    this.customerService.getCustomers().subscribe((data)=>{
    this.customers=data;
    })
  }
  

  onDeleteCustomer(targetModal:any, id:number) 
  {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    this.customerService.deleteCustomer(id)
    .subscribe((data)=>{
      // this.delete=data;
      this.ngOnInit();
      this.modalService.dismissAll();
      console.log("Customer deleted Successsfully" +data)
    },(err)=>{console.log("")})
  }
  onDelete() {
    
      // .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      // });
  }

  open(content: any) 
  {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string 
  {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) 
  {
    console.log(f.value)
    const postBody={
      email:f.value.email,
      firstName:f.value.firstName

    }
      this.customerService.postCustomer(postBody).subscribe((result) => {
        console.log(result);
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal:any,customer:Customer) 
  {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.getCustomerOne(customer.customerId);

  }
  getCustomerOne(id:number){
    this.customerService.getCustomerById(id).subscribe((data)=>{
      this.currentCustomer=data;
    });

  }
  

//  updateDetail(targetModal:any, customer:Customer,email:string) 
  updateDetail(targetModal:any,customer:Customer) 
  {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
    });
    this.getCustomerOne(customer.customerId)
  }


 onSubmit1(customerForm:NgForm)
 {

  // let currentCustomer1=this.customers.find((c)=>{return c.email === email});
  const updateBody={
    // customerId:this.currentCustomer.customerId,
    customerId:this.currentCustomer.customerId,
    email:this.currentCustomer.email,
    firstName:customerForm.value.firstName
  }
      // console.log(updateBody);
    this.customerService.updateCustomer(updateBody).subscribe((data)=>{
      console.log(data);
      this.currentCustomer=data;
      // console.log(this.currentCustomer);
      this.ngOnInit();
      
  })
  this.modalService.dismissAll();
}

testing(){

}

duplicateCheck(e: any):boolean{
  // let customerInfo=Customer;
  // console.log(e.target.value)
  let presentCustomer=this.customers;
  // console.log(presentCustomer);
   this.customerExists=false;
  for(let i=0;i<presentCustomer.length;i++)
  {
    if(presentCustomer[i].email == e.target.value){

      console.log(presentCustomer[i].email);
      console.log("testing");
      console.log(e.target.value);
      this.customerExists=true;

    }
  }
  if(this.customerExists==true)
  {
    // window.print();
    this.errorMessage="email id is duplicate"
    console.log("customer exists")
  }
  
  return this.customerExists;
}

}
