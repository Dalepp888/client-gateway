import { Catch, ArgumentsHost } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();
        console.log(rpcError);

        if( typeof rpcError === 'object' && rpcError !== null && 'status' in rpcError && 'message' in rpcError ){
            const status = rpcError.status
            return response.status(status).json(rpcError)
        }

        response.status(400).json({
            status: 400,
            message: rpcError
        })
    }
}