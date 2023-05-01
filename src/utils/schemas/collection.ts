import * as yup from 'yup'

import { TokenTypes } from '@/entities/FormToken.entity'

export const collectionSchema = yup.object({
    name: yup.string().max(20, 'The name must be less than 20 characters').required('This field is required'),
    description: yup.string().max(350, 'The description must be less than 350 characters'),
    previewImage: yup.mixed(),
    symbol: yup.string().required('This field is required'),
    type: yup.string().required(),
    collectionAddress: yup.string(),
    royalties:yup.number().max(50, 'Royalties can\'t be larger than 50%')
})

export type CollectionFormProps = yup.InferType<typeof collectionSchema>

export const collectionInitialValues = {
    name: '',
    description: '',
    previewImage: undefined,
    type: TokenTypes.SINGLE,
    symbol: '',
    collectionAddress: '',
    royalties:0
}