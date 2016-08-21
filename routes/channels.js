import Router from 'koa-router'
import r from 'rethinkdb'
// import Options from '../lib/options'
const router = new Router()

/**
 * Get a channel or specific channels
 */
router.get('/:channel?', async (ctx, next) => {
  const options = new Options(ctx.query, ctx.params, 'channels')
  if(ctx.params.file) options.query = options.query.getAll(ctx.params.channel, { index: 'id' })

  const cursor = await options.GET(ctx._rdbConn)

  ctx.body = {
    status: 'success',
    data: { message: await cursor.toArray() },
    message: null
  }

  await next()
})

module.exports = router
