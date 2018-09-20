<!-- DateDiff Script: Berekent aantal dagen tussen twee data -->
function isValidDate(dateStr) 
{
	// Checks for the following valid date formats:
	// MM/DD/YY   MM/DD/YYYY   MM-DD-YY   MM-DD-YYYY

	var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/; // requires 4 digit year

	var matchArray = dateStr.match(datePat); // is the format ok?
	if (matchArray == null) 
	{
		alert(dateStr + " Date is not in a valid format.")
		return false;
	}
	
	month = matchArray[1]; // parse date into variables
	day = matchArray[3];
	year = matchArray[4];
	if (month < 1 || month > 12) 
	{ // check month range
		alert("Month must be between 1 and 12.");
		return false;
	}

	if (day < 1 || day > 31) 
	{
		alert("Day must be between 1 and 31.");
		return false;
	}
	
	if ((month==4 || month==6 || month==9 || month==11) && day==31) 
	{
		alert("Month "+month+" doesn't have 31 days!")
		return false;
	}
	if (month == 2) 
	{ // check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day>29 || (day==29 && !isleap)) 
		{
			alert("February " + year + " doesn't have " + day + " days!");
			return false;
	  	}
	}
	
	return true;
}




<!-- Stuurt de data-option veldjes aan en slaat waarden op -->
var _now = new Date();
var _availDate = new Date(_now.getTime());
var _departDate = new Date(_now.getTime() + 1*24*60*60*1000);
var arrmonth = _availDate.getMonth()+1; 
var depmonth = _departDate.getMonth()+1;
var arrday = _availDate.getDate();	
var depday = _departDate.getDate();	


function Init ()
{
	_availDate = new Date(_now.getTime());
	_departDate = new Date(_now.getTime() + 1*24*60*60*1000);
}
	
function isBrowserSupp() 
{
	    // Get the version of the browser
	    version =  parseFloat( navigator.appVersion );
	
	    if ( ( version >= 2.0 ) && ( version < 2.1 ) && ( navigator.appName.indexOf( "Netscape" ) != -1 ) ) 
	    {
	        return false;
	    }
	    else 
	    {
	    	return true;
	    }
	
	return true;
}

function isLeapYear(yrStr)
{
	var leapYear=false;
	var year = parseInt(yrStr, 10);
	// every fourth year is a leap year
	if (year%4 == 0)
	{
	    leapYear=true;
	    // unless it's a multiple of 100
	    if (year%100 == 0)
	    {
	        leapYear=false;
	        // unless it's a multiple of 400
	        if (year%400 == 0)
	        {
	            leapYear=true;
	        }
	    }
	}
	return leapYear;
}


function getDaysInMonth(mthIdx, YrStr)
{
	// all the rest have 31
	var maxDays=31
	// expect Feb. (of course)
	if (mthIdx==1)
	{
	    if (isLeapYear(YrStr))
	    {
	        maxDays=29;
	    }
	    else
	    {
	        maxDays=28;
	    }
	}
	// thirty days hath...
	if (mthIdx==3 || mthIdx==5 || mthIdx==8 || mthIdx==10)
	{
	    maxDays=30;
	}
	return maxDays;
}


//the function which does some magic to the date fields
// return non-zero if it is the last day of the month
function adjustDate(mthIdx, Dt)
{
	var value=0;

	var today = new Date()
	var theYear = parseInt(today.getYear(),10)

	if (mthIdx < today.getMonth()) 
	{
    		theYear = (parseInt(today.getYear(), 10) + 1)
	}
	if(theYear<100)
	{
    		theYear = "19" + theYear
	}
	else
	{
    		if((theYear-100) < 10)
    		{
        		theYear = "0" + (theYear-100)
    		}
    		else
    		{
        		theYear = (theYear-100)+""
         	}
    		theYear = "20" + theYear
	}


	var numDays=getDaysInMonth(mthIdx, theYear);

	if (mthIdx==1)
	{
	    if (Dt.options.selectedIndex + 1 < numDays)
	    {
	        return 0;
	    }
	    else
	    {
	        Dt.options.selectedIndex=numDays - 1;
	        //check for leap year
	        if (numDays==29)
	        {
	            return 99;
	        }
	        else
	        {
	            return 1;
	        }
	     }
	}
	if (Dt.options.selectedIndex + 1 < numDays)
	{
	    value=0;
	}
	else
	{
	    if (Dt.options.selectedIndex + 1 > numDays)
	    {
	        Dt.options.selectedIndex--;
	        value=3;
	    }
	    else
	    {
	        //index is 31 or 30
	        value=2;
	    }
	}
	return value;
}

//changes departure month when arrival month is changed
function amadChange(inM,inD,outM,outD)
{
	if (!isBrowserSupp())
	{
	    return;
	}
	
	var res = adjustDate(inM.options.selectedIndex, inD);
	if (res != 0)
	{
	           outD.options.selectedIndex=0;
	           if (outM.options.selectedIndex==11)
	           {
	            outM.options.selectedIndex=0
	           }
	           else
	           {
	            outM.options.selectedIndex=inM.options.selectedIndex + 1;
	           }
	}
	else
	{
	    outM.options.selectedIndex = inM.options.selectedIndex;
	    outD.options.selectedIndex = inD.options.selectedIndex+1;
	}

}

function dmddChange(outM,outD)
{
	if (!isBrowserSupp())
	{
	    return;
	}
	
	adjustDate(outM.options.selectedIndex,outD);

	return;
}
