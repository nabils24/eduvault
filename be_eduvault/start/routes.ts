/*
|--------------------------------------------------------------------------
| Controller
|--------------------------------------------------------------------------
|
| -
|
*/
const UsersController = () => import('#controllers/users_controller')
const SekolahsController = () => import('#controllers/sekolahs_controller')
const KelasController = () => import('#controllers/kelas_controller')
const MapelController = () => import('#controllers/mapels_controller')
const MateriController = () => import('#controllers/materis_controller')

/*
|--------------------------------------------------------------------------
| Model
|--------------------------------------------------------------------------
|
| -
|
*/

import Usermodel from '#models/user'
import hash from '@adonisjs/core/services/hash'

/*
|--------------------------------------------------------------------------
| App
|--------------------------------------------------------------------------
|
| -
|
*/

import app from '@adonisjs/core/services/app'

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return { status: 'success', message: 'Welcome to Eduvault API' }
})
router
  .group(() => {
    //Authorization
    router.post('/login', async ({ request }) => {
      const { email, password } = request.all()
      const checkUser = await Usermodel.findBy('email', email)
      if (!checkUser) {
        return { status: 'error', message: 'Email not found' }
      } else {
        const passwordVerified = await hash.verify(checkUser.password, password)
        if (!passwordVerified) {
          return { status: 'error', message: 'Invalid password' }
        } else {
          const token = await Usermodel.accessTokens.create(checkUser)
          return { status: 'success', message: 'Login success', data: checkUser, token }
        }
      }
    })
    router.post('/register', [UsersController, 'store'])

    //User
    router.get('/users', [UsersController, 'index'])
    router.post('/users', [UsersController, 'store'])
    router.get('/users/:id', [UsersController, 'show'])
    router.put('/users/:id', [UsersController, 'update'])
    router.delete('/users/:id', [UsersController, 'destroy'])

    // Get Image Profile
    router.get('/users/avatar/:filename', async ({ params, response }) => {
      response.download(app.makePath(`uploads/avatar/${params.filename}`))
    })

    //Sekolah
    router.get('/sekolah', [SekolahsController, 'index'])
    router.post('/sekolah', [SekolahsController, 'store'])
    router.get('/sekolah/:id', [SekolahsController, 'show'])
    router.put('/sekolah/:id', [SekolahsController, 'update'])
    router.delete('/sekolah/:id', [SekolahsController, 'destroy'])

    // Get Image Logo
    router.get('/sekolah/logo/:filename', async ({ params, response }) => {
      response.download(app.makePath(`uploads/logo/${params.filename}`))
    })

    //Kelas
    router.get('/kelas', [KelasController, 'index'])
    router.post('/kelas', [KelasController, 'store'])
    router.get('/kelas/:id', [KelasController, 'show'])
    router.put('/kelas/:id', [KelasController, 'update'])
    router.delete('/kelas/:id', [KelasController, 'destroy'])

    //Mapel
    router.get('/mapel', [MapelController, 'index'])
    router.post('/mapel', [MapelController, 'store'])
    router.get('/mapel/:id', [MapelController, 'show'])
    router.put('/mapel/:id', [MapelController, 'update'])
    router.delete('/mapel/:id', [MapelController, 'destroy'])

    //Materi
    router.get('/materi', [MateriController, 'index'])
    router.get('/materi/mapel/:id', [MateriController, 'showMateriByIdMapel'])
    router.post('/materi', [MateriController, 'store'])
    router.get('/materi/:id', [MateriController, 'show'])
    router.put('/materi/:id', [MateriController, 'update'])
    router.delete('/materi/:id', [MateriController, 'destroy'])

    // Get File Materi
    router.get('/materi/file/:filename', async ({ params, response }) => {
      response.download(app.makePath(`uploads/materi/${params.filename}`))
    })
    // Get Thumbnail Materi
    router.get('/materi/thumbnail/:filename', async ({ params, response }) => {
      response.download(app.makePath(`uploads/materi/thumbnail/${params.filename}`))
    })
  })
  .prefix('api')
