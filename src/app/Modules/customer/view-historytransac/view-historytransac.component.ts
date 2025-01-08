import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-view-historytransac',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule,NgxPrintModule],
  templateUrl: './view-historytransac.component.html',
  styleUrl: './view-historytransac.component.css',
})
export class ViewHistorytransacComponent implements OnInit{
  cust_id = {id:localStorage.getItem('Cust_ID')}
  his_id = {id:localStorage.getItem('Transac_ID')}
  custs:any;
  histo: any;
  totalAmount: any;
  cust: any;
  totalpayment: any;
  balance: any;
  data:any;
  totalPayment: any;
  histoss: any;
  trans_id: any;
  payment: any;
  trackingnumber: any;
  totalamount: any;
  addservices: any;
  service: any;
  isLoading: boolean = false;
  estimated_date:any
  Transac_datetime:any

  constructor(
    private admin: AdminService
  ){}
  ngOnInit(): void {
    this.spinner();
    this.admin.findcustomer(this.cust_id.id).subscribe(
      (result: any) => {
        this.cust = result; 
        console.log(result);
      }
    );
    this.admin.findtransactionprint(this.his_id.id).subscribe(
      (result: any) => {
        this.histo = result.data; 
        this.trackingnumber = result.data[0].Tracking_number;
        this.payment = result.data[0].totalPaymentAmount;
        this.totalpayment = result.price;
        this.totalamount = result.totalamount;
        this.addservices = result.addprice;
        this.balance = result.data[0].balanceAmount; 
        this.service = result.servicedata;
        this.estimated_date = result.data[0].estimated_date; 
        this.Transac_datetime = result.data[0].Transac_datetime; 
        console.log( this.histo,this.payment,this.totalpayment,this.trackingnumber );
      }
    );
    
  }
  spinner(){
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false;
    },3000);
  }
}
