
import UnauthorizeError from '../../domain/errors/unauthorize_error';
import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // console.log("Authentication middleware executed");
    //  console.log("Request Headers:", req.headers); // check if the authorization header is present
    //console.log("Clerk response:", req.auth()); // check if the clerk middleware is working and providing the auth information
    //   console.log("Auth Boject:", authData);

    if (!req.auth().isAuthenticated) {
        
        throw new UnauthorizeError("Unauthorized access. Please log in to continue.");
    }
    next();
};

export default isAuthenticated;

