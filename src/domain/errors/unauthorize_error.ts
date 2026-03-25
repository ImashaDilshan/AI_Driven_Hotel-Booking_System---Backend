
class UnauthorizeError extends Error {
    public statusCode: number;
    
    constructor(message: string ) {
        super(message);
        this.name = 'UnauthorizeError';
        this.statusCode= 401;
    }
}
export default UnauthorizeError;
