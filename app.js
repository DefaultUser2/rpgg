/***********************
Created by Henry Diesel.
***********************/

// required modules
const http = require('http');
const readline = require('readline');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// set timezone for dates to UK timezone
const timeZone = "en-GB"

// global variables
var inputYear = 0;
var inputMonth = 0;
var inputAmount = 0;
var showCalculations = false;

// read from terminal interface
const readTerminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
readTerminal._writeToOutput = function _writeToOutput(stringToWrite) {
  readTerminal.output.write('\u001b[32m'+stringToWrite+'\x1b[0m');
};

// create and startup server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('________________________________________________________________________________________________________');
  console.log('');
  // start process
  getInput();
});

// get year input
function getInput()
{
  readTerminal.question('Please input a year between 1900 and 2100 that you would like to calculate salary dates for: ', year => {
    if(Number(year) >= 1900 && Number(year) <= 2100) //if its a valid year
    {
      inputYear = year;
      getMonth(); // continue to get month question
    }
    else // if its not a valid value, the user will have to re-enter the value
    {
      console.log('Please input a date between 1900 and 2100.');
      getInput();
    }
  });
}

// get month input
function getMonth()
{
  readTerminal.question('Please input a number for the starting month, eg 3 for March: ', month => {
    if(Number(month) > 0 && Number(month) < 13) // if its a valid month.
    {
      inputMonth = month;
      getAmount(); // continue to get amount question
    }
    else // if its not a valid value, the user will have to re-enter the value
    {
      console.log(`Please input a number between 1 and 12.`);
      getMonth()
    }
  });
}

// get number of months to do calculation for
function getAmount()
{
  readTerminal.question('Please input an amount between 1 and 60 of months you want to calculate salaries for: ', amount => { 
    {
        if(Number(amount) > 0 && Number(amount) <+ 60) // if its a valid amount
        {
          inputAmount = amount;
          outputCalculations(); // continue to show calculations question
        }
        else // if its not a valid value, the user will have to re-enter the value
        {
          console.log(`Please input a number between 1 and 60.`);
          getAmount()
        }    
      }
  });
}

// ask user if calculations need to be shown
function outputCalculations()
{
  readTerminal.question('Would you like to see the calculations output as well? Please enter y or n: ', calculations => { 
    {
        if(calculations == 'y' || calculations == 'n') // if a valid value was provided
        {
          calculations == 'y' ? showCalculations = true : showCalculations = false;  // set global value to determine if console logs will be shown for calculations
          readTerminal.pause();
          calculatePayDates(inputYear,inputMonth,inputAmount); // do main calculations
        }
        else // if its not a valid value, the user will have to re-enter the value
        {
          console.log(`Please input either y or n`);
          outputCalculations();
        }    
      }
  });
}

// function that converts the date to its corresponding day name
function getDayName(dateStr)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(timeZone, { weekday: 'long' });        
}

// function to calculate the bonus date for each month
function getBonusDate(currentYear, currentMonth)
{
  var midDate = new Date(currentYear,currentMonth,15); // set the day value to the 15th for bonus payments
  showCalculations ? console.log("Original Date: "+midDate.toLocaleDateString(timeZone)) : "";
  var dayName = getDayName(midDate);
  showCalculations ? console.log("Day Name: "+dayName) : "";
  if(dayName === "Saturday") // if day falls on a Saturday
  {
    midDate.setDate( midDate.getDate(midDate) + 4 ); // move date on by 4 days to the next Wednesday
    showCalculations ? console.log("Next Wednesday Date- "+midDate.toLocaleDateString(timeZone)) : "";
  }
  if(dayName === "Sunday")// if day falls on a Sunday
  {
    midDate.setDate( midDate.getDate(midDate) + 3 ); // move date on by 3 days to the next Wednesday
    showCalculations ? console.log("Next Wednesday Date - "+midDate.toLocaleDateString(timeZone)) : "";
  }
  return midDate.toLocaleDateString(timeZone);
}

// function to calculate salary payment date
function getPaymentDate(currentYear, currentMonth)
{
  var endDate = new Date(currentYear,currentMonth,0); // set day to 0, which will choose the previous day of the previous month
  showCalculations ? console.log("Original Date: "+endDate.toLocaleDateString(timeZone)) : "";
  var dayName = getDayName(endDate);
  showCalculations ? console.log("Day Name: "+dayName) : "";
  if(dayName === "Saturday")  // if day falls on a Saturday
  {
    endDate.setDate( endDate.getDate(endDate) - 1 ); // move date back by 1 day to get the previous Friday
    showCalculations ? console.log("Previous Friday Date - "+endDate.toLocaleDateString(timeZone)) : "";
  } else
  if(dayName === "Sunday")  // if day falls on a Sunday
  {
    endDate.setDate( endDate.getDate(endDate) - 2 ); // move date back by 2 day to get the previous Friday
    showCalculations ? console.log("Previous Friday Date - "+endDate.toLocaleDateString(timeZone)) : "";
  } 
  return endDate.toLocaleDateString(timeZone);
}

// main function to calculate dates
function calculatePayDates(currentYear, currentMonth, monthsRequired)
{    
    var csvString = "";
    currentMonth--; // since javascript dates are zero indexed we need to subtract one from the month to get the right number
    for(var i = 0; i < monthsRequired; i++ )
    {
            currentMonth++;
            if(currentMonth === 13) // determine if its a new year
            {
                currentMonth = 1;
                currentYear++;
            }
            showCalculations ? console.log("Month: "+currentMonth+" - Year: "+currentYear) : "" ;
            showCalculations ? console.log("-- Bonus Payment --") : "";
            var midDate = getBonusDate(currentYear,currentMonth - 1) // since javascript dates are zero indexed we need to subtract one from the month to get the right number
            csvString += midDate + ", ";
            showCalculations ? console.log("-- Salary Payment --") : "";
            var endDate = getPaymentDate(currentYear,currentMonth); // since we need to get the last day, we send the next month. Then in the function it will get the last day of the previous month.
            csvString += endDate + ", ";
            showCalculations ? console.log('---------------------------------') : "";
    }

    // csv string value
    console.log('\x1b[36m%s\x1b[0m',"********** RESULT **************");
    console.log(csvString);
    console.log('\x1b[36m%s\x1b[0m',"********** RESULT **************");

    readTerminal.resume();

    // ask the user if they would like to save the csv to file
    readTerminal.question('Would you like to save the data to file? y/n: ', result => {
      if(result == 'y')
      {
        fs.writeFile('salaries.csv', csvString, function (err) {
          if (err) return console.log(err);
          console.log('Results saved to salaries.csv');
          doAnother();
        });
      }
      else
      {
        console.log("You chose not to export the data.");
        doAnother();
      }
    });
}

// function to check if the user wants to do another calculation 
function doAnother()
{
  readTerminal.question('Would you like to do another calculation? Please enter y or n: ', another => {
    if(another == 'y' || another == 'n')
    {
      if(another == 'y') // restart process 
       {
        getInput();
       }
       else
       {
        console.log("Have a nice day! Goodbye."); // end application
        readTerminal.close();
       } 
    }
    else // if its not a valid value, the user will have to re-enter the value
    {
      console.log(`Please input either y or n.`);
      doAnother();
    }    
  });
}

module.exports=  {getDayName, getBonusDate, getPaymentDate};
