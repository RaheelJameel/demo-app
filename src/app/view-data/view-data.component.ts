import { Component, OnInit } from '@angular/core';
import { Task } from './task-interface';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  tasks: Task[];

  constructor() {
    this.tasks = [
      {
        userId: 1,
        id: 2,
        title: "Hello",
        completed: false
      },
      {
        userId: 1,
        id: 3,
        title: "Hello",
        completed: false
      }
    ];
  }

  ngOnInit() {
  }
  
  getHeroes() {
  this.heroService.getHeroes()
                   .subscribe(
                     heroes => this.heroes = heroes,
                     error =>  this.errorMessage = <any>error);
}

}
