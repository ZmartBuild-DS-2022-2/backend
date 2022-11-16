function CustomException(message, code) {
  const error = new Error(message)

  error.code = code
  return error
}

CustomException.prototype = Object.create(Error.prototype)

export default CustomException
