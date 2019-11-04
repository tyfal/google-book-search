import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    authors: [],
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", authors: [], description: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.authors,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>What Books Should I Read?</h1>
        </Jumbotron>
        <form>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Title (required)"
          />
          <Input
            value={this.state.authors}
            onChange={this.handleInputChange}
            name="author"
            placeholder="Author (required)"
          />
          <TextArea
            value={this.state.synopsis}
            onChange={this.handleInputChange}
            name="synopsis"
            placeholder="Synopsis (Optional)"
          />
          <FormBtn
            disabled={!(this.state.author && this.state.title)}
            onClick={this.handleFormSubmit}
          >
            Submit Book
              </FormBtn>
        </form>
      </Container>
    );
  }
}

export default Books;
