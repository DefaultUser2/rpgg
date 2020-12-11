# Exercise for RPGG
Salary payment calculation application.

# How to run:

The application can be run as a standalone using only the app.js file.

- Download or clone the app.js file to your local machine.
- Open a command prompt window at its localtion.
- In the command prompt type ``` node app.js ``` to run.

If you want to run the application with testing, please follow the steps below.

- Clone the repository to your local machine
- To install the node modules, run ``` npm install ``` in the command prompt in the cloned directory.
- To run the application, in the command prompt type ``` npm start ```
- To run the test, in the command prompt type ``` npm test ```
  
## Exercise instructions:
### The Burroughs Test 

Create a small command line utility to help a small ﬁctional company calculate the dates on which they should pay their sales staff.  
Company payroll is handled like so: 
- Sales staff are paid a regular ﬁxed base salary each month, plus a regular
monthly bonus. 
- Base salaries are paid on the last day of each month, unless that day is a
Saturday or Sunday (a weekend), in which case they are paid on the Friday
before the weekend 
- On the 15th of each month, bonuses are paid for the previous month, unless
that day is a weekend, in which case they are paid on the ﬁrst Wednesday
after the 15th. 

Your utility should calculate the payment dates for the next 12 months, including the
current month, and output to the screen in a CSV format.
