import StationModify from './StationModify'


class StationEdit extends StationModify {

    constructor(props) {
        super(props);

        this.title = "Modification de la station";
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();

        const {match: {params}} = this.props;

        this.stationsAPI.getStation(params.id)
            .then(data => {
                this.setState({station: data})
            });

    }

    handleSubmit(event) {
        event.preventDefault();

        this.stationsAPI.updateStation(this.state.station)
            .then(data => {
                alert("Modifications enregistrées");
            })
            .catch(err => {
                console.error('Request failed', err)
            });
    }
}

export default StationEdit;