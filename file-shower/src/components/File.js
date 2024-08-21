import React from "react";

const url = 'http://localhost:8090/file'

export class FileShower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: ''};

        this.fetchFile = this.fetchFile.bind(this);
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {
        this.fetchFile()

        const interval = setInterval(() => {
            this.fetchFile()
        }, 1000)
    }

    setData(f) {
        this.setState({
            file: f
        })
    }

    fetchFile() {
        const func = this.setData
        fetch(url).then(function(response) {
            return response.json()
        }).then(function(data) {
            func(data)
        }).catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    render() {
        console.log(this.state.file)
        return (
            <div>
                <h1>File data</h1>
                <div style={{border: '2px solid black', width: '50%', marginLeft: '10px'}}>
                    <pre style={{ textAlign: 'left'}}>
                        {JSON.stringify(this.state.file, null, 2) }
                    </pre>
                </div>
            </div>
        )
    }
}