import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-add-price',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './add-price.component.html',
  styleUrl: './add-price.component.css',
})
export class AddPriceComponent implements OnInit {
  categoryForm = new FormGroup({
    Category: new FormControl(null, Validators.required),
    Minimum_weight: new FormControl(0.0, [
      Validators.required,
      Validators.min(0),
    ]),
    Price: new FormControl(0.0, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  constructor(private admin: AdminService, private route: Router) {}

  ngOnInit(): void {}

  save(): void {
    if (this.categoryForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please fill out the form correctly',
        showConfirmButton: true,
      });
      return;
    }

    console.log(this.categoryForm.value);

   
    this.admin.addprice(this.categoryForm.value).subscribe(
      (result: any) => {
        if (result.message === 'Success') {
          Swal.fire(
            'Success!',
            'Your data has been saved.',
            'success'
          );
          this.clear();
          this.route.navigate(['/main/pricemanagementpage/pricemgtmain/viewcateg/pricemgtview']);
        } else {
          console.error('Error occurred during save:', result);
        }
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire(
          'Error!',
          'Duplicated Category.',
          'error'
        );
    
      }
    );
  }

  clear(): void {
    this.categoryForm.reset();
  }

  onNumberInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (+inputElement.value < 0) {
      inputElement.value = '0';
    }
  }
}
