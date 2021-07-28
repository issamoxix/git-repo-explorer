import React from "react";
import "../scss/components/card.scss";
import Button from "./Button";
function Card({ title, desc, img, stars, iss, ts }) {
  let image = img;
  return (
    <div className="card-container">
      <div
        className="card-avatar"
        style={{
          background: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="card-infos">
        <div className="card-title">
          <h1> {title} </h1>
        </div>
        <div className="card-desc">
          <h4> {desc} </h4>
        </div>
        <div className="card-footer">
          <div className="card-buttons">
            <Button label={`Stars: ${stars}`} />
            <Button label={`Issues: ${iss}`} />
          </div>
          <div className="card-timestamp">
            <h5>{ts}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
