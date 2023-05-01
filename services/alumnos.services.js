import { readFile, writeFile } from 'node:fs/promises'

async function getAlumnos(filter = {}) {
    return readFile('./data/alumnos.json')
        .then(function (data) {
            return JSON.parse(data)
        })
        .then(function (alumnos) {
            if (filter.deleted) {
                const alumnosFiltered = []

                for (let i = 0; i < alumnos.length; i++) {
                    if (!alumnos[i].deleted) {
                        alumnosFiltered.push(alumnos[i])
                    }
                }
                return alumnosFiltered
            }
            else {
                return alumnos
            }
        })
        .catch(function () {
            return []
        })
}


async function getAlumnoByLegajo(legajo) {
    return getAlumnos()
        .then(function (alumnos) {
            let alumno = null

            for (let i = 0; i < alumnos.length; i++) {
                if (alumnos[i].legajo == legajo) {
                    alumno = alumnos[i]
                    break
                }
            }

            return alumno
        })
}

async function createAlumno(alumno) {
    const alumnos = await getAlumnos()

    const newAlumno = {
        ...alumno,
        legajo: alumnos.length + 1,
    }

    alumnos.push(newAlumno)

    await writeFile('./data/alumnos.json', JSON.stringify(alumnos))

    return newAlumno
}


async function editAlumno(legajo, alumno) {
    const alumnos = await getAlumnos()
    let editAlumno = null

    for(let i = 0; i < alumnos.length; i++) {
        if(alumnos[i].legajo == legajo) {
            alumnos[i] = {
                ...alumno,
                legajo: legajo,
            }
            editAlumno = alumnos[i]
            break
        }
    }
    if (editAlumno) {
        await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
    }

    return editAlumno
}

async function deleteAlumno(legajo, alumno) {
    const alumnos = await getAlumnos()
    let editAlumno = null

    for(let i = 0; i < alumnos.length; i++) {
        if(alumnos[i].legajo == legajo) {
            alumnos[i].deleted = true
            editAlumno = alumnos[i]
            break
        }
    }
    if (editAlumno) {
        await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
    }

    return editAlumno
}

export {
    getAlumnos,
    getAlumnoByLegajo,
    createAlumno,
    editAlumno,
    deleteAlumno
}