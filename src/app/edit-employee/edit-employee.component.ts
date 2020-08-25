import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {Router} from "@angular/router";
import { Employee } from '../employee';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: Employee;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    let employeeId = localStorage.getItem("editEmployeeId");
    if(!employeeId) {
      alert("Invalid action.")
      this.router.navigate(['']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      nik: [],
      name: [],
      type: [],
      lastPosition: [],
      positionId: [],
      divisionId: []
    });
    this.employeeService.getEmployee(+employeeId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          alert(error);
        });
  }
  // ngOnInit() {
  // }

  // newEmployee(): void {
  //   this.submitted = false;
  //   this.employee = new Employee();
  // }

  // save() {
  //   this.employeeService.createEmployee(this.employee)
  //     .subscribe(data => console.log(data), error => console.log(error));
  //   this.employee = new Employee();
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   this.save();
  // }
}
