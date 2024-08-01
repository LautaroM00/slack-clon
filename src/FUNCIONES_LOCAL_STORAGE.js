import WORKSPACES from "./WORKSPACES"

const setLS = () => {

    const valorDeKey = localStorage.getItem('WORKSPACES')

    if(valorDeKey === null){

        const WORKSPACES_string = JSON.stringify(WORKSPACES)

        localStorage.setItem('WORKSPACES', WORKSPACES_string)
    }
}

const traerLS = () => {

    const WORKSPACES_string = localStorage.getItem('WORKSPACES')

    const WORKSPACES_objeto = JSON.parse(WORKSPACES_string)

    return WORKSPACES_objeto
}

const actualizarLS = (WORKSPACES) => {
    if(WORKSPACES){
        const objeto_string = JSON.stringify(WORKSPACES)

        localStorage.setItem('WORKSPACES', objeto_string)
    }else{
        const objeto_string = JSON.stringify(WORKSPACES)

        localStorage.setItem('WORKSPACES', objeto_string)
    }
}

const agregarMensajeLS = (indexWorkspace, indexCanal, mensaje) => {
    const WORKSPACES = traerLS()

    WORKSPACES[indexWorkspace].canales[indexCanal].mensajes.push(mensaje)

    localStorage.setItem('WORKSPACES', JSON.stringify(WORKSPACES))
}





export { setLS, traerLS, actualizarLS, agregarMensajeLS}