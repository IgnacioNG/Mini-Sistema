import * as services from '../services/alumnos.services.js'
import * as views from '../views/alumnos.views.js'


function getAlumnos(req, res) {
    services.getAlumnos({deleted:true})
        .then(function (alumnos) {
            res.send(views.createAlumnoListPage(alumnos))
        })
}


function getAlumnoDetail(req, res) {
    const legajo = req.params.legajo

    services.getAlumnoByLegajo(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.send(views.createAlumnoPage(alumno))
            }
            else {
                res.send(views.createPage('Alumno no encontrado', '<p>No se encontró el alumno con el legajo especificado.</p>'))
            }
        })
}

function createNewAlumnoPage(req, res) {
    res.send(views.createNewAlumnoPage())
}



function createAlumno(req, res) {
    const alumno = {
        legajo: req.body.legajo,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: req.body.año
    }

    services.createAlumno(alumno)
            .then(function (newAlumno) {
                res.send(views.createPage('alumno creado', `<p>el alumno ${newAlumno.nombre} ${newAlumno.apellido} ha sido creado con el legajo ${newAlumno.legajo}</p>`))
            })
            .catch(function (error) {
                res.send(views.createPage('error creando alumno', '<p>error creando el alumno</p>'))
            })

}


function editAlumnoPage(req, res) {
    const legajo = req.params.legajo

    services.getAlumnoByLegajo(legajo)
        .then(function (alumno) {
            if(alumno) {
                res.send(views.formEditAlumno(alumno))
            }
            else {
                res.send(views.createPage('alumno no encontrado', '<p>el alumno no existe</p>'))
            }
        })

}



function editAlumno(req, res) {
    const legajo = req.params.legajo;
    const alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: req.body.año
    };

    services.editAlumno(legajo, alumno)
        .then(function (alumno) {
            if (alumno) {
                res.send(views.createPage('alumno modificado', `<p>el alumno ${alumno.nombre} ${alumno.apellido} ha sido modificado</p>`));
            } else {
                res.send(views.createPage('alumno no encontrado', '<p>el alumno no existe</p>'));
            }
        });
}


function deleteAlumnoPage(req, res) {
    const legajo = req.params.legajo

    services.getAlumnoByLegajo(legajo)
        .then(function (alumno) {
            if(alumno) {
                res.send(views.formDeleteAlumno(alumno))
            }
            else {
                res.send(views.createPage('alumno no encontrado', '<p>el alumno no existe</p>'))
            }
        })
        
}

function deleteAlumno(req, res) {
    const legajo = parseInt(req.params.legajo)

    services.deleteAlumno(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.send(views.createPage('alumno eliminado', `<p>el alumno ${alumno.nombre} ${alumno.apellido} ha sido eliminado</p>`))
            }
            else {
                res.send(views.createPage('alumno no encontrado', '<p>el alumno no existe</p>'))
            }
        })
        .catch(function (error) {
            res.send(views.createPage('error eliminando', '<p>se ha producido un error eliminando el alumno</p>'))
        })
}

export {
    getAlumnos,
    getAlumnoDetail,
    createNewAlumnoPage,
    createAlumno,
    editAlumnoPage,
    editAlumno,
    deleteAlumnoPage,
    deleteAlumno
}