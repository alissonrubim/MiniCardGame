class BadRequestExceptionError extends Error {
    constructor(args){
        super(args);
        this.message = args;
        this.name = "BadRequest"
        this.statusCode = 400
    }
}

class ForbiddenExceptionError extends Error {
    constructor(args){
        super(args);
        this.message = args;
        this.name = "Forbidden"
        this.statusCode = 403
    }
}

function HandleException(response, error){
    if(error.statusCode)
        response.status(error.statusCode).send(error.message)
    else{
        console.info(error)
        response.status(500).send(error)          
    }
}

exports.BadRequestExceptionError = BadRequestExceptionError;
exports.ForbiddenExceptionError = ForbiddenExceptionError;
exports.HandleException = HandleException;

