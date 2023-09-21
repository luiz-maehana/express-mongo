import mongoose from 'mongoose'
import ErrorDefault from '../errors/DefaultError.js'
import CastErrors from '../errors/CastErrors.js'
import ValidationErrors from '../errors/ValidationErrors.js'

function errorsHandle(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new CastErrors().sendResponse(res)
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationErrors(error).sendResponse(res)
  } else {
    new ErrorDefault().sendResponse(res)
  }
}

export default errorsHandle