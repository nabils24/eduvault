import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'mapels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nama_mapel', 255).notNullable()
      table.string('kode_mapel', 255).notNullable()
      table.integer('id_kelas').unsigned().references('id').inTable('kelas').onDelete('CASCADE')
      table
        .integer('id_sekolah')
        .unsigned()
        .references('id')
        .inTable('sekolahs')
        .onDelete('CASCADE')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
