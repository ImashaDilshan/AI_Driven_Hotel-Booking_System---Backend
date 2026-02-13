import NotFoundError from '../../domain/errors/not_found_error.js';
import ValidationError from '../../domain/errors/validation_error.js';
import UnauthorizeError from '../../domain/errors/unauthorize_error.js';



const globalErrorHandler = (error, req, res, next) => {
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
    else{
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default globalErrorHandler; 