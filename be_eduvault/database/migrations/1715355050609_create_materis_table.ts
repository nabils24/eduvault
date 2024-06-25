import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'materis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('judul', 255).notNullable()
      table.integer('id_mapel').unsigned().references('id').inTable('mapels').onDelete('CASCADE')
      table.text('deskripsi').notNullable()
      table.string('file', 255).notNullable()
      table.string('thumbnail', 255).notNullable()
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}