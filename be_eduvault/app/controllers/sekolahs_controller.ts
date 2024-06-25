import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import Sekolah from '#models/sekolah'

export default class SekolahsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const sekolahs = await Sekolah.all()
    if (sekolahs.length === 0) {
      return { message: 'Data not found' }
    } else {
      return sekolahs
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    // check if sekolah already exist
    const check = await Sekolah.findBy('nama_sekolah', request.input('nama_sekolah'))
    if (check) {
      return { status: 'failed', message: 'Sekolah already exist' }
    } else {
      const data = request.only(['nama_sekolah', 'alamat', 'npsn', 'logo'])

      let logo = request.file('logos')

      if (logo) {
        await logo.move(app.makePath('uploads/logo'), {
          name: `${cuid()}.${logo.extname}`,
        })
        console.log(logo)
      } else {
        logo = null
      }

      data.logo = logo ? logo.fileName : null

      const sekolah = await Sekolah.create(data)
      return sekolah
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const sekolah = await Sekolah.find(params.id)
    if (!sekolah) {
      return { message: 'Data not found' }
    } else {
      return sekolah
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
    const sekolah = await Sekolah.find(params.id)
    if (sekolah) {
      const data = request.only(['nama_sekolah', 'alamat', 'npsn', 'logo'])
      let logo = request.file('logos')

      if (logo) {
        await logo.move(app.makePath('uploads/logo'), {
          name: `${cuid()}.${logo.extname}`,
        })
        console.log(logo)
      } else {
        logo = null
      }

      data.logo = logo ? logo.fileName : null

      sekolah.merge(data)
      await sekolah.save()
      return sekolah
    } else {
      return { message: 'Data not found' }
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const sekolah = await Sekolah.find(params.id)
    if (sekolah) {
      await sekolah.delete()
      return { message: 'Data deleted' }
    } else {
      return { message: 'Data not found' }
    }
  }
}
