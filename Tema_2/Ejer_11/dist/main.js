(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Context class. Devised to control every element involved in the app: students, gradedTasks ...
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @tutorial pointing-criteria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _person = require('./person.js');

var _person2 = _interopRequireDefault(_person);

var _gradedtask = require('./gradedtask.js');

var _gradedtask2 = _interopRequireDefault(_gradedtask);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
    function Context() {
        _classCallCheck(this, Context);

        (0, _utils.loadDoc)('../template/listRank.html', _utils.loadTemplate);
        this.students = [];
        this.gradedTasks = [];
    }

    /**
     * ////////////////////////////////////// Load /////////////////////////////////////////////////////
     */
    /** Load Students data from local storage */


    _createClass(Context, [{
        key: 'loadStudents',
        value: function loadStudents() {
            this.getLocal(this.students);
        }

        /** Load template of add task */

    }, {
        key: 'addTask',
        value: function addTask() {
            var _this = this;

            var addTask = document.getElementById("addGradedTask");
            addTask.addEventListener("click", function () {
                (0, _utils.loadDoc)('../template/addTask.html', _utils.loadTemplate);
                setTimeout(function () {
                    this.newTask();
                }.bind(_this), 200);
            });
        }

        /** Load template of add students */

    }, {
        key: 'addStudent',
        value: function addStudent() {
            var _this2 = this;

            var addStudent = document.getElementById("addStudent");
            addStudent.addEventListener("click", function () {
                (0, _utils.loadDoc)('../template/addStudent.html', _utils.loadTemplate);
                setTimeout(function () {
                    this.newStudent();
                }.bind(_this2), 200);
            });
        }

        /** Load template of list rank */

    }, {
        key: 'listRank',
        value: function listRank() {
            var _this3 = this;

            var listRank = document.getElementById("listRank");
            listRank.addEventListener("click", function () {
                (0, _utils.loadDoc)('../template/listRank.html', _utils.loadTemplate);
                setTimeout(function () {
                    this.getRanking();
                }.bind(_this3), 200);
            });
        }

        /**
         * ////////////////////////////////////// Add lisener /////////////////////////////////////////////////////
         */
        /** Add lisener to the button of the add task */

    }, {
        key: 'newTask',
        value: function newTask() {
            var _this4 = this;

            var newTask = document.getElementById("newTask");
            newTask.addEventListener("click", function () {
                _this4.addGradedTask();
            });
        }

        /** Add lisener to the button of the add students */

    }, {
        key: 'newStudent',
        value: function newStudent() {
            var _this5 = this;

            var newTask = document.getElementById("newStudent");
            newTask.addEventListener("click", function () {
                _this5.createStudent();
            });
        }

        /** Draw Students rank table in descendent order using points as a criteria */

    }, {
        key: 'getRanking',
        value: function getRanking() {
            console.log(this.students);
            this.students.sort(function (a, b) {
                return b.points - a.points;
            });

            var studentsEl = document.getElementById("llistat");

            while (studentsEl.firstChild) {
                studentsEl.removeChild(studentsEl.firstChild);
            }

            var headerString = "<tr><td colspan='3'></td>";
            this.gradedTasks.forEach(function (taskItem) {
                headerString += "<td>" + taskItem.name + "</td>";
            });
            studentsEl.innerHTML = headerString;
            this.students.forEach(function (studentItem) {
                var liEl = studentItem.getHTMLView();
                studentsEl.appendChild(liEl);
            });

            this.setLocal();
        }
        /** Create a form to create a GradedTask that will be added to every student */

    }, {
        key: 'addGradedTask',
        value: function addGradedTask() {
            var taskName = document.getElementById("name").value;
            console.log(taskName);
            var gtask = new _gradedtask2.default(taskName);
            this.gradedTasks.push(gtask);
            this.students.forEach(function (studentItem) {
                studentItem.addGradedTask(gtask, 0);
            });
            (0, _utils.loadDoc)('../template/listRank.html', _utils.loadTemplate);
            setTimeout(function () {
                this.getRanking();
            }.bind(this), 200);
        }

        /** Create a form to create a Students */

    }, {
        key: 'createStudent',
        value: function createStudent() {
            var name = document.getElementById("name").value;
            var surname = document.getElementById("surname").value;
            this.students.push(new _person2.default(name, surname, 0));
            (0, _utils.loadDoc)('../template/listRank.html', _utils.loadTemplate);
            setTimeout(function () {
                this.getRanking();
            }.bind(this), 200);
        }

        /** Save the data of the students in local storage */
        //Move this function to utils

    }, {
        key: 'setLocal',
        value: function setLocal() {
            var users1 = "[";
            var cont = 0;
            this.students.forEach(function (userItem) {

                var users = { "name": userItem.name, "surname": userItem.surname, "points": userItem.points, "gradedtask": userItem.gradedTasks };
                if (cont == 0) {
                    //console.log(userItem.gradedTasks[0].task.name);
                    //console.log(userItem.gradedTasks[0].points);
                    users1 = users1 + JSON.stringify(users);
                } else if (cont !== 0) {
                    users1 = users1 + "," + JSON.stringify(users);
                }
                cont++;
            });
            users1 = users1 + "]";
            localStorage.setItem("students", users1);
        }

        /** Get the data of the students from local storage */
        //Move this function to utils

    }, {
        key: 'getLocal',
        value: function getLocal() {
            var user1 = localStorage.students;
            var user = JSON.parse(user1);
            var cont = 0;
            var cont1 = 0;
            var cont2 = 0;
            var task = [];
            var nametask = [];
            var that = this;
            user.forEach(function () {
                console.log(user[cont].name + "," + user[cont].surname + "," + user[cont].points + "," + user[cont].gradedtask);
                if (cont == 0) {
                    user[cont].gradedtask.forEach(function () {
                        nametask.push(user[cont].gradedtask[cont1].task.name);
                        cont1++;
                    });
                }
                user[cont].gradedtask.forEach(function () {
                    task.push({ "nameuser": user[cont].name, "nametask": user[cont].gradedtask[cont2].task.name, "points": user[cont].gradedtask[cont2].points });
                    cont2++;
                });
                cont2 = 0;
                that.students.push(new _person2.default(user[cont].name, user[cont].surname, user[cont].points));
                cont++;
            });
            console.log(task);
            cont = 0;

            var _loop = function _loop(i) {
                cont2 = i;
                var points = 0;
                var taskName = nametask[i];
                console.log(taskName);
                var gtask = new _gradedtask2.default(taskName);
                that.gradedTasks.push(gtask);
                that.students.forEach(function (studentItem) {
                    points = task[cont2].points;
                    console.log(points);
                    console.log(studentItem.gradedTasks);
                    studentItem.addGradedTask(gtask, points);
                    points = 0;
                    cont2 = cont2 + cont1;
                });
                cont = cont + cont2 / cont1;
            };

            for (var i = 0; i < cont1; i++) {
                _loop(i);
            }
        }
    }]);

    return Context;
}();

exports.default = Context = new Context();

},{"./gradedtask.js":2,"./person.js":4,"./utils.js":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * GradedTask class. Create a graded task in order to be evaluated for every student engaged
 * @constructor
 * @param {string} name - task name
 * @tutorial pointing-criteria
 */

var GradedTask = function GradedTask(name) {
  _classCallCheck(this, GradedTask);

  this.name = name;
};

exports.default = GradedTask;

},{}],3:[function(require,module,exports){
'use strict';

var _context = require('./context.js');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//jshinty jscs, local storage, add user, mecanisme de templates, implementar ajax
/** Once the page is loaded we get a context app object an generate students rank view. */
window.onload = function () {
  _context2.default.loadStudents();
  _context2.default.addTask();
  _context2.default.addStudent();
  _context2.default.getRanking();
  _context2.default.listRank();
};

},{"./context.js":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Person class. We store personal information and points that reflect daily classroom job
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @constructor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} name - Person name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {string} surname - Person surname
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {number} points - Person total points 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @tutorial pointing-criteria
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('./utils.js');

var _context = require('./context.js');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
  function Person(name, surname, points) {
    _classCallCheck(this, Person);

    this.name = name;
    this.surname = surname;
    this.points = points;
    this.gradedTasks = [];
  }

  /** Add points to persons we should carefully use it. */


  _createClass(Person, [{
    key: 'addPoints',
    value: function addPoints(points) {
      this.points += points;
    }
    /** Add a gradded task linked to person with its own mark. */

  }, {
    key: 'addGradedTask',
    value: function addGradedTask(taskInstance, points) {
      this.gradedTasks.push({ "task": taskInstance, "points": points });
      _context2.default.listRank();
    }
    /** Renders HTML person view Create a table row (tr) with all name, points , add button and one input for every gradded task binded for that person. */

  }, {
    key: 'getHTMLView',
    value: function getHTMLView() {
      var _this = this;

      var liEl = document.createElement("tr");

      liEl.appendChild((0, _utils.getElementTd)(this.surname + ", " + this.name));

      liEl.appendChild((0, _utils.getElementTd)(this.points));

      var addPointsEl = document.createElement("button");
      var tb = document.createTextNode("+20");
      addPointsEl.appendChild(tb);

      liEl.appendChild((0, _utils.getElementTd)(addPointsEl));

      addPointsEl.addEventListener("click", function () {
        _this.addPoints(20);
        setTimeout(function () {
          _context2.default.getRanking();
        }.bind(_this), 1000);
      });

      var that = this;
      this.calculatedPoints = 0;
      this.gradedTasks.forEach(function (gTaskItem) {
        var inputEl = document.createElement("input");
        inputEl.type = "number";inputEl.min = 0;inputEl.max = 100;
        inputEl.value = gTaskItem["points"];
        inputEl.addEventListener("change", function (event) {
          that.addPoints(parseInt(gTaskItem["points"]) * -1);
          gTaskItem["points"] = inputEl.value;
          that.addPoints(parseInt(gTaskItem["points"]));
          _context2.default.getRanking();
        });
        liEl.appendChild((0, _utils.getElementTd)(inputEl));
      });

      return liEl;
    }
  }]);

  return Person;
}();

exports.default = Person;

},{"./context.js":1,"./utils.js":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Hash code funtion usefull for getting an unique id based on a large text */
function hashcode(str) {
  var hash = 0,
      i,
      chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/** Pass a text or an element ang get a td table element wrapping it. */
function getElementTd(text) {
  var tdEl = document.createElement("td");
  var t = text;
  if (typeof text === "string" || typeof text === "number") {
    t = document.createTextNode(text); // Create a text node
  }
  tdEl.appendChild(t);
  return tdEl;
}
/**
 * Obtain the html how one string
 * @param {*} url url of the template 
 * @param {*} cFunction function to print this template
 */
function loadDoc(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/**
 * print the template from string
 * @param {*} xhttp string with html
 */
function loadTemplate(xhttp) {
  console.log(xhttp.responseText);
  document.getElementById("content").innerHTML = xhttp.responseText;
}

exports.hashcode = hashcode;
exports.getElementTd = getElementTd;
exports.loadDoc = loadDoc;
exports.loadTemplate = loadTemplate;

},{}]},{},[3]);
