class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors =[],
        stack=""
    ){

        super(message)
        this.statusCode=statusCode
        this.data =null
        this.message=message
        this.success=false;
        this.errors=errors

        if(stack){
            this.stack=stack
        }
        else
        {
            Error.captureStackTrace(this,this.constructor)
        }
        // In the context of the provided code, the stack typically refers to the call stack at the point where the error was constructed. It is a property of the Error object and contains information about the sequence of nested calls that led to the error being thrown. This can be useful for debugging and understanding the context in which the error occurred. If the stack parameter is not provided, the code captures the stack trace using Error.captureStackTrace.
    }
}

export {ApiError}