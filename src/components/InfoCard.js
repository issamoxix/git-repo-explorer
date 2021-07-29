import React from "react";
import "../scss/components/infoCard.scss";
function InfoCard({ data, active, show }) {
  //   data = { data }.data;
  return (
    <div className={`infoCard-container ${!show ? "peak" : "imbrace"}`}>
      <div className="infoCard-banner">
        <img src={data.owner.avatar_url} alt="Owner Avatar" />
      </div>
      <div className="infoCard-details">
        <h2>{data.name}</h2>
        <p>{data.description}</p>
      </div>
      <div className="footerButons">
        <button onClick={() => active(false)}>Close</button>
        <button>
          <a href={data.svn_url}>ShowMore</a>
        </button>
      </div>
    </div>
  );
}

export default InfoCard;
