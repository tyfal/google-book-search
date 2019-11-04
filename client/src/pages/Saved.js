import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Saved extends Component {

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
            .then(res => {
                this.setState({ books: res.data, title: "", authoers: [], description: "" })
            })
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Jumbotron>
                    <h1>Saved Books</h1>
                </Jumbotron>
                {
                    this.state.books.length ? (
                        <List>
                            {this.state.books.map(book => (
                                <ListItem key={book._id}>
                                    <Link to={"/books/" + book._id}>
                                        <strong>
                                            {book.title} by {book.authors}
                                        </strong>
                                    </Link>
                                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )
                }
            </Container>
        );

    }
}

export default Saved;
