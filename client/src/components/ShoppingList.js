import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { deleteItem, getItems } from "../actions/ItemActions";

import io from "socket.io-client";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let that = this;
    let socket = io("/");
    socket.on("list-updated", function () {
      that.props.getItems();
    });
  }

  handleDelete = (id) => {
    this.props.deleteItem(id);
    let socket = io();
    socket.emit("connect");
  };
  render() {
    const { items } = this.props.itemData;

    return (
      <Container>
        <ListGroup className="mb-5">
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={1000} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => this.handleDelete(_id)}
                    >
                      &times;{/*Delete button*/}
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToPorps = (state) => {
  return {
    itemData: state.item,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapdispatchToPorps = (dispatch) => {
  return {
    getItems: () => dispatch(getItems()),
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};

export default connect(mapStateToPorps, mapdispatchToPorps)(ShoppingList);
