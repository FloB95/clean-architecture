import { pgTable } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { varchar, text, date, mysqlTable } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('User', {
  id: varchar('id', {
    length: 36,
  }).primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: date('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
})

export const posts = mysqlTable('Post', {
  id: varchar('id', {
    length: 36,
  }).primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: varchar('userId', {
    length: 36,
  }).notNull(),
})

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}))
