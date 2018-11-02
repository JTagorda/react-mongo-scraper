import React, { Component } from "react";
import API from "../../utils/API";
import { Card } from "../../components/Card";
import { Row, Container, Col } from "../../components/Grid";
import Navbar from "../../components/Nav";
class Home extends Component {
   
    state = {
        articles: []
    }

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        // API.scrape();
        API.getAllArticles()
            .then(result => this.setState({articles: result.data}));
    }

    render() {
        console.log(this.state.articles);
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="md-12 sm-12">
                            <h1>Articles</h1>
                            {this.state.articles.map(a => <Card key={a._id} id={a._id} url={"https://www.reddit.com" + a.link} headLine={a.headLine} summary={a.summary} />)}
                        </Col>
                    </Row>  
                </Container>
            </div>
        )
    }
}

export default Home;