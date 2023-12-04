CREATE TABLE IF NOT EXISTS `class_list`
(
    `department`     VARCHAR(10)     NOT NULL,
    `courseId`     INT     NOT NULL,
    `courseName`     VARCHAR(50)     NOT NULL,
    `weekDays`     VARCHAR(10)     NOT NULL,
    `startTime`     TIME     NOT NULL,
    `endTime`     TIME     NOT NULL,
    `courseLocation`     VARCHAR(30)     NOT NULL,
    `currentCapacity`     INT    NOT NULL,
    `maxCapacity`     INT     NOT NULL,
    PRIMARY KEY(`courseId`)
);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('CPSC', 1, 'Internet Systems Programming', 'MW', '01:00:00', '02:00:00', 'Arts and Science 136', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('CPSC', 2, 'Data Structures', 'TuTh', '01:00:00', '02:00:00', 'Arts and Science 136', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('CPSC', 3, 'Algorithms', 'MWF', '12:00:00', '01:00:00', 'Arts and Science 140', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('ENGL', 4, 'College Writing', 'TuTh', '09:00:00', '10:00:00', 'Leigh 205', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('ENGL', 5, 'History of Literature', 'TuTh', '12:00:00', '01:00:00', 'Leigh 122', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('MATH', 6, 'Calculus 1', 'MWF', '08:00:00', '09:00:00', 'Business Admin 112', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('MATH', 7, 'Trigonometry', 'MW', '02:00:00', '03:00:00', 'Olin 208', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('MATH', 8, 'Geometry', 'TuTh', '09:00:00', '10:00:00', 'Leigh 106', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('ECON', 9, 'Intro to Economics', 'MW', '10:00:00', '11:00:00', 'Leigh 215', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('ECON', 10, 'Microeconomics', 'MWF', '02:00:00', '03:00:00', 'Business Admin 143', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('HIST', 11, 'Ancient History', 'TuTh', '03:00:00', '04:00:00', 'Olin 136', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('HIST', 12, 'American History', 'MWF', '09:00:00', '10:00:00', 'Zook 120', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('STAT', 13, 'Intro to Statistics', 'MW', '10:00:00', '11:00:00', 'Leigh 322', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('STAT', 14, 'Statistics for Engineering', 'MW', '11:00:00', '12:00:00', 'Leigh 316', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('GEOG', 15, 'Intro to Geography', 'TuTh', '07:00:00', '08:00:00', 'Arts and Science 134', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('CPEN', 16, 'Computer Systems', 'TuTh', '12:00:00', '01:00:00', 'Auburn Science 160', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('CPEN', 17, 'Tools for CE', 'MWF', '03:00:00', '04:00:00', 'Auburn Science 235', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('BUSN', 18, 'Business Communication', 'MW', '07:00:00', '08:00:00', 'Business Admin 146', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('BUSN', 19, 'Leadership Skills', 'MW', '09:00:00', '10:00:00', 'Polsky 521', 0, 25);

INSERT INTO `class_list` (`department`, `courseId`, `courseName`, `weekDays`, `startTime`, `endTime`, `courseLocation`, `currentCapacity`, `maxCapacity`)
VALUES ('CHEM', 20, 'Organic Chemistry', 'TuTh', '01:00:00', '02:00:00', 'Gladwin 111', 0, 25);