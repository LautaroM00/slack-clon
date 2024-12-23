import React, {useState} from 'react'


import './ResaltarTexto.css'

const ResaltarTexto = ({ texto, textoFiltro }) => {
    const [textoState] = useState(texto)

    let regexp = new RegExp(`(${textoFiltro})`, 'gi')

    let letrasMensaje = texto.split(regexp)

    return (
        <>
            {
                (textoFiltro && textoState.toLowerCase().includes(textoFiltro.toLowerCase())) ?
                    <>
                        {
                            letrasMensaje.map((letra, index) => {
                                return (
                                    letra.toLowerCase() === textoFiltro.toLowerCase() ?
                                        <mark key={index}>{letra}</mark> :
                                        letra
                                )
                            })
                        }
                    </> :
                    <>
                        {texto}
                    </>
            }
        </>
    )
}

export default ResaltarTexto