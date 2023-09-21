import mongoose from 'mongoose'
import ErrorDefault from '../errors/DefaultError.js'
import CastErrors from '../errors/CastErrors.js'
import ValidationErrors from '../errors/ValidationErrors.js'
import DefaultError from '../errors/DefaultError.js'

function HandleErrors(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new CastErrors(error).sendResponse(res)
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationErrors(error).sendResponse(res)
  } else if (error instanceof DefaultError) {
    error.sendResponse(res)
  } else {
    new ErrorDefault().sendResponse(res)
  }
}

export default HandleErrors