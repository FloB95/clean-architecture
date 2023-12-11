import localEventQueue from '../../infrastructure/events/LocalEventQueue'
import PostService from '../../core/services/PostService'
import { PostController } from '../../infrastructure/controllers/api/PostController'
import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from './../../infrastructure/db/drizzle/schema'
import PostDrizzleRepository from '../../infrastructure/repositories/post/PostDrizzleRepository'
import 'dotenv/config'

const connection = mysql.createPool(process.env.DATABASE_URL as string)

const db = drizzle(connection, {
  schema,
  mode: "default",
});

// const postHandlingRepository = new PostMemoryRepository()
// const postHandlingRepository = new PostPrismaRepository(prisma)
const postHandlingRepository = new PostDrizzleRepository(db)
const postHandlingService = new PostService(postHandlingRepository, localEventQueue)
const postHandlingController = new PostController(postHandlingService)

export default postHandlingController
