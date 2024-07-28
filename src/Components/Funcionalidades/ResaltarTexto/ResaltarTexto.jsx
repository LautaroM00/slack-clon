import React, {useState} from 'react'


import './ResaltarTexto.css'

const ResaltarTexto = ({ texto, textoFiltro }) => {
    const [textoState] = useState(texto)

    let regexp = new RegExp(textoFiltro, 'gi')

    let coincidenciasMarcadas = texto.replace(regexp, `¨${textoFiltro}¨`)

    let textoFiltrado = coincidenciasMarcadas.split('¨')

    console.log(textoFiltrado)

    return (
        <>
            {
                (textoFiltro && textoState.toLowerCase().includes(textoFiltro.toLowerCase())) ?
                    <>
                        {
                            textoFiltrado.map((elemento, index) => {
                                return (
                                    elemento.includes(textoFiltro) ?
                                        <mark key={index}>{elemento}</mark> :
                                        elemento
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











/*                 {
                    mensajes.map((mensaje, index) => {
                        return (
                            <>
                                {
                                    textoFiltro ?
                                        <div>
                                            
                                        </div> :
                                        <div key={index}>
                                            {mensaje.texto}
                                        </div>
                                }
                            </>
                        )

                    })
                } */