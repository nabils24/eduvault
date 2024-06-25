import type { HttpContext } from '@adonisjs/core/http'
import Kelas from '#models/kela'

export default class KelasController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const kelas = await Kelas.all()
    if (kelas.length === 0) {
      return { message: 'Data not found' }
    } else {
      return kelas
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
    // check if kelas already exist
    const check = await Kelas.findBy('nama_kelas', request.input('nama_kelas'))
    if (check) {
      return { status: 'failed', message: 'Kelas already exist' }
    } else {
      const data = request.only(['nama_kelas', 'wali_kelas', 'jumlah_siswa', 'id_sekolah'])

      const kelas = await Kelas.create(data)
      return kelas
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const kelas = await Kelas.find(params.id)
    if (!kelas) {
      return { message: 'Data not found' }
    } else {
      return kelas
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
    const kelas = await Kelas.find(params.id)
    if (!kelas) {
      return { message: 'Data not found' }
    } else {
      const data = request.only(['nama_kelas', 'wali_kelas', 'jumlah_siswa', 'id_sekolah'])

      kelas.merge(data)
      await kelas.save()
      return kelas
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const kelas = await Kelas.find(params.id)
    if (!kelas) {
      return { message: 'Data not found' }
    } else {
      await kelas.delete()
      return { message: 'Data deleted' }
    }
  }
}
