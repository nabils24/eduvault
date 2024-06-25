import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Sekolah extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_sekolah: string

  @column()
  declare alamat: string

  @column()
  declare npsn: string

  @column()
  declare logo: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}