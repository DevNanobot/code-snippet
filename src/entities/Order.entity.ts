
export type OrderModelType = {
    id:number
    attributes:{
        amount: number,
        price:number,
        remaining?:number,
        leftSignature?:string,
        lazyMintSignature?:string,
        purchaser:any,
        token:any,
    }
}

export interface OrderEntity {
    id:number,
    amount: number,
    price:number,
    remaining?:number,
    leftSignature?:string,
    lazyMintSignature?:string,
    purchaser:any
    token:any,
}

export class OrderEntity implements OrderEntity {
    constructor(orderModel?: OrderModelType) {
        if (!orderModel) return
        const { id, attributes: order } = orderModel

        this.id = Number(id)
        this.amount = order.amount
        this.price = order.price
        this.remaining = order.remaining
        this.leftSignature = order.leftSignature
        this.lazyMintSignature = order.lazyMintSignature
        this.purchaser = order.purchaser
        this.token = order.token
    }
}