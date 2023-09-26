<h1 align="center">
  <br>
    <b>Employees Database</b>
</h1>
<h4 align="center">Tangent Solutions Assessment</h4>
<p align="center">
  <a href="#purpose">Purpose</a> •
  <a href="#expected">Expected behaviour</a> •
  <a href="#solution">Solution</a> •
  <a href="#techstack">Tech Stack</a> •
  <a href="#installing">Installing</a> •
  <a href="#thoughts">Final Thoughts</a> •
</p>

___

### Purpose

Your challenge is to build out the frontend and backend components of an employee application.

### Expected
- Creating an employee
  - When creating a new employee, an ID needs to be created. Each ID should be 2
  - random uppercased letters followed by 4 random numbers.
- Editing an employee
  - When saving changes to an employee, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes should be reset.
- Adding skills
  - When adding skills, you should be able to add multiple.
# Solution

This repository contains the application as described above

## 📸 Screenshots

![Alt text - Home Screen](/public/list.jpg)
![Alt text - New Employee](/public/new.jpg)
![Alt text - Edit Employee](/public/edit.jpg)
![Alt text - Empty Screen](/public/empty.jpg)
![Alt text - Tests results](/public/tests.jpg)
### Techstack

Details of the tech stack that has been used and some of the decisions.

- [typescript]() - For static typechecking
- [NextJs]() - Client Framework
- [Next Api routes]() - For backend
- [SWR]() - For data fetching
- [Prisma]() - ORM for database queries
- [ChakraUI]() - For rapid development and prototyping I prefer using ChakraUI component library for styling, it  puts accessibility first, it is highly customizable and mobile responsive out of the box.
- [Jest & React Testing Library]() - Jest for running the tests and RTL for test assertions

## Getting Started

Follow the instructions below to get up and running on your local machine for development and testing purposes.

### Prerequisites

you should already have the following preinstalled:

- Node >= 16
- git

### Installing

Below is a series of step-by-step instructions that will guide you on how to get a development environment running.

Create a local clone of the repository

Install the projects dependencies

```bash
npm i
```

Start the projects development server

```bash
npm run dev
```

### System Design

- I use SWR as the data fetching mechanism, this allows me to invalidate the cache and refetch new data without reloading the whole
- page when editing, deleting or adding a new employee.
- The local caching mechanism I've opted for is React Context, upon mounting the home page I update the context.
- I am using Prisma as the ORM

### Bonus

- Form validations functionality
- state management using React Context and Provider
- Unit tests
- added toast notifications when employees are added, updated or deleted

### Challenges

- due to time constraints I could not get to filtering and searching users

### Time taken to complete

- Review: `10 mins` to read and review the requirements
- Design: `30 mins` to think about design decisions.
- Implementation: `2h:05mins` to implement the whole project including testing.
- Documentation: `10 mins` to write up the README document and gather my thoughts

## Authors

- **Segopotso Makhutja** <leketi.s@gmail.com>
