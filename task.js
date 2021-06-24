

var courseApi = 'http://localhost:3000/courses';


function start() {
    getCourses(renderCourse);
    setInterval(function() {
        getCourses(notification);
    }, 10 * 1000);
    handleCreateForm();
}

var Days = document.querySelectorAll('.calendar__day');
var Day,
    today = new Date(),
    today = today.getDate();

console.log(new Date());

Days.forEach(function(day) {
    if (day.textContent == today) {   
        if (!day.classList.contains('today')) {
            day.classList.add('today');
        } 
        Day = day.textContent;
        document.querySelector('.calendar h1').innerHTML = `Danh sách lịch học ngày ${Day}/6/2021`;
    }
    day.onclick = function() {
        document.querySelector('.today').classList.remove('today');
        this.classList.add('today');
        Day = day.textContent;
        document.querySelector('.calendar h1').innerHTML = `Danh sách lịch học ngày ${Day}/6/2021`;
        getCourses(renderCourse);
    }
})

start();
// // Functions

function getCourses(callback) {
    fetch(courseApi)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function handleDeteleCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    }
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}

function renderCourse(courses) {
    var listCoursesBlock = document.querySelector('.noteList');
    courses = courses.filter(function(course) {
        return course.day == Day;
    })
    var htmls = courses.map(function(course) {
        return `
            <li onclick="handleDeteleCourse(${course.id})" class="course-item-${course.id}">
                ${course.name} - ${course.time}<button title="Remove note" class="removeNote animate">x</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('.addNote');
    console.log(createBtn);

    createBtn.onclick = function() {
        var name = document.querySelector('input[type="text"]').value;
        var time = document.querySelector('input[type="time"]').value;
        var formData = {
            name: name,
            day: Day,
            time: time,
        }

        createCourse(formData, function() {
            getCourses(renderCourse);
        });
    }
}

function notification(courses) {
    var check = false, dis;
    courses.forEach(function(course) {
        let Clock = new Date().getHours() + ':' + new Date().getMinutes();
        if (course.time == Clock && course.day == today) {
            check = true;
            dis = course.name;
        }
    })
    if (check) {
        //console.log(dis);
        Push.create("Đã đến giờ " + dis);
    }
}

