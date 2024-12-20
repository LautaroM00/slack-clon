class FormDivProps {
    constructor(htmlFor_id_name, labelText, type) {
        this.data = {
            labelProps: {
                htmlFor: htmlFor_id_name
            },
            labelText: labelText,
            inputProps: {
                id: htmlFor_id_name,
                name: htmlFor_id_name,
                type: type ?? 'text'
            }
        }
    }

    build(){
        return this.data
    }
}

export default FormDivProps