import NotFoundError from '../../domain/errors/not_found_error';
import ValidationError from '../../domain/errors/validation_error';
import UnauthorizeError from '../../domain/errors/unauthorize_error';
import ForbiddenError from '../../domain/errors/fobidden_error';
import { Request, Response, NextFunction } from 'express';



const globalErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack);
   if(error instanceof NotFoundError){
        res.status(error.statusCode).json({ error: error.message });
   }
    else if(error instanceof ValidationError){
        res.status(error.statusCode).json({ error: error.message });
    }
    else if(error instanceof UnauthorizeError){
        res.status(error.statusCode).json({ error: error.message });
    }
    else if(error instanceof ForbiddenError){
        res.status(error.statusCode).json({ error: error.message });
    }
    else{
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default globalErrorHandler; 