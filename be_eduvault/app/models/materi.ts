import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Materi extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare judul: string

  @column()
  declare deskripsi: string

  @column()
  declare thumbnail: string

  @column()
  declare file: string

  @column()
  declare id_mapel: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}