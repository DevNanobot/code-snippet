import * as yup from 'yup'

import { price, copies } from './validation'

export const putOnSaleSchema = (a: number) => yup.object({
    saleType: yup.string(),
    price: price.required('This field is required'),
    copies: copies.required('This field is required')
        .positive('Must be greather than 0')
        .max(a, `Number cannot be greater than ${a}`),
    startDate: yup.string(),
    endDate: yup.string(),
    minBid: yup.string()
})

export type PutOnSaleFormProps = yup.InferType<typeof putOnSaleSchema>

export const bidsSchema = yup.object({
    bid: yup.number()
        .positive('Must be greather than 0')
        .typeError('Not valid number')
        .required('This field is required'),
    qty: yup.number()
        .positive('Must be greather than 0')
        .integer('Must be an integer')
        .typeError('Must be an integer')
        .required('This field is required')
})

export type BidsFormProps = yup.InferType<typeof bidsSchema>

export const checkoutSchema  = (a: number) => yup.object({
    count: yup
        .number()
        .typeError('Not valid number')
        .min(0, 'The count cannot be negative')
        .notOneOf([0], 'The count cannot be 0')
        .required('This field is required')
        .max(a, `Number cannot be greater than ${a}`)
})

export type CheckoutFormProps = yup.InferType<typeof checkoutSchema>
