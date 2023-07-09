export const validateRequiredField = (value, label = "Field") => {
    let error;
    if (!value) {
        error = `the ${label} is Required`;
    }
    return error;
}

export const validatedEmail = (value, label = "Field") => {
    let error;
    if (value && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        error = `the ${label} is not valid`;
    }
    return error;
}