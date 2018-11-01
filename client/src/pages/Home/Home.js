import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import API from "../../utils/API";
import { Card } from "../../components/Card";
import { Row, Container, Col } from "../../components/Grid";
import { TextArea, FormBtn} from "../../components/Form";

class Home extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            displayArticleSize: "md-12",
            displayNotesSize: "md-0",
            articles: [],
            viewNotes: false,
            noteText: "",
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

    addNote = articleId => {
        
    }

    render() {
        console.log(this.state.viewNotes);
        return (
            <div>
                <Route exact path="/" render={() => (
                    <Container>
                        {(this.state.viewNotes) ? (
                            <Row>
                                <Col size="md-8 sm-12">
                                    {this.state.articles.map(a => <Card key={a._id} id={a._id} url={"https://www.reddit.com" + a.link} headLine={a.headLine} summary={a.summary} onClick={() => this.getNotes(a._id)}/>)}

                                    { (this.state.articles.notes) ?
                                        this.state.articles.notes.map(note => <div>{note}</div>)
                                        : <div><h1>Notes Will Show Here</h1></div>
                                    }

                                </Col>
                                <Col size="md-4">
                                    <h1>Add Note</h1>
                                   <form>
                                        <TextArea name="noteText" value={this.state.noteText} onChange={this.handleInputChange} placeholder="Write Note Here"/>
                                        <FormBtn onClick={() => this.addNote(this.state.articles[0]._id)}>Add</FormBtn>
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