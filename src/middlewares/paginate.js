import CastErrors from '../errors/CastErrors.js'

async function paginate(req, res, next) {
  try {

    let { limit = 10, page = 1, order = '_id:-1' } = req.query
    let [orderBy, orderAscDesc] = order.split(':')

    limit = parseInt(limit)
    page = parseInt(page)
    orderAscDesc = parseInt(orderAscDesc)

    if (limit <= 0 || page <= 0) {
      next(new CastErrors())
    }

    const result = req.result

    const resultPaginated = await result
      .sort({
        [orderBy]: orderAscDesc
      })
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json(resultPaginated)

  } catch (e) {
    next(e)
  }
}

export default paginate