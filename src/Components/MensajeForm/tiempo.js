var ahora
var horas
var minutos
var segundos

setInterval(() => {
    ahora = new Date()
    horas = ahora.getHours()
    minutos = ahora.getMinutes()

    if (horas < 10) {
        horas = `0${horas}`
    }

    if (minutos < 10) {
        minutos = `0${minutos}`
    }
}, 500)

export { horas, minutos }