import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import "./cardItem.css";

const CardItem = ({ title, text, img, githubLink }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="card-item d-flex align-items-stretch"
      style={{
        backgroundImage: `url('https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010125.jpg?t=st=1725975691~exp=1725979291~hmac=5bb9d0e3d958822eda5e55387da8ae629b5ff633b92c297a20a922375800634f&w=996')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          backgroundColor: "transparent",
          border: "none",
          minHeight: "350px",
        }}
        className="w-100"
      >
        <div className="card-img-container">
          <Card.Img
            variant="top"
            src={img}
            className="img-fluid"
            style={{ height: "350px", objectFit: "cover" }}
          />
        </div>
        <Card.Body className="text-color d-flex flex-column">
          <Card.Title className="text-white">{title}</Card.Title>
          <Card.Text className="text-white card-text">
            {isExpanded
              ? text
              : text.slice(0, 50) + (text.length > 50 ? "..." : "")}
          </Card.Text>
          {text.length > 50 && (
            <Button
              className="text-decoration-none mb-4 efect-buton bg-transparent"
              variant="link"
              onClick={toggleText}
            >
              {isExpanded ? "Ver menos" : "Ver más"}
            </Button>
          )}
          <Button
            className="text-white efect-buton bg-transparent"
            variant="light"
            href={githubLink}
            target="_blank"
          >
            <FaGithub /> GitHub
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardItem;
