import { Component, OnInit } from '@angular/core';
import { Employee } from '../iemployee';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(){
     
   this.employeeService.getEmployees().subscribe((res:any) => {
     this.employees = res;
     
    //  console.log("test",this.employees);
   })
  }

}
