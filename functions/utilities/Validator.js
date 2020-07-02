const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if (string.trim() === '') return true; 
    else return false;
}

exports.validateSignUpData = (data) => {
    let error = {};
    if (isEmpty(data.email)) {
        error.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
        error.email = "Must be a valid email address";
    }

    if (isEmpty(data.password)) {
        error.password = "Must not be empty";
    } 
    if (data.password !== data.confirmPassword) { 
        error.confirmPassword = "Password is not matched"
    }
    if (isEmpty(data.handle)) {
        error.handle = "Must not be empty";
    } 

    return {
        error,
        valid: Object.keys(error).length === 0 ? true : false
    }
}

exports.validateLogInData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = "Must not be empty";
    }
    
    if (isEmpty(data.password)) {
        errors.password = "Must not be empty";
    }
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if (!isEmpty(data.website.trim())) {
        if (data.website.trim().substring(0, 4) !== "http") {
            userDetails.website = `https://${data.website.trim()}`;
        } else {
            userDetails.website = data.website;
        }
    }
    if (!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}