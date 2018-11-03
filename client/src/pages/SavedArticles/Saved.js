import React, { Component } from "react";
import API from "../../utils/API";
import { Card } from "../../components/Card";
import { Row, Container, Col } from "../../components/Grid";
class Saved extends Component {
   
    state = {
        articles: []
    }

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getAllArticles()
            .then(result => this.setState({articles: result.data}));
    }

    render() {
        console.log(this.state.articles);
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="md-2">
                            <ScrapeBtn classProps={"btn btn-lg text-light btn-info mt-5"} onClick={this.runScrape}>{this.state.scrapeText}</ScrapeBtn>
                        </Col>
                        <Col size="md-10 sm-12">
                            <h1>Articles</h1>
                            {this.state.articles.map(a => <Card key={a._id} id={a._id} url={"https://www.reddit.com" + a.link} headLine={a.headLine} summary={a.summary} />)}
                        </Col>
                    </Row>  
                </Container>
            </div>
        )
    }
}

export default Saved;