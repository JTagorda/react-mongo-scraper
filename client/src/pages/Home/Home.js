import React, { Component } from "react";
import API from "../../utils/API";
import { Card } from "../../components/Card";
// import Navbar from "../../components/Nav";

class Home extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.scrape();
        API.getAllArticles()
            .then(result => this.setState({articles: result.data}));
    }

    render() {
        console.log(this.state.articles);
        return (
            <div>
                <h1>Render Cards</h1>
                {this.state.articles.map(a => <Card key={a._id} id={a._id} headline={a.headline} summary={a.summary}/>)}

            </div>
        )
    }
}

export default Home;