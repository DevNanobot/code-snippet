import { useMemo } from 'react'

import { useQuery } from '@apollo/client'

import { useAppSelector } from '../useStoreHooks'

import { TokenEntity, TokenModelType } from '@/entities/Token.entity'
import { GET_TOKENS } from '@/hooks/graphql/queries/getTokens'

interface PaginationArg {
    page?: number
    pageSize?: number
    start?: number
    limit?: number
}

export const useGetTokens = (filters?: any, pagination?: PaginationArg, sort?: string) => {
    const { accessToken } = useAppSelector(state => state.globalReducer)
    const context = {
        headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` })
        }
    }

    const { loading, data, error, refetch } = useQuery(GET_TOKENS, {
        variables: {
            filters,
            pagination,
            sort
        },
        context
    })

    const tokens = useMemo(() => {
        const tokenEntities = data?.tokens?.data.map((token: TokenModelType) => new TokenEntity(token))
        return tokenEntities || []
    }, [data?.tokens.data])

    const pageCount = useMemo(() => {
        return data?.tokens.meta.pagination.pageCount || 1
    }, [data?.tokens.meta.pagination.pageCount])

    return { tokens, loading, error, refetch, data, pageCount }
}