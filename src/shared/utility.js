export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '';
    }

    if (rules.minLength) {
        isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
        isValid = isValid && value.length <= rules.maxLength
    }

    // if (rules.isEmail) {
    //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9]
    // }

    return isValid;
}