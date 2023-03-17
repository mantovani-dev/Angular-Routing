import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  title = 'project';

  formStudent: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    matriculation: new FormControl(null, Validators.required),
    school: new FormControl(null, Validators.required),
    average: new FormControl(null, Validators.required),
  })

  students:any[]=[
   
  ]

  isEditing:boolean = false;
  currentIndex:number = 0

  getLocalStorage() {
    return JSON.parse(String(localStorage.getItem('db_student'))) ?? []
  }
  setLocalStorage(db_student:any[]) {
    localStorage.setItem("db_student", JSON.stringify(db_student))
  }

  ngOnInit() {
    this.students = this.getLocalStorage()
  }

  reset() {
    this.isEditing = false
  }
  
  save() {
    if (this.isEditing) {
      this.students[this.currentIndex] = this.formStudent.value
      this.formStudent.reset()
      this.isEditing = false
    } else {
      this.students.push(this.formStudent.value)
    }
    this.setLocalStorage(this.students)
    this.formStudent.reset()
    console.log("form:", this.formStudent.value)
  }
  
  toggleEdit(student:any, index:number) {
    this.isEditing = true;
    this.currentIndex = index;
    this.formStudent.patchValue({
      name: student.name,
      email: student.email,
      matriculation: student.matriculation,
      school: student.school,
      average: student.average,
    })
  }

  delete(index:number) {
    this.students.splice(index, 1)
    this.setLocalStorage(this.students)
  }
}
