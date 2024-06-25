import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Mapel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_mapel: string

  @column()
  declare kode_mapel: string

  @column()
  declare id_kelas: number

  @column()
  declare id_sekolah: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}