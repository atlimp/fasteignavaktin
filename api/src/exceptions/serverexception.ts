import HttpException from './httpexception';

class ServerException extends HttpException {
    constructor(e?: Error) {
        if (e)
            console.error(e);
        super(500, 'Something went wrong');
    }
}

export default ServerException;