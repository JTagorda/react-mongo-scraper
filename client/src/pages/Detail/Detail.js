import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import DeleteBtn from "../../components/DeleteBtn";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      noteTitle: "",
      noteBody: ""
    }
  }
  
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {

    console.log(this.props.match.params.id);
    API.getArticleById(this.props.match.params.id)
      .then(result => {
        console.log(result);
        this.setState({ article: result.data })
      })
      .catch(err => console.log(err));
  }

  deleteNote = (articleId, noteId) => {
    let data = {noteId};
    API.removeNote(articleId, data)
        .then(() => (
            API.getArticleById(articleId)
                .then(result => this.setState({article: result.data}))
        ));
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value  } = event.target;
    this.setState({ [name]: value});
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let articleId = this.state.article._id;
    const data = {
        title: this.state.noteTitle,
        body: this.state.noteBody
    };
    API.createNoteAndAssociateWithArticle(articleId, data)
        .then(() => (
            API.getArticleById(articleId)
                .then(result => this.setState({article: result.data, noteTitle: "", noteBody: ""}))
        ));
            
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col size="md-8 sm-12">
                <h1>Article</h1>
                <Card id={this.state.article._id} url={"https://www.reddit.com" + this.state.article.link} headLine={this.state.article.headLine} summary={this.state.article.summary} onClick={() => this.getNotes(this.state.article._id)}/>

                <h1 className="my-3">Posts</h1>
                { (this.state.article.note) ? 
                    this.state.article.note.map(note => (
                        <div className="card my-2" key={note._id} id={note._id}>
                            <div className="card-body">
                            <Row>
                                <Col size="md-10">
                                    <h5 className="card-title">{note.title}</h5>
                                </Col>
                                <Col size="md-2">
                                    <DeleteBtn onClick={() => this.deleteNote(this.state.article._id, note._id)}/>
                                </Col>
                            </Row>
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
      </Container>
      </div>
    );
  }
}

export default Detail;
