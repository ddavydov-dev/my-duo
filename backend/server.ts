import 'dotenv/config'
import Fastify from 'fastify'
import { clerkPlugin, getAuth } from '@clerk/fastify'

const app = Fastify({
  logger: true
})

app.register(clerkPlugin)

app.get('/', async function handler(request, reply) {
  // console.log('session: ', request.session)
  const { userId } = getAuth(request)

  // Protect the route from unauthenticated users
  if (!userId) {
    return reply.code(403).send({ error: 'Unauthorized request.' })
  }

  return { hello: 'world' }
})

// try {
//   await app.listen({ port: 3001 })
// } catch (err) {
//   app.log.error(err)
//   process.exit(1)
// }

app.listen({ host: '0.0.0.0', port: process.env.PORT ? Number(process.env.PORT) : 3001 }, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Listening to port ${process.env.PORT}`)
  }
})
