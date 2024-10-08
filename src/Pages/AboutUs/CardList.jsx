import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardItem from './CardItem';
import './CardItem.css';

const CardList = ({ cards }) => {
  return (
    <Container>
      <h1 className="text-center my-4 card-item ">DESARROLLADORES</h1>
      <Row>
        {cards.map((card, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <CardItem title={card.title} text={card.text} img={card.img} githubLink={card.githubLink} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardList;


