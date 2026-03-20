
import  { Request, Response, NextFunction } from 'express';
import ForbiddenError from '../../domain/errors/fobidden_error';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const authData = req.auth();

    if (authData?.sessionClaims?.metadata?.role !== 'admin') {
        throw new ForbiddenError("Unauthorized access. Admin privileges are required to perform this action.");
    }
    next();
}
export default isAdmin;