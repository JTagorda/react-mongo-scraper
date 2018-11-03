import React, { Component } from "react";
import API from "../../utils/API";
import { SavedCard } from "../../components/SavedCard";
import { Row, Container, Col } from "../../components/Grid";
import DeleteBtn from "../../components/DeleteBtn";

class Saved extends Component {
   constructor(props) {
       super(props);
       this.state = {
           articles: []
       }
   }
    
    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getSavedArticles(this.props.user._id)
            .then(result => {
                const { savedArticles } = result.data;

                (savedArticles.length === undefined) ? this.setState({ articles: [savedArticles]}) : this.setState({ articles: savedArticles });
            })
            .catch(err => console.log(err));
    }

    handleRemoval = articleId => {
        console.log(this.props.user._id + " " + articleId)
        let data = {articleId};
        API.removeSavedArticle(this.props.user._id, data)
        .then(() => {
            this.loadArticles();
        })
        .catch(err => console.log(err));
    }

    render() {
        console.log(this.props.user.savedArticles);
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="md-12 sm-12">
                            <h1>Watched Articles</h1>
                            {this.state.articles.map((a, index) => <SavedCard key={`${a._id}${index}`} id={a._id} url={"https://www.reddit.com" + a.link} headLine={a.headLine} summary={a.summary} removeArticle={() => this.handleRemoval(a._id)}/>
                            )}
                        </Col>
                    </Row>  
                </Container>
            </div>
        )
    }
}

export default Saved;