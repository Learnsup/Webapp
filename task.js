

var courseApi = 'http://localhost:3000/courses';
var minutesafter;


function start() {
    getCourses(renderCourse);
    setInterval(function() {
        var minutesbefore = new Date().getMinutes();
        if (minutesbefore != minutesafter) {
            console.log('minutesbefore: ' + minutesbefore);
            console.log('minutesafter: ' + minutesafter);
            minutesafter = minutesbefore;
            console.log('minutesafter: ' + minutesafter);
            FixNotifi();
        }
    }, 1000);
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
        document.querySelector('.calendar h1').innerHTML = `Schedule ${Day}/6/2021`;
    }
    day.onclick = function() {
        document.querySelector('.today').classList.remove('today');
        this.classList.add('today');
        Day = day.textContent;
        document.querySelector('.calendar h1').innerHTML = `Schedule ${Day}/6/2021`;
        getCourses(renderCourse);
    }
})

function FixNotifi() {
    getCourses(notification);
}

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
        let Hours = new Date().getHours();
        let Minutes = new Date().getMinutes();
        if (Hours.length == 1) Hours = '0' + Hours;
        if (Minutes.length == 1) Minutes = 0 + Minutes;
        let Clock = Hours + ':' + Minutes
        console.log(course.time);
        console.log(Clock);
        if (course.time == Clock && course.day == today) {
            check = true;
            dis = course.name;
            dis.toLowerCase();
        }
    })
    if (check) {
        Push.create("It's time to " + dis);
    }
}

function toggle_visibility() {
    var e = document.getElementById('feedback-main');
    var e2 = document.querySelector('.modal');
    if(e.style.display == 'block') {
       e.style.display = 'none';
       e2.style.display = 'none';
    }
    else {
       e2.style.display = 'block';
       e.style.display = 'block';
    }
}

function non() {
    location.replace('https://lienminh.garena.vn/');
}

