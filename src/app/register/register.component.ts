import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = 'project'; // Variável não está sendo utilizada

  index: number = 0; // Variável para pegar o index caso esteja editando

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  getLocalStorage() {
    return JSON.parse(String(localStorage.getItem('db_student'))) ?? []
  }
  setLocalStorage(db_student:any[]) {
    localStorage.setItem("db_student", JSON.stringify(db_student))
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('index')) // Verifica se há o parâmetro index na rota
      this.index = Number(this.route.snapshot.paramMap.get('index')); // Define this.index com o index que vem na rota

    this.students = this.getLocalStorage()
  }

  goToList() {
    this.router.navigate(['/list'])
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
    this.goToList()
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
