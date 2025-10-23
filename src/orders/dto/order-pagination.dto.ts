import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { OrdersStatus, OrdersStatusList } from "../enum/enum.order";

export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum( OrdersStatusList, {
        message: `Valid status are ${ OrdersStatusList }`
    })
    status?: OrdersStatus;
} 