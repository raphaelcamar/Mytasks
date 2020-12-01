import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/tasks.model';
import { changeDate } from 'src/helpers/changeDate';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-month-tasks',
  templateUrl: './month-tasks.component.html',
  styleUrls: ['./month-tasks.component.css']
})
export class MonthTasksComponent implements OnInit {

  tasks : Tasks[]
  month : string;
  finishedTasks : number = 0;
  progressTasks : number = 0;
  canceledTasks : number = 0;
  displayedColumns: string[];
  dataSource : Tasks[]

  constructor(private headerService : HeaderService) { 
    this.headerService.headerData = {
      isAdm : true,
      isLogged : true,
      nameUser : 'Raphael',
      title : 'Tarefas Mensais',
      logout : true,
      routeUrl : ''
    }
  }
  ngOnInit(): void {
    console.log(history.state.data)
    const {month, tasks} = history.state.data
    this.month = changeDate.ReturningNameMonthByNumber(month);
    this.tasks = tasks
    this.dataSource = tasks
    this.displayedColumns = ['status','name', 'description', 'data', 'isFinished', 'importance', 'edit', 'delete'];
    console.log(this.tasks)
    this.tasks.forEach(item =>{
      
      if(item.isFinished == 'Finalizado'){
        this.finishedTasks += 1;
      }

      if(item.isFinished == 'Em processo'){
        this.progressTasks += 1;
      }
      if(item.isFinished == 'Cancelado'){
        this.canceledTasks += 1;
      }
    })
  }
}
