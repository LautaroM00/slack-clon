const cortarPalabra = (palabra) => {

    if (palabra.length > 10) {

        let acumulador = ''

        for (let i = 9; i < palabra.length + 9; i = i + 9) {
            if((acumulador.length + 9) > palabra.length){
                acumulador = acumulador + palabra.slice(i - 9, i)
                break
            }
            acumulador = acumulador + palabra.slice(i - 9, i) + '- '
        }

        return (acumulador)
    } else {
        return (palabra)
    }

};

export { cortarPalabra }