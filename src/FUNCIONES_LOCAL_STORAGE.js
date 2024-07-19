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

const actualizarLS = () => {
    const objeto_string = JSON.stringify(WORKSPACES)

    localStorage.setItem('WORKSPACES', objeto_string)
}

export { setLS, traerLS, actualizarLS}