import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../iemployee';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: Employee;
  frm: FormGroup;
  isEnable: boolean = false;


  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location    
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployee();
    this.frm.disable();
  }

  enableForm(){
    this.frm.enable();
  }

  initForm(): void{
    this.frm = new FormGroup({
      EmployeeName: new FormControl(),
      Age: new FormControl(),
      Houseno:  new FormControl(),
      Status:  new FormControl(),
      Jobs:  new FormControl(),
      Phone:  new FormControl(),
      Email:  new FormControl(),
    });
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('id' + id);
    this.employeeService.getEmployee(id)
      .subscribe((res:any)=>{
        this.employee=res;
        console.log(res);
        console.log(this.employee);
        this.frm.get('EmployeeName').setValue(res.Username);
        this.frm.get('Age').setValue(res.Age);
        this.frm.get('Houseno').setValue(res.Houseno);
        this.frm.get('Status').setValue(res.Status);
        this.frm.get('Jobs').setValue(res.Jobs);
        this.frm.get('Phone').setValue(res.Phone);
        this.frm.get('Email').setValue(res.Email);
      });
  }

  goBack(): void {
    this.location.back();
  }

  UpdateData(): void{
      this.employeeService.updateEmployee(this.employee)
      .subscribe(()=>this.goBack());
    
  }

}
