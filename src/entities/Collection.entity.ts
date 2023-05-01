import { UserModelType } from './Profile.entity'
import { Formats, ImageType } from './types'

interface PreviewImage {
    __typename: string
    data: {
        __typename: string
        id: string
        attributes: {
            __typename: string
            name: string
            url: string
            previewUrl: any
            formats: Formats
        }
    }
}

interface Creator {
    __typename: string
    data?: UserModelType
}

export interface CollectionModelType {
    __typename: string
    id: string
    attributes: {
        __typename: string
        name: string
        description: string
        previewImage?: PreviewImage
        creator?: Creator
        volume?: number
        symbol?: string
        type?: string
        collectionAddress?: string
        shortUrl?: string
        createdAt?: string
        updatedAt?: string
        royalties?: any
        angoCollection?:boolean
    }
}

export interface CollectionEntity {
    id: string
    name: string
    description: string
    shortUrl: string
    symbol: string
    type: string
    collectionAddress: string
    royalties?:number
    createdAt: string
    updatedAt: string
    previewImage: any
    creatorId: number | null
    creatorUsername: string
    creatorPublicAddress: string
    creatorUrl: string
    creatorThumbnail: string
    volume?:number
    angoCollection?:boolean
}

export class CollectionEntity implements CollectionEntity {
    constructor(collectionModel?: CollectionModelType) {
        if (!collectionModel) return
        const { id, attributes: collection } = collectionModel

        this.id = id
        this.name = collection.name || ''
        this.description = collection.description || ''
        this.shortUrl = collection.shortUrl || ''
        this.symbol = collection.symbol || ''
        this.type = collection.type || ''
        this.collectionAddress = collection.collectionAddress || ''
        this.royalties = collection.royalties || 0
        this.createdAt = collection.createdAt || ''
        this.updatedAt = collection.updatedAt || ''
        this.volume = collection.volume || 0
        this.previewImage = this.getPreviewImage(collectionModel)
        this.angoCollection = collection.angoCollection || false

        this.creatorId = collection.creator?.data?.id ?? null
        this.creatorUsername = collection.creator?.data?.attributes.username || ''
        this.creatorPublicAddress = collection.creator?.data?.attributes.publicAddress || ''
        this.creatorUrl = `/profile/${collection.creator?.data?.attributes.customUrl}`
        this.creatorThumbnail = collection.creator?.data?.attributes.profilePicture ? collection.creator.data.attributes.profilePicture.data.attributes.formats?.thumbnail.url ? collection.creator.data.attributes.profilePicture.data.attributes.formats?.thumbnail.url : collection.creator.data.attributes.profilePicture.data.attributes.url : '/defaultProfileImage.png'
    }

    _getImageUrl (image?: ImageType) {
        const attributes = image?.data?.attributes
        if (!attributes?.formats) return ''
        const { thumbnail, small, medium, large } = attributes.formats
        const previewImage = attributes.url || attributes.previewUrl || thumbnail?.url || small?.url || medium?.url || large?.url
        return previewImage
    }

    getPreviewImage(collectionModel: CollectionModelType) {
        const collection = collectionModel.attributes
        return this._getImageUrl(collection.previewImage)
    }
}
