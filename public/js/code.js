

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click','.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    nombre_edit.value = fila.children[0].innerHTML
    apellidos_edit.value = fila.children[1].innerHTML
    correo_edit.value = fila.children[2].innerHTML
    fecha_nac_edit.value = fila.children[3].innerHTML
})