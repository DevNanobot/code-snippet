import * as yup from 'yup'

export const price = yup
    .number()
    .typeError('Not valid number')
    .min(0, 'The price cannot be negative')
    

export const copies = yup
    .number()
    .typeError('Not valid number')
    .min(0, 'The price cannot be negative')
    .integer('Number of copies must be an integer')