import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url = 'https://time-tracker-9eb9c-default-rtdb.firebaseio.com/tasks';

  constructor(public dataService: DateService) { }

  create(task: Task) { 
    firebase.database().ref(`tasks/${task.user}/${task.date}`).set(task).then(res => {
    })
  }

  readAll(): Task[] {
    let arr:Task[] = [];

    const userUID = localStorage.getItem('user_id').replace("\"", "").replace("\"", "");

    firebase.database().ref(`tasks/${userUID}`) 
    .on('value',(data: DataSnapshot) => {
       data.forEach((child: DataSnapshot) => {
         arr.push(child.val())
       })
    })
    return arr;
  }
}
