import React, { useState } from "react";
import "../scss/components/card.scss";
import Button from "./Button";
import InfoCard from "./InfoCard";
function Card({ infos, loading = false }) {
  infos = { infos }.infos;
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div
      className="card-container"
      onMouseEnter={() => setActive(!active)}
      onMouseLeave={() => setActive(!active)}
      // onClick={() => setActive(!active)}
      onClick={() => setShow(!show)}
    >
      {active && (
        <InfoCard data={infos} show={false} key={infos.id} active={setActive} />
      )}
      {show && (
        <InfoCard
          data={infos}
          show={show}
          key={parseInt(infos.id) + 1}
          active={setShow}
        />
      )}
      <div
        className="card-avatar "
        style={{
          background: loading
            ? "linear-gradient(-90deg, #f0f0f0 0%, #c7c6c6 50%, #f0f0f0 100%)"
            : `url("${infos.owner.avatar_url}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: loading && "pulse 1.2s ease-in infinite",
        }}
      ></div>
      <div className="card-infos">
        <div
          //   className="card-title"
          className={loading ? "skel" : "card-title"}
          style={{ color: loading && "transparent" }}
        >
          <h1> {infos.name} </h1>
        </div>
        <div
          //   className="card-desc"
          className={loading ? "skel" : "card-desc"}
          style={{ color: loading && "transparent" }}
        >
          <h4>
            {" "}
            {infos.description && infos.description.substring(0, 100)}...{" "}
          </h4>
        </div>
        <div className="card-footer">
          <div className="card-buttons">
            <Button
              loading={loading}
              label={`Stars: ${infos.stargazers_count}`}
            />
            <Button loading={loading} label={`Issues: ${infos.open_issues}`} />
          </div>
          <div
            // className="card-timestamp"
            className={loading ? "skel" : "card-timestamp"}
            style={{ color: loading && "transparent" }}
          >
            <h5>{infos.pushed_at}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
