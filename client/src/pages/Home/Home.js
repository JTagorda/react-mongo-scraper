import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import API from "../../utils/API";
import { Card } from "../../components/Card";
import { Row, Container, Col } from "../../components/Grid";
import { Input, TextArea, FormBtn} from "../../components/Form";

class Home extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            displayArticleSize: "md-12",
            displayNotesSize: "md-0",
            articles: [],
            viewNotes: false,
            noteTitle: "",
            noteBody: "",
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

    getNotes = articleId => {
        console.log(articleId);
        API.getArticleById(articleId)
            .then(result => this.setState({articles: [result.data], viewNotes: true}));
    }

    handleInputChange = event => {
        event.preventDefault();
        const { name, value  } = event.target;
        this.setState({ [name]: value});
    }

    handleFormSubmit = event => {
        event.preventDefault();
        let articleId = this.state.articles[0]._id;
        const data = {
            title: this.state.noteTitle,
            body: this.state.noteBody
        };
        API.createNoteAndAssociateWithArticle(articleId, data)
            .then(() => (
                API.getArticleById(articleId)
                    .then(result => this.setState({articles: [result.data], noteTitle: "", noteBody: ""}))
            ));
                
    }

    render() {
        console.log(this.state.articles);
        return (
            <div>
                <Route exact path="/" render={() => (
                    <Container>
                        {(this.state.viewNotes) ? (
                                <Row>
                                    <Col size="md-8 sm-12">
                                        {this.state.articles.map(a => <Card key={a._id} id={a._id} url={"https://www.reddit.com" + a.link} headLine={a.headLine} summary={a.summary} onClick={() => this.getNotes(a._id)}/>)}

                                        <h1 className="my-3">Posts</h1>
                                        { (this.state.articles[0].note) ? 
                                            this.state.articles[0].note.map(note => (
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                    <h5 className="card-title">{note.title}</h5>
                                                    <p className="card-text">{note.body}</p>
                                                    </div>
                                                </div>
                                            ))
                                            : <div><h1>Notes Will Show Here</h1></div>
                                        }

                                    </Col>
                                    <Col size="md-4">
                                        <h1>Add A Note</h1>
                                    <form>
                                            <Input name="noteTitle" value={this.state.noteTitle} onChange={this.handleInputChange} placeholder="Note Title"/>
                                            <TextArea name="noteBody" value={this.state.noteBody} onChange={this.handleInputChange} placeholder="Insert Note Body..."/>
                                            <FormBtn onClick={this.handleFormSubmit}>Add</FormBtn>
                                    </form> 
                                    </Col>
                                </Row>
                            )
                            :
                                <Row>
                                    <Col size="md-12 sm-12">
                                        {this.state.articles.map(a => <Card key={a._id} id={a._id} url={"https://www.reddit.com" + a.link} headLine={a.headLine} summary={a.summary} onClick={() => this.getNotes(a._id)}/>)}
                                    </Col>
                                </Row>  
                        }
                    </Container>
                )} />
            </div>
           
        )
    }
}

export default Home;