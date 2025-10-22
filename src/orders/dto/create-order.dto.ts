import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrdersStatus, OrdersStatusList } from "../enum/enum.order";

export class CreateOrderDto {

    @IsNumber()
    @IsPositive()
    totalAmount: number;

    @IsNumber()
    @IsPositive()
    totalItems: number;

    @IsEnum( OrdersStatusList, { message: `Invalid order status ${ OrdersStatusList }` } )
    @IsOptional()
    status: OrdersStatus = OrdersStatus.PENDING;

    @IsOptional()
    @IsBoolean()
    paid: boolean = false;

}