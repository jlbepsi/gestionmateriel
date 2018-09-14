import StationModify from "./StationModify";

class StationNew extends StationModify {

    constructor(props) {
        super(props);

        this.title = "Ajout d'une station";
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.stationsAPI.addStation(this.state.laptop)
            .then(data => {
                alert("Station ajoutée");
            })
            .catch(err => {
                console.error('Request failed', err)
            });
    }
}

export default StationNew;