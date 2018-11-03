import React, { Component } from "react";
import API from "../../utils/API";
import { Card } from "../../components/Card";
import { Row, Container, Col } from "../../components/Grid";
import { ScrapeBtn } from "../../components/ScrapeBtn";
class Home extends Component {
   
    state = {
        articles: [],
        scrapeText: "Scrape",
        scrapeBg: "bg-info"
    }

    componentDidMount() {
        API.getAllArticles()
            .then(result => this.setState({articles: result.data}));
    }

    runScrape = () => {
        this.setState({scrapeText: "Scraping..."});
        API.scrape();
        API.getAllArticles()
            .then(result => this.setState({articles: result.data, scrapeText: "Done", ScrapeBg: "bg-success"}));

        setTimeout(() => {
            return this.setState({scrapeText: "Scrape"});
        }, 2000);
    }

    render() {
        // console.log("User", this.props.user);
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="md-2">
                            <ScrapeBtn bootstrap="btn btn-lg text-light btn-info mt-5" onClick={this.runScrape}>{this.state.scrapeText}</ScrapeBtn>
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

export default Home;