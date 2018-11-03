import React from "react";
import CardBtn from "../CardBtn";
import { Row, Col } from "../Grid";
import DeleteBtn from "../../components/DeleteBtn";

export const SavedCard = props => (
  <div className="card my-2">
    <div className="card-header text-center">
      <Row>
        <Col size="md-10">
          <h5><a href={props.url}>{props.headLine}</a></h5>
        </Col>
        <Col size="md-2">
          <CardBtn id={props.id} content="Notes" data-value={props.id} href="/notes"/>
          <DeleteBtn onClick={props.removeArticle}/>
        </Col>
      </Row>
    </div>
    <div className="card-body">
      {props.summary}
    </div>
  </div>
);


