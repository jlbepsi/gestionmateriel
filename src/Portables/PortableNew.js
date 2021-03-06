import PortableModify from "./PortableModify";

class PortableNew extends PortableModify {

    constructor(props) {
        super(props);

        this.title = "Ajout d'un portable";
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.portablesAPI.addPortable(this.state.laptop)
            .then(data => {
                alert("Portable ajouté");
            })
            .catch(err => {
                console.error('Request failed', err)
            });
    }
}

export default PortableNew;