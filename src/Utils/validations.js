/* workspaceName &&
            channelName &&
            workspaceName.length <= 20 &&
            workspaceName.length >= 5 &&
            channelName.length <= 23 &&
            channelName.length >= 3 &&
            !estaRepetido */

const validateInputsCreateWorkspace = (workspaceName, channelName, workspaces) => {

    const errors = []

    workspaceName && workspaceName.length >= 5 && workspaceName.length <= 20 ? '' : errors.push('El nombre del WORKSPACE debe tener entre 5 y 20 caracteres inclusive.')

    channelName && channelName.length >= 3 && channelName.length <= 23 ? '' : errors.push('El nombre del CANAL debe tener entre 3 y 23 caracteres inclusive.')

    workspaces.some(workspace => workspace.name === workspaceName) && errors.push('Ya existe un workspace con el nombre que intenta ingresar.')

    return errors

}

export default validateInputsCreateWorkspace