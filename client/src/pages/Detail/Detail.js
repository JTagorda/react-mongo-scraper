import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Card } from "../../components/Card";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      noteTitle: "",
      noteBody: "",
      watching: "Watch",
      isWatching: false
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

    API.getSavedArticles(this.props.user._id)
      .then(result => {
        (result.data.savedArticles) ? result.data.savedArticles.map(a => {
          if (a._id === this.props.match.params.id) {
            return this.setState({watching: "Watching", isWatching: true});
          } 
        }) : this.setState({watching: "Watch", isWatching: false})
      });
  }

  deleteNote = (articleId, noteId) => {
    let data = {noteId};
    API.removeNote(articleId, data)
        .then(() => (
            API.getArticleById(articleId)
                .then(result => this.setState({article: result.data}))
        ));
  }

  handleWatch = articleId => {
    let data = {articleId};
    API.getSavedArticles(this.props.user._id)
      .then(result => {
        const { savedArticles } = result.data;
        let notInDatabase = 0;
        if (savedArticles.length !== undefined) {
          savedArticles.map(article => {
            (article._id !== articleId) ? notInDatabase++ : notInDatabase;
          });

          if (notInDatabase === savedArticles.length) { 
            API.addSavedArticle(this.props.user._id, data)
              .then(result => console.log(result))
              .catch(err => console.log(err));
            this.setState({watching: "Watching", isWatching: true});
          } 
        } else {
          if (savedArticles._id !== articleId)  {
            API.addSavedArticle(this.props.user._id, data)
              .then(result => console.log(result))
              .catch(err => console.log(err));
            this.setState({watching: "Watching", isWatching: true}); 
          } 
        }
      });
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
                <Row>
                  <Col size="md-10">
                    <h1>Article</h1>
                  </Col>
                  <Col size="md-2">
                  {(this.state.isWatching === false) ? <SaveBtn className="btn btn-lg btn-warning text-dark" onClick={() => this.handleWatch(this.props.match.params.id)}>{this.state.watching}</SaveBtn>
                    : <SaveBtn className="btn btn-lg btn-warning text-dark">{this.state.watching}</SaveBtn>
                  }
                  </Col>
                </Row>
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
                    <Row>
                      <Col size="md-1"></Col>
                      <Col size="md-3">
                        <Link to="/articles">
                          <FormBtn bgColor="bg-info text-light">Articles</FormBtn>
                        </Link>
                      </Col>
                      <Col size="md-6"></Col>
                      <Col size="md-2">
                        <FormBtn bgColor="bg-success text-light" onClick={this.handleFormSubmit}>Add</FormBtn>
                      </Col>
                    </Row>
            </form> 
            </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Detail;
