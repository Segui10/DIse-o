/**
 * Context class. Devised to control every element involved in the app: students, gradedTasks ...
 *
 * @constructor
 * @tutorial pointing-criteria
 */

/*jshint -W061 */

import Person from './person.js';
import GradedTask from './gradedtask.js';
import {hashcode,getElementTd,deleteContent,loadTemplate} from './utils.js';

class Context {

  constructor() {
    this.students1= new Map;
    this.students = [];
    this.gradedTasks = [];
    this.showNumGradedTasks = 1;

    if (localStorage.getItem('students')) {
      let students_ = JSON.parse(localStorage.getItem('students'));
      
      console.log(students_);
      for (let i = 0;i < students_.length;i++) {
         this.students1.set(students_[i]["1"].hash, new Person(students_[i]["1"].name,students_[i]["1"].surname,
          students_[i]["1"].attitudeTasks,students_[i]["1"].gradedTasks));
      }
    }
    if (localStorage.getItem('gradedTasks')) {
      this.gradedTasks = JSON.parse(localStorage.getItem('gradedTasks'));
    }
  }

  /** Draw Students rank table in descendent order using points as a criteria */
  getTemplateRanking() {
     /** Sort dont works */
    let arr=[...this.students1.entries()].sort((a,b)=>{a[1].getTotalPoints() < b[1].getTotalPoints()});
    console.log(arr);
    /*this.arr.sort(function(a, b) {
      return (b[1].getTotalPoints() - a[1].getTotalPoints());
    });*/
    this.students1=new Map;
    for (let i = 0;i < arr.length;i++) {
      this.students1.set(arr[i]["1"].hash, new Person(arr[i]["1"].name,arr[i]["1"].surname,
      arr[i]["1"].attitudeTasks,arr[i]["1"].gradedTasks));
   }
      localStorage.setItem('students',JSON.stringify(arr));
      let GRADED_TASKS = '';
      this.gradedTasks.forEach(function(taskItem) {
        GRADED_TASKS += '<td role="column" class="block-main-table-head-column">' + taskItem.name + '</td>';
      });

      loadTemplate('templates/rankingList.html',function(responseText) {
              document.getElementById('content').innerHTML = eval('`' + responseText + '`');
              let tableBody = document.getElementById('idTableRankingBody');
              this.students1.forEach(function(studentItem) {
                let liEl = studentItem.getHTMLView();
                tableBody.appendChild(liEl);
              });
            }.bind(this));
  }

  /** Create a form to create a GradedTask that will be added to every student */
  addGradedTask() {

    let callback = function(responseText) {
            let saveGradedTask = document.getElementById('newGradedTask');

            saveGradedTask.addEventListener('submit', () => {
              let name = document.getElementById('idTaskName').value;
              let description = document.getElementById('idTaskDescription').value;
              let weight = document.getElementById('idTaskWeight').value;
              let gtask = new GradedTask(name,description,weight);
              this.gradedTasks.push(gtask);
              localStorage.setItem('gradedTasks',JSON.stringify(this.gradedTasks));
              this.students1.forEach(function(studentItem) {
                studentItem.addGradedTask(gtask);
              });
              this.getTemplateRanking();
            });
          }.bind(this);

    loadTemplate('templates/addGradedTask.html',callback);
  }
  /** Add a new person to the context app */
  addPerson() {

    let callback = function(responseText) {
            let saveStudent = document.getElementById('newStudent');
            saveStudent.addEventListener('submit', () => {
              var name = document.getElementById('idFirstName').value;
              var surnames = document.getElementById('idSurnames').value;
              var student = new Person(name,surnames,[],[]);
              this.gradedTasks.forEach(function(iGradedTask) {
                    student.addGradedTask(new GradedTask(iGradedTask.name));
                  });
              this.students1.set(student.hash,student);
              let arr=[...this.students1];
              for (let i = 0;i < arr.length;i++) {
                this.students1.set(arr[i]["1"].hash, new Person(arr[i]["1"].name,arr[i]["1"].surname,
                arr[i]["1"].attitudeTasks,arr[i]["1"].gradedTasks));
             }
              localStorage.setItem('students',JSON.stringify(arr));
            });
          }.bind(this);
    loadTemplate('templates/addStudent.html',callback);
  }
/** Delete a person to the context app */
  deletePerson(hash){
    let posDelet=this.obtainStudent(hash);
    let arr=[...this.students1];
    this.students1=new Map;
    console.log(arr);
      arr.splice(posDelet, 1);
      if(this.students1){localStorage.setItem("students",[])}
      for (let i = 0;i < arr.length;i++) {
        this.students1.set(arr[i]["1"].hash, new Person(arr[i]["1"].name,arr[i]["1"].surname,
        arr[i]["1"].attitudeTasks,arr[i]["1"].gradedTasks));
     }
      context.getTemplateRanking();
  }

  /** Obtain a new name and surname for a person to the context app */
  loadUpdateStudent(hash){
    let callback = function(responseText) {
      let students= JSON.parse(localStorage.getItem('students'));
      let position=this.obtainStudent(hash);
      let saveStudent = document.getElementById('updateStudent');
      document.getElementById('idFirstName').value=students[position][1].name;
      document.getElementById('idSurnames').value=students[position][1].surname;
      saveStudent.addEventListener('submit', () => {
        this.updatePerson(hash,document.getElementById('idFirstName').value,document.getElementById('idSurnames').value);
      });
    }.bind(this);
  loadTemplate('templates/updateStudent.html',callback);
  }

 /** Update a person to the context app */
  updatePerson(hash,Nname,Nsurname){
    console.log(Nsurname);
    let position=this.obtainStudent(hash);
    let students= JSON.parse(localStorage.getItem('students'));
    students[position][1].name=Nname;
    students[position][1].surname=Nsurname;
    for (let i = 0;i < students.length;i++) {
      this.students1.set(students[i]["1"].hash, new Person(students[i]["1"].name,students[i]["1"].surname,
      students[i]["1"].attitudeTasks,students[i]["1"].gradedTasks));
   }
    localStorage.setItem('students',JSON.stringify(this.students1))
    context.getTemplateRanking();
  }

   /** Extra Points a person to the context app */
  xpPerson(hash){
    obtainStudent(hash);
    let popUp = popupwindow('templates/listAttitudeTasks.html','XP points to ' +
    this.name,300,400);
      let personInstance = this;
      console.log(personInstance);
      popUp.onload = function() {
        popUp.document.title = personInstance.name + ' ' +
          personInstance.surname + ' XP points';
        let xpButtons = popUp.document.getElementsByClassName('xp');
        Array.prototype.forEach.call(xpButtons,function(xpBItem) {
        xpBItem.addEventListener('click', () => {
          popUp.close();
          personInstance.addAttitudeTask(new AttitudeTask('XP task',
                    xpBItem.innerHTML,xpBItem.value));
          });
        });
      };
  }

   /** obtain position of a person to the context app */
  obtainStudent(hash){
    let cont=0;
    let position=0;
    this.students1.forEach(function(studentItem){
      if(studentItem.hash==hash){position=cont}
      cont++
    });
    return position
  }
  /** Add last action performed to lower information layer in main app */

  notify(text) {
    document.getElementById('notify').innerHTML = text;
  }
}

export let context = new Context(); //Singleton export
