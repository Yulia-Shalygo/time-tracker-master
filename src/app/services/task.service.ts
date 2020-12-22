import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url = 'https://time-tracker-9eb9c-default-rtdb.firebaseio.com/tasks';

  constructor(private http: HttpClient) { }

  create(task: Task) { 
    firebase.database().ref(`tasks/${task.date}`).set(task).then(res => {
    })
  }

  readAll(): Task[] {
    console.log("READ")
    let arr:Task[] = [];

    firebase.database().ref(`tasks`) 
    .on('value',(data: DataSnapshot) => {
       data.forEach((child: DataSnapshot) => {
         arr.push(child.val())
       })
    })
    return arr;
  }
}
