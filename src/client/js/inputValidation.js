const validDestination = (destination) => {
    let valid = false; 

    return valid;
  
const validDate = (date) => {
    let valid = false;
    let currentDate = new date();
    const dateRegexExp = /^(0[0-9]|1[012])[\/\-](0[0-9]|[12][0-9]|3[01])[\/\-]\d{4}$/; //date format mm/dd/yyyy

    if(date.dateRegexExp.test(date) ) {

        //validation code 
        
        valid = true;
    }else {
        alert("Please enter valid date format");
    }

}

    return valid
}