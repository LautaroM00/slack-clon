export const validateInputsCreateWorkspace = (workspaceName, channelName, workspaces) => {

    const errors = []

    workspaceName && workspaceName.length >= 5 && workspaceName.length <= 20 ? '' : errors.push('El nombre del WORKSPACE debe tener entre 5 y 20 caracteres inclusive.')

    channelName && channelName.length >= 3 && channelName.length <= 23 ? '' : errors.push('El nombre del CANAL debe tener entre 3 y 23 caracteres inclusive.')

    workspaces.some(workspace => workspace.name === workspaceName) && errors.push('Ya existe un workspace con el nombre que intenta ingresar.')

    return errors

}

export const validateLength = (field_name, value) => {

    if (field_name === 'name') {

        return String(value).length >= 5 && String(value).length <= 20 ? '' : `El nombre debe tener entre 5 y 20 caracteres inclusive.`

    }
    if (field_name === 'password') {

        return String(value).length >= 7 && String(value).length <= 20 ? '' : `El password debe tener entre 7 y 20 caracteres inclusive.`
    }
}

