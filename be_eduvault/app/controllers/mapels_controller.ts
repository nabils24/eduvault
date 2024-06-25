import type { HttpContext } from '@adonisjs/core/http'
import Mapel from '#models/mapel'

export default class MapelsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const mapels = await Mapel.all()
    if (mapels.length == 0) {
      return { message: 'Data not found' }
    } else {
      return mapels
    }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    // check if mapel already exist
    const check = await Mapel.findBy('nama_mapel', request.input('nama_mapel'))
    if (check) {
      return { status: 'failed', message: 'Mapel already exist' }
    } else {
      const data = request.only(['nama_mapel', 'kode_mapel', 'id_kelas', 'id_sekolah'])

      const mapel = await Mapel.create(data)
      return mapel
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const mapel = await Mapel.find(params.id)
    if (!mapel) {
      return { message: 'Data not found' }
    } else {
      return mapel
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const mapel = await Mapel.find(params.id)
    if (!mapel) {
      return { message: 'Data not found' }
    } else {
      mapel.nama_mapel = request.input('nama_mapel')
      mapel.kode_mapel = request.input('kode_mapel')
      mapel.id_kelas = request.input('id_kelas')
      mapel.id_sekolah = request.input('id_sekolah')

      await mapel.save()
      return mapel
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const mapel = await Mapel.find(params.id)
    if (!mapel) {
      return { message: 'Data not found' }
    } else {
      await mapel.delete()
      return { message: 'Data deleted' }
    }
  }
}
