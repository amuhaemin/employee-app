import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee-input',
  templateUrl: './employee-input.component.html',
  styleUrls: ['./employee-input.component.css']
})
export class EmployeeInputComponent implements OnInit {

  constructor(
    private frmBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private location: Location
  ) { }


  frm: FormGroup;
  submitted: boolean;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.frm = new FormGroup({
      EmployeeName: new FormControl(),
      Age: new FormControl(),
      Houseno:  new FormControl(),
      Status:  new FormControl(),
      Jobs:  new FormControl(),
      Phone:  new FormControl(),
      Email:  new FormControl()
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(){
    console.log("masuk ke save");
    this.submitted = true;
    console.log(this.frm);
    // if (this.frm.invalid) {
    //   return;
    // }

    let employee = {
      username:  this.frm.get('EmployeeName').value,
      age:  this.frm.get('Age').value,
      houseno:  this.frm.get('Houseno').value,
      status:  this.frm.get('Status').value,
      jobs:  this.frm.get('Jobs').value,
      phone:  this.frm.get('Phone').value,
      email:  this.frm.get('Email').value
    }
    // console.log(employee);
    this.employeeService.addEmployee(employee).subscribe(()=>this.goBack())
  }

}
