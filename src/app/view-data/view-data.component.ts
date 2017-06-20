import { Component, OnInit } from '@angular/core';
import { Task } from './task-interface';
import { ViewDataService } from './view-data.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  errorMessage: string;
  tasks: Task[];

  constructor(private viewDataService: ViewDataService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.viewDataService.getData()
                    .subscribe(
                      tasks => this.tasks = tasks,
                      error =>  this.errorMessage = <any>error);
  }
}
