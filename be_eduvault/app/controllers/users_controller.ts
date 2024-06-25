import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import User from '#models/user'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const users = await User.all()
    if (users.length == 0) {
      return { message: 'Data not found' }
    } else {
      return users
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    // create new user and set new img_profile move to public path

    // Check user if exist
    const check = await User.findBy('email', request.input('email'))
    if (check) {
      console.log(request.input('email'))
      return { status: 'failed', message: 'User already exist' }
    } else {
      const data = request.only([
        'id_kelas',
        'id_sekolah',
        'full_name',
        'email',
        'password',
        'role',
        'avatar',
      ])
      let avatar = request.file('avatars')

      if (avatar) {
        await avatar.move(app.makePath('uploads/avatar'), {
          name: `${cuid()}.${avatar.extname}`,
        })
        console.log(avatar)
      } else {
        avatar = null
      }

      data.avatar = avatar ? avatar.fileName : null

      const user = await User.create(data)
      return user
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await User.find(params.id)
    if (user) {
      return user
    } else {
      return { message: 'Data not found' }
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const user = await User.find(params.id)
    if (user) {
      const data = request.only([
        'id_kelas',
        'id_sekolah',
        'full_name',
        'email',
        'password',
        'role',
        'avatar',
      ])
      let avatar = request.file('avatars')

      if (avatar) {
        await avatar.move(app.makePath('uploads/avatar'), {
          name: `${cuid()}.${avatar.extname}`,
        })
        console.log(avatar)
      } else {
        avatar = null
      }

      data.avatar = avatar ? avatar.fileName : null

      user.merge(data)
      await user.save()
      return user
    } else {
      return { message: 'Data not found' }
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const user = await User.find(params.id)
    if (user) {
      await user.delete()
      return { message: 'Data deleted' }
    } else {
      return { message: 'Data not found' }
    }
  }
}
