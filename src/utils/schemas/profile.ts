import * as yup from 'yup'

export const profileFormSchema = yup.object({
    profilePicture: yup.mixed(),
    coverPicture: yup.mixed(),
    username: yup.string().required('*The username field is required.'),
    customUrl: yup.string(),
    email: yup.string().required('The email field is required.').email('This email is not valid.'),
    bio: yup.string(),
    instagram: yup.string().matches(
        /^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?instagram\.com\/([\w+._]?)+$/i,
        'Incorrect instagram url!'
    ),
    facebook: yup.string().matches(
        /^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?facebook\.com\/([\w+._]?)+$/i,
        'Incorrect facebook url!'
    ),
    twitter: yup.string().matches(
        /^((?:http:\/\/)?|(?:https:\/\/)?)?(?:www\.)?twitter\.com\/([\w+._]?)+$/i,
        'Incorrect twitter url!'
    ),
    website: yup.string().url('Invalid URL!')
})

export type ProfileFormProps = yup.InferType<typeof profileFormSchema>