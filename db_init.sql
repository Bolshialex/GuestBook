--CREATE SCHEMA db_init;

USE db_init;

DROP TABLE IF EXISTS Contacts;

CREATE TABLE IF NOT EXISTS Contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR(50) NOT NULL,
    lName VARCHAR(50) NOT NULL,
    jobTitle VARCHAR(100),
    company VARCHAR(100),
    linkedIn VARCHAR(255),
    email VARCHAR(100) NOT NULL,
    pastMeeting VARCHAR(15),
    otherMeet TEXT,
    message TEXT,
    mailingList BOOLEAN DEFAULT FALSE,
    emailFormat ENUM('HTML', 'Text') DEFAULT 'Text',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Contacts (fName, lName, jobTitle, company, linkedIn, email, pastMeeting, otherMeet, message, mailingList, emailFormat)
VALUES 
    ('John', 'Doe', 'Software Engineer', 'Costco', 'www.linkedin', 'johndoe@email.com', 'Open House', 'Web Dev Talk', 'Blah blah blah blah', TRUE, 'HTML'),
    ('Jane', 'Smith', 'Product Manager', 'Costco', 'www.linkedin', 'janesmith@email.com', 'Open House', 'Career Interest', 'Blah blah blah blah', TRUE, 'Text');
