

var courseApi = 'http://localhost:3000/courses';


function start() {
    getCourses(renderCourse);

    handleCreateForm();
}

start();


// Functions

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
    var listCoursesBlock = document.querySelector('#list-courses');
    console.log(listCoursesBlock);
    var htmls = courses.map(function(course) {
        return `
            <li class="course-item course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <p>${course.start} - ${course.end}</p>
                <button class="btn btn-radius btn-normal"onclick="handleDeteleCourse(${course.id})">Xóa</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    console.log(createBtn);

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var start = document.querySelector('input[name="start"]').value;
        var end = document.querySelector('input[name="end"]').value;
        
        var formData = {
            name: name,
            description: description,
            start: start,
            end: end,
        }

        createCourse(formData, function() {
            getCourses(renderCourse);
        });
    }
}