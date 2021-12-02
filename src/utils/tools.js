
export const isNotEmptyValue = value => {
    console.log('TRIM', value)
    return value?.trim() !== ''
}

export const findNonEmptyValues = state => {
    let nonEmptyFields = 0;
    Object.entries(state).forEach(([key, value]) => {
        
        if(typeof value === 'string') {
            isNotEmptyValue(value) && nonEmptyFields ++;
        }else if(value) {
            nonEmptyFields++;
        }
    
    })

    return nonEmptyFields;
}




