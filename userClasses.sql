CREATE TABLE IF NOT EXISTS `user_classes`
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