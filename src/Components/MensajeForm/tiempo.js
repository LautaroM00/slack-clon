var ahora

var horas

var minutos

var segundos

setInterval(() => {
    ahora = new Date()

    horas = ahora.getHours()

    minutos = ahora.getMinutes()

    segundos = ahora.getSeconds()

    if (horas < 10) {
        horas = `0${horas}`
    }

    if (minutos < 10) {
        minutos = `0${minutos}`
    }

    if (segundos < 10) {
        segundos = `0${segundos}`
    }
}, 500)

export { horas, minutos, segundos }