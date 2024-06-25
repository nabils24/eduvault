import type { HttpContext } from '@adonisjs/core/http'
import Materi from '#models/materi'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { fromPath } from 'pdf2pic'
import * as fs from 'fs'

export default class MaterisController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const materis = await Materi.all()
    if (materis.length == 0) {
      return { message: 'Data not found' }
    } else {
      return materis
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
    // check if materi already exist
    const check = await Materi.findBy('judul', request.input('judul'))
    if (check) {
      return { status: 'failed', message: 'Materi already exist' }
    } else {
      const data = request.only(['judul', 'deskripsi', 'file', 'thumbnail', 'id_mapel'])

      let file = request.file('file')
      // let thumbnail = request.file('thumbnail')
      let thumbnails = ''

      if (file) {
        await file.move(app.makePath('uploads/materi'), {
          name: `${cuid()}.${file.extname}`,
        })
        const options = {
          density: 100,
          saveFilename: `${cuid()}`,
          savePath: app.makePath('uploads/materi/thumbnail'),
          format: 'jpeg',
          width: 498,
          height: 696,
        }
        const pdf2pic = fromPath(app.makePath('uploads/materi/' + file.fileName), options)
        try {
          const resolve = await pdf2pic(1, { responseType: 'image' })
          // console.log('Page 1 is now converted as image')
          thumbnails = resolve.name ? resolve.name : 'tidakada.jpg'
          data.thumbnail = thumbnails
          data.file = file ? file.fileName : null
          const materi = await Materi.create(data)
          return materi
        } catch (error) {
          console.error('Failed to convert PDF page to image:', error)
          throw error
        }
      } else {
        file = null
        thumbnails = 'tidakada.jpg'
        data.thumbnail = thumbnails
        data.file = file ? file.fileName : null
        const materi = await Materi.create(data)
        return materi
      }
      // if (thumbnail) {
      //   await thumbnail.move(app.makePath('uploads/materi/thumbnail'), {
      //     name: `${cuid()}.${thumbnail.extname}`,
      //   })
      // } else {
      //   thumbnail = 'tidakada.jpg'
      // }

      // data.thumbnail = thumbnail ? thumbnail : null
      // data.thumbnail = thumbnail ? thumbnail : null
      // if (thumbnail.fileName) {
      //   data.thumbnail = thumbnail.fileName
      // } else {
      //   data.thumbnail = 'tidakada.jpg'
      // }
    }
  }

  /**
   * Show Materi By Id Mapel
   */
  async showMateriByIdMapel({ params }: HttpContext) {
    const materi = await Materi.query().where('id_mapel', params.id)
    if (materi.length === 0) {
      return { message: 'Data not found' }
    } else {
      return materi
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const materi = await Materi.find(params.id)
    if (!materi) {
      return { message: 'Data not found' }
    } else {
      return materi
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
    const materi = await Materi.find(params.id)
    if (!materi) {
      return { message: 'Data not found' }
    } else {
      const data = request.only(['judul', 'deskripsi', 'file', 'thumbnail', 'id_mapel'])

      let file = request.file('file')
      let thumbnail = request.file('thumbnail')

      if (file) {
        await file.move(app.makePath('uploads/materi'), {
          name: `${cuid()}.${file.extname}`,
        })
        await thumbnail.move(app.makePath('uploads/materi/thumbnail'), {
          name: `${cuid()}.${thumbnail.extname}`,
        })
        console.log(file)
      } else {
        file = null
        thumbnail = null
      }
      data.file = file ? file.fileName : null
      data.thumbnail = thumbnail ? thumbnail.fileName : null

      materi.merge(data)
      await materi.save()
      return materi
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const materi = await Materi.find(params.id)
    if (!materi) {
      return { message: 'Data not found' }
    } else {
      await materi.delete()
      return { message: 'Data deleted' }
    }
  }
}
