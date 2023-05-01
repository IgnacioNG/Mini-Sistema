import express from 'express'
import * as controllers from '../controllers/alumno.controller.js'

const route = express.Router()

route.get('/alumnos', controllers.getAlumnos)

route.get('/alumnos/nuevo', controllers.createNewAlumnoPage)
route.post('/alumnos/nuevo', controllers.createAlumno)

route.get('/alumnos/:legajo/edit', controllers.editAlumnoPage)
route.post('/alumnos/:legajo/edit', controllers.editAlumno)

route.get('/alumnos/:legajo/delete', controllers.deleteAlumnoPage)
route.post('/alumnos/:legajo/delete', controllers.deleteAlumno)

route.get('/alumnos/:legajo', controllers.getAlumnoDetail)

export default route