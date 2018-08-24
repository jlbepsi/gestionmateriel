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

        console.log(params.id);
        fetch(`http://localhost:8080/api/portables/${params.id}`)
            .then(result => {
                return result.json()
            })
            .then(data => {
                this.setState({laptop: data})
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        // The parameters we are gonna pass to the fetch function
        let fetchData = {
            method: 'PUT',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.laptop)
        };

        fetch(`http://localhost:8080/api/laptops/${this.state.laptop.id}`, fetchData
        )
            .then(response => {
                return response.json()
            })
            .then(data => {
                alert("Modifications enregistrées");
            })
            .catch(err => {
                console.error('Request failed', err)
            });
    }
}

export default PortableEdit;