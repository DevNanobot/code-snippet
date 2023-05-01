import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import { Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'

import { CustomDropzoneBody } from './CollectionDropzoneBody'
import { useStyles } from './ModalCreateCollection.style'

import { Modal } from '@/common/Modal'
import { FileViewer } from '@/components/FileViewer'
import { ModalAlert } from '@/components/Modals/ModalAlert'
import { ModalFollowSteps } from '@/components/Modals/ModalFollowSteps'
import { TokenTypes } from '@/entities/FormToken.entity'
import { Dropzone } from '@/fields/Dropzone'
import { TextField } from '@/fields/TextField'
import { useCreateTokenCollection } from '@/hooks/graphql/useCreateTokenCollection'
import { useGetMe } from '@/hooks/graphql/useGetMe'
import { useUploadFile } from '@/hooks/graphql/useUploadFile'
import { useAppDispatch } from '@/hooks/useStoreHooks'
import { setBusError } from '@/store/global'
import { createNewCollection } from '@/utils/contract'
import { CollectionFormProps, collectionInitialValues, collectionSchema } from '@/utils/schemas/collection'

type ModalCreateCollectionProps = {
    open: boolean
    type: TokenTypes
    onClose: () => void
}

function ModalCreateCollection({ open, onClose, type }: ModalCreateCollectionProps): JSX.Element {
    const classes = useStyles()
    const { me } = useGetMe()
    const createTokenCollection = useCreateTokenCollection()
    const uploadFile = useUploadFile()
    const dispatch = useAppDispatch()

    const [previewImg, setPreviewImg] = useState<{ name: string, path: string }>({ name: '', path: '' })
    const [loading, setLoading] = useState<boolean>(false)
    const [openFollowSteps, setOpenFollowSteps] = useState<boolean>(false)
    const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)

    const { register, handleSubmit, setValue, watch, reset: resetForm, setError, formState, getValues } = useForm<CollectionFormProps>({
        defaultValues: collectionInitialValues,
        resolver: yupResolver(collectionSchema)
    })

    const name = watch('name')
    const symbol = watch('symbol')

    const createCollectionSteps = [
        {
            id: 'deploy',
            title: 'Deploy contract',
            description: 'Deploy code for the new collection smart contract',
            action: () => deployNewCollection(name, symbol)
        },
        {
            id: 'save',
            action: () => saveNewCollection(),
            title: 'Save collection',
            description: 'Save deployed collection',
            onFinish: () => {
                setOpenFollowSteps(false)
                setOpenSuccessModal(true)
            }
        }
    ]

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation()
        handleSubmit(() => {
            setOpenFollowSteps(true)
        })(e)
    }

    useEffect(() => {
        if (!open) {
            removePreviewImage()
            resetForm()
            setLoading(false)
        }
    }, [open, resetForm])

    const removePreviewImage = () => {
        setPreviewImg({ name: '', path: '' })
    }

    const handleDropPreviewImage = (acceptedFiles: File[]) => {
        let fileData = acceptedFiles[0]
        setValue('previewImage', acceptedFiles[0])
        setPreviewImg({ name: fileData.name, path: URL.createObjectURL(fileData) })
    }

    const deployNewCollection = async (name: string, symbol: string) => {
        setLoading(true)
        const address = await createNewCollection(name, symbol, type)
        setValue('collectionAddress', address, { shouldValidate: true })
        return address
    }

    const saveNewCollection = async () => {
        const {
            name,
            description,
            symbol,
            collectionAddress,
            previewImage,
            royalties
        } = getValues()

        console.log(royalties)
        try {
            // Step 1. Create token collection
            const createTokenCollectionResponse = await createTokenCollection({
                variables: {
                    data: {
                        name,
                        description,
                        symbol,
                        type,
                        shortUrl: collectionAddress,
                        collectionAddress,
                        creator: me ? me.id : 0,
                        royalties: Number(royalties),
                        external: false
                    }
                }
            })

            const collectionId = createTokenCollectionResponse?.data?.createTokenCollection?.data?.id

            if (!collectionId) return

            // Step 2. Upload images
            const files = []
            if (previewImage) {
                files.push({
                    refId: collectionId,
                    ref: 'api::token-collection.token-collection',
                    field: 'previewImage',
                    file: previewImage
                })
            }

            for (const fileData of files) {
                await uploadFile({
                    variables: fileData
                })
            }
        } catch (error: any) {
            const validationErrors = error.graphQLErrors && error.graphQLErrors.length && error.graphQLErrors[0].extensions?.error.name === 'ValidationError' ? error.graphQLErrors[0].extensions?.error.details.errors : undefined
            if (validationErrors) {
                const firstError = validationErrors[0]
                const error = {
                    name: firstError.path,
                    message: firstError.message
                }
                setError('previewImage', error)
            } else {
                dispatch(setBusError(error.message))
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal open={open} onClose={() => onClose()} title="Create Collection" className={classes.modal}>
            <ModalFollowSteps
                steps={createCollectionSteps}
                open={openFollowSteps}
                onClose={ (event: any, reason: string) => reason === 'CancelClick' && setOpenFollowSteps(false) }
            />
            <ModalAlert
                open={openSuccessModal}
                icon={
                    <AutoAwesomeOutlinedIcon style={{ fontSize: 30 }} color='secondary' />
                }
                subtitle="Your collection is successfully created!"
                closeBtnText="Close"
                onClose={() => {
                    setOpenSuccessModal(false)
                    removePreviewImage()
                    onClose()
                }}
            />
            <form onSubmit={onSubmit} autoComplete="off">
                <Grid container direction="column" className={classes.formContainer}>
                    <Dropzone
                        className={classes.dropzone}
                        accept=".jpg,.jpeg,.png"
                        maxSize={1024 * 1024 * 5}
                        dropAccepted={Boolean(previewImg.path)}
                        onReset={removePreviewImage}
                        onDrop={handleDropPreviewImage}
                        Body={CustomDropzoneBody}
                    >
                        <FileViewer sx={{ width: '100%', maxHeight: 260 }} filePath={previewImg.path} fileName={previewImg.name} />
                    </Dropzone>

                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Display Name*"
                        placeholder="Enter collection name"
                        hint="Token name cannot be changed in future"
                        helperText={formState.errors.name?.message}
                        error={Boolean(formState.errors.name?.message)}
                        {...register(('name'))}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Symbol*"
                        placeholder="Enter Token Symbol"
                        helperText={formState.errors.symbol?.message}
                        error={Boolean(formState.errors.symbol?.message)}
                        {...register(('symbol'))}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Description"
                        placeholder="Spread some words about your token collection"
                        helperText={formState.errors.description?.message}
                        error={Boolean(formState.errors.description?.message)}
                        {...register(('description'))}
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Royalties"
                        placeholder="Enter royalties for this collection in percentage"
                        helperText={formState.errors.royalties?.message}
                        error={Boolean(formState.errors.royalties?.message)}
                        {...register(('royalties'))}
                    />
                    <Button
                        className={classes.createBtn}
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={loading}
                    >Create Collection</Button>
                </Grid>
            </form>
        </Modal>
    )
}

export { ModalCreateCollection }
