class Hole {
    constructor(par, distance){
        this.par = par;
        this.distance = distance;
    }
    describe(){
        return `Par ${this.par} - ${this.distance} Yards`
    }
}

class Course {
    constructor(name){
        this.name = name;
        this.holes = [];
    }

    addHole(hole){
        if (hole instanceof Hole) {
        this.holes.push(hole);
        } else {
        throw new Error(`You can only add an istance of the Hole class. Argument is not a hole: ${hole}`);
        }
    }

    describe(){
        return `${this.name} has ${this.players.length} holes.`;
    }
}

class Menu {
    constructor(){
        this.courses = [];
        this.selectedCourse = null;
    }

    start(){
        let selection = this.showMainOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createCourse();
                    break;
                case '2':
                    this.viewCourse();
                    break;
                case '3':
                    this.deleteCourse();
                    break;
                case '4':
                    this.displayCourses();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainOptions();
        }

        alert('Au Revoir, Arrivederci, Adios Amigo');
    }

    showMainOptions(){
        return prompt(`GOLF COURSE MENU APP

        0) Exit
        1) Create New Course
        2) View Course
        3) Delete Course
        4) Display All Courses
        `);
    }

    showCourseOptions(courseInfo){
        return prompt(`
        0) Back
        1) Create Hole
        2) Delete Hole
        ------------------------
        ${courseInfo}
        `);
    }

    displayCourses() {
        let courseString = '';
        for (let i = 0; i < this.courses.length; i++){
            courseString += i + ') ' + this.courses[i].name + '\n';
        }
        alert(courseString);
    }

    createCourse(){
        let name = prompt('Enter new Golf Course Name');
        this.courses.push(new Course(name));
    }

    viewCourse(){
        let courseString = '';
        for (let i = 0; i < this.courses.length; i++){
            courseString += i + ') ' + this.courses[i].name + '\n';
        }
        let index = prompt(`Enter the index of the course you wish to view:
------------------------
${courseString}

        `);
        if (index > -1 && index < this.courses.length){
            this.selectedCourse = this.courses[index];
            let description = 'Course Name: ' + this.selectedCourse.name + '\n';

            for (let i = 0; i < this.selectedCourse.holes.length; i++){
                description += i + ') Hole ' + (i+1) + ' - Par ' + this.selectedCourse.holes[i].par  + ' - ' + this.selectedCourse.holes[i].distance + ' Yards' + '\n';
            }

            let selection = this.showCourseOptions(description);
            switch (selection){
                case '1':
                    this.createHole();
                    break;
                case '2':
                    this.deleteHole();
            }
        }
    }

    deleteCourse(){
        let courseString = '';
        for (let i = 0; i < this.courses.length; i++){
            courseString += i + ') ' + this.courses[i].name + '\n';
        }
        let index = prompt(`Enter the index of the course you wish to delete:
------------------------
${courseString}

        `);
        if (index > -1 && index < this.courses.length){
            this.courses.splice(index, 1);
        }
    }

    createHole(){
        let par = prompt('Enter the par number for this hole');
        let distance = prompt('Enter the distance in yards for this hole');
        this.selectedCourse.holes.push(new Hole(par, distance));
    }

    deleteHole(){
        let index = prompt('Enter the index of the Hole you wish to delete:');
        if (index > -1 && index < this.selectedCourse.holes.length){
            this.selectedCourse.holes.splice(index, 1);
        }
    }
}


let menu = new Menu();
menu.start();