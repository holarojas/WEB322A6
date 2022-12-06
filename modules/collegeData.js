
const Sequelize = require('sequelize');

var sequelize = new Sequelize('xtzrlioo', 'xtzrlioo', '2cQI8SEN85e3ORQLwRaX8U8VgCcT6Rws', {
    host: 'suleiman.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});
// sequelize
//     .authenticate()
//     .then(function () {
//         console.log('Connection to DB has been established successfully.');
//     })
//     .catch(function (err) {
//         console.log('Unable to connect to the database: ', err);
//     });

//Define 2 data models and their relationship
var Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING,
    course: Sequelize.INTEGER
});

var Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
});

Course.hasMany(Student, { foreignKey: 'course' });



module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        //Ensure that we can connect to the DB and that our models are represented in the database as tables
        sequelize.sync().then(function () {
            //Invoke resolve method to communicate back that the operation was a success
            resolve();
        }).catch(function (error) {
            //If there was an error, invoke the reject method and pass a message
            reject("Unable to sync() the database");
        });
    });
}

module.exports.getAllStudents = function () {
    return new Promise((resolve, reject) => {
        Student.findAll({
        }).then(function (data) {
            //If operation resolved successfully invoke the resolve method with the data
            console.log("All data retrieved");
            resolve(data);
        }).catch(function (error) {
            //If there was an error invoke the reject method and pass a message
            reject("No results returned from findAll()");
        });
    });
}

module.exports.getCourses = function () {
    return new Promise((resolve, reject) => {
        Course.findAll({
        }).then(function (data) {
            //If operation resolved successfully invoke the resolve method with the data
            console.log("All data retrieved");
            resolve(data);
        }).catch(function (error) {
            //If there was an error invoke the reject method and pass a message
            reject("No results returned from findAll()");
        });
    });
};

module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            where: {
                studentNum: num
            }
        }).then(function (data) {
            //If operation resolved successfully invoke the resolve method with the data
            console.log("All data retrieved");
            resolve(data[0]);
        }).catch(function (error) {
            //If there was an error invoke the reject method and pass a message
            reject("No results returned from findAll() with where clause");
        });
    });
};

module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            where: {
                courseId: course
            }
        }).then(function (data) {
            //If operation resolved successfully invoke the resolve method with the data
            console.log("All data retrieved");
            resolve(data[0]);
        }).catch(function (error) {
            //If there was an error invoke the reject method and pass a message
            reject("No results returned from findAll() with where clause");
        });
    });
};

module.exports.getCourseById = function (id) {
    return new Promise(function (resolve, reject) {
        Course.findAll({
            where: {
                studentNum: num
            }
        }).then(function (data) {
            //If operation resolved successfully invoke the resolve method with the data
            console.log("All data retrieved");
            resolve(data[0]);
        }).catch(function (error) {
            //If there was an error invoke the reject method and pass a message
            reject("No results returned from findAll() with where clause");
        });
    });
};

module.exports.addStudent = function (studentData) {
    return new Promise(function (resolve, reject) {
        studentData.TA = (studentData.TA) ? true : false;
        //Iterate over every property in an object to check for empty values and replace them with null
        for (const property in studentData) {
            if (property == "") {
                property = null;
            }
        }

        //Invoke create() function
        Student.create({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            addressStreet: studentData.addressStreet,
            addressCity: studentData.addressCity,
            addressProvince: studentData.addressProvince,
            TA: studentData.TA,
            status: studentData.status
        }).then(function () {
            console.log("Student created!");
            resolve();
        }).catch(function (error) {
            reject("Unable to create student.");
        });
    });

};

module.exports.updateStudent = function (studentData) {
    return new Promise(function (resolve, reject) {
        studentData.TA = (studentData.TA) ? true : false;
        //Iterate over every property in an object to check for empty values and replace them with null
        for (const property in studentData) {
            if (property == "") {
                property = null;
            }
        }

        //Invoke the update function and filter the operation by studentNum
        Student.update({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            addressStreet: studentData.addressStreet,
            addressCity: studentData.addressCity,
            addressProvince: studentData.addressProvince,
            TA: studentData.TA,
            status: studentData.status,
            course: Course.courseId
        }, {
            where: { studentNum: studentData.studentNum }
        }).then(function () {
            console.log("Student updated!");
            resolve();
        }).catch(function (error) {
            reject("Unable to update student");
        });
    });
};


module.exports.deleteStudentByNum = function (studentNum) {
    return new Promise(function (resolve, reject) {
        Student.destroy({
            where: {
                studentNum: studentNum
            }
        }).then(function () {
            //If operation resolved successfully invoke the resolve method
            console.log("Student destroyed!");
            resolve();
        }).catch(function (error) {
            //If there was an error invoke the reject method and pass a message
            reject("Could not destroy student");
        });
    });
};



module.exports.addCourse = function (courseData) {
    return new Promise(function (resolve, reject) {
        //Iterate over every property in an object to check for empty values and replace them with null
        for (const property in courseData) {
            if (property == "") {
                property = null;
            }
        }

        //Invoke create() function
        Course.create({
            courseCode: courseData.courseCode,
            courseDescription: courseData.courseDescription
        }).then(function () {
            console.log("Course created!");
            resolve();
        }).catch(function (error) {
            reject("Unable to create course.");
        });
    });
};

module.exports.updateCourse = function (courseData) {
    return new Promise(function (resolve, reject) {
        //Iterate over every property in an object to check for empty values and replace them with null
        for (const property in courseData) {
            if (property == "") {
                property = null;
            }
        }

        //Invoke the update function and filter the operation by studentNum
        Course.update({
            courseCode: courseData.courseCode,
            courseDescription: courseData.courseDescription
        }, {
            where: { courseId: courseData.courseId }
        }).then(function () {
            console.log("Course updated!");
            resolve();
        }).catch(function (error) {
            reject("Unable to update course");
        });
    });
};


module.exports.deleteCourseById = function (id) {
    return new Promise(function (resolve, reject) {
        Course.destroy({
            where: {
                courseId: id
            }
        }).then(function () {
            //If operation resolved successfully invoke the resolve method
            console.log("Course destroyed!");
            resolve();
        }).catch(function (error) {
            //If there was an error invoke the reject method and pass a message
            reject("Could not destroy course");
        });
    });
};

