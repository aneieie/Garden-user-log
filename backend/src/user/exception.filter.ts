import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { timeStamp } from 'console';
import { Request, Response } from 'express';
import { Prisma } from 'generated/prisma/client';
import { ERROR_CODE, ERROR_MESSAGE } from 'src/constants';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {

        const status = exception.code;
        let message: string = exception.message;
        let errorCode = 400;

        switch (status) {

            case "P2002":
                message = ERROR_MESSAGE.repeatedEmail;
                errorCode = ERROR_CODE.repeatedEmail;
                break;
            case "P2001":
            case "P2025":
                message = "Record/s do not exist";
                break;
            default:
                message = "Something went wrong man.... I dunno why :("

        }

        console.log(message);
        console.log("this is the exception code" + exception.code);

        throw new HttpException(message, errorCode);
        
    }

}