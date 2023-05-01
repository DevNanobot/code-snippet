import * as yup from 'yup'

import { price } from './validation'

import { SaleTypes } from '@/entities/FormToken.entity'


export const createTokenSchema = yup.object({
    file: yup.mixed().required('The file is required'),
    previewImage: yup.mixed().when('file.type', (val, schema)=> {
        if (val =='' || val =='audio/mpeg' || val== 'video/mp4') return schema.required('Preview image is required')
    }),
    name: yup.string().max(20, 'The name must be less than 20 characters').required('This field is required'),
    description: yup.string().max(350, 'The description must be less than 350 characters'),
    extLink: yup.string().url('Invalid URL!'),
    price: yup.mixed()
        .when('saleType', {
            is: SaleTypes.FIXED_PRICE,
            then: price.required('This field is required')
        }),
    count: yup
        .mixed()
        .when('type', {
            is: 'multiple',
            then: yup
                .number()
                .typeError('Not valid number')
                .moreThan(0, 'The supply cannot be 0')
                .positive('The supply cannot be negative')
                .required('This field is required')
        }),
    showUnlockable: yup.boolean(),
    minBid: yup.mixed().when('saleType', {
        is: 'timed-auction',
        then: yup.number().typeError('Not valid number')
            .moreThan(0, 'The minimum bid cannot be 0')
            .positive('The minimum bid cannot be negative').required('This field is required')
    }),
    unlockableContent: yup
        .string()
        .when('showUnlockable', {
            is: true,
            then: yup.string().required('This field is required')
        }),
    angoCollection: yup.boolean(),

    royalties: yup.mixed()
        .when('angoCollection', {
            is: true,
            then: yup
                .number()
                .typeError('Not valid number')
                .required('This field is required')
                .moreThan(2, 'The royality should be greather than 2')
                .lessThan(35, 'The royality should be less than 35')
        })

})
