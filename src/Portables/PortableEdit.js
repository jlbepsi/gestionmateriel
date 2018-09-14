import PortableModify from './PortableModify'

// https://scotch.io/courses/using-react-router-4/route-params
// https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/

class PortableEdit extends PortableModify {

    constructor(props) {
        super(props);

        this.title = "Modification du portable";
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const {match: {params}} = this.props;

        this.portablesAPI.getPortable(params.id)
            .then(data => {
                this.setState({laptop: data})
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.portablesAPI.updatePortable(this.state.laptop)
            .then(data => {
                alert("Modifications enregistrées");
            })
            .catch(err => {
                console.error('Request failed', err)
            });
    }
}

export default PortableEdit;