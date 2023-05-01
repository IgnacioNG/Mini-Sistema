function createPage(title, content) {
    let html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    
    html += '<link rel="stylesheet" href="/css/style.css">'

    html += '<title>' + title + '</title></head><body>'

    html += '<a href="/">Inicio</a> | <a href="/alumnos">lista de alumnos</a> | <a href="/alumnos/nuevo">nuevo alumno</a>  '

    html += '<h1> Mi espectacular pagina web!</h1>'

    html += content

    html += '</body></html>'

    return html
}

function createAlumnoListPage(alumnos) {
    let html = '<h1>lista de alumnos</h1>'
    html += '<ul>'

    for (let i = 0; i < alumnos.length; i++) {
        html += `<li>${alumnos[i].nombre} ${alumnos[i].apellido} <a href="/alumnos/${alumnos[i].legajo}">Ver</a> <a href="/alumnos/${alumnos[i].legajo}/edit">Modificar</a> <a href="/alumnos/${alumnos[i].legajo}/delete">Eliminar</a></li>`
    }

    html += '</ul>'

    return createPage('lista de alumnos', html)
}



function createAlumnoPage(alumno) {
    let html = `<h1>${alumno.nombre} ${alumno.apellido}</h1>`
    html += `<p>Legajo: ${alumno.legajo}</p>`
    html += `<p>Año: ${alumno.año}</p>`

    return createPage(`${alumno.nombre} ${alumno.apellido}`, html)
}



function createNewAlumnoPage() {
    let html = `<h1>Crear nuevo alumno</h1>`
    html += `<form action="/alumnos/nuevo" method="POST" enctype="application/x-www-form-urlencoded">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre">

        <label for="apellido">Apellido</label>
        <input type="text" name="apellido" id="apellido">

        <label for="legajo">Legajo</label>
        <input type="text" name="legajo" id="legajo">

        <label for="año">Año</label>
        <input type="number" name="año" id="año">

        <input type="submit" value="Crear">
    </form>`

    return createPage('Crear nuevo alumno', html)
}


function formEditAlumno(alumno) {
    let html = `<h1>Modificar alumno ${alumno.nombre} ${alumno.apellido}</h1>`
    html += `<form action="/alumnos/${alumno.legajo}/edit" method="POST" enctype="application/x-www-form-urlencoded">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre" value="${alumno.nombre}">

        <label for="apellido">Apellido</label>
        <input type="text" name="apellido" id="apellido" value="${alumno.apellido}">

        <label for="legajo">Legajo</label>
        <input type="text" name="legajo" id="legajo" value="${alumno.legajo}" readonly>

        <label for="año">Año</label>
        <input type="number" name="año" id="año" value="${alumno.año}">

        <button type="submit">Modificar</button>
    </form>`

    return createPage('Modificar alumno', html)
}


function formDeleteAlumno(alumno) {
    let html =  `<h1>Eliminar alumno #${alumno.legajo}</h1>`

    html += `<h1>${alumno.nombre} ${alumno.apellido}</h1>`
    html += `<p>Año: ${alumno.año}</p>`

    html += `<form action="/alumnos/${alumno.legajo}/delete" method="POST" enctype="application/x-www-form-urlencoded">
            <p>¿Estás seguro de eliminar al alumno ${alumno.nombre} ${alumno.apellido}?</p>
            <button type="submit">Eliminar</button>
            </form> `

    return createPage('Eliminar alumno', html)
}

export {
    createPage,
    createAlumnoListPage,
    createAlumnoPage,
    createNewAlumnoPage,
    formEditAlumno,
    formDeleteAlumno
}
