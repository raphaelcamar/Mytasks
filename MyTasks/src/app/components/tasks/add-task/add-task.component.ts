import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Tasks } from 'src/app/models/tasks.model';
import { User } from 'src/app/models/user.model';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { changeName } from 'src/helpers/changeName';
import { validations } from 'src/helpers/validation';
import { CardService } from '../../card/card.service';
import { HeaderService } from '../../header/header.service';
import { TableService } from '../../table/table.service';
import { TasksComponent } from '../tasks.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  tasks : Tasks;
  allTasks : Tasks[];
  user : User;
  formulary : FormGroup;
  dateTime = new Date();
  displayedColumns: string[];
  dataSource : Tasks[];
  buttonStyle : any

  constructor(private taskService : TasksService, private dialog : MatDialog, private fb : FormBuilder, private cardService : CardService, private table : TableService) { 

  this.user = JSON.parse(localStorage.getItem('logged'));
    
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('logged') == null  ? JSON.parse(localStorage.getItem('logged')) : JSON.parse(sessionStorage.getItem('logged'));


    const {id} = this.user;

    this.tasks = new Tasks();
    
    this.tasks.idUser = id;

    this.formValidation();

  }

  addTask(){
    const id = this.tasks.idUser;
    this.tasks = this.formulary.value;
    this.tasks.idUser = id;
    this.taskService.create(this.tasks)
    .subscribe(resp =>{
      this.taskService.message('Tarefa criada com sucesso!');
      // this.table.updateTable();
    }) 
  }

   formValidation(){
     this.formulary = this.fb.group({
       name : ['', Validators.compose([
         Validators.required,
         validations.completeName])],
       description : ['', Validators.compose([
         Validators.required,
         validations.completeName])],
       data : ['', Validators.compose([
         Validators.required
       ])],
       isFinished : ['', Validators.compose([
         Validators.required])],
       importance : ['',Validators.compose([
         Validators.required,
         Validators.maxLength(35)
       ])],
     })
   }
}
