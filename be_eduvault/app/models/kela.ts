import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Kela extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_kelas: string

  @column()
  declare wali_kelas: string

  @column()
  declare jumlah_siswa: number

  @column()
  declare id_sekolah: number
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}