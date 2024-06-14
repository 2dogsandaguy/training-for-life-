import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";
import Sky from "../../../public/images/perfect-sky.jpg";
import { GET_ME } from "../../utils/queries";

const Profile = () => {
  const location = useLocation();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <div
      className="create-container"
      style={{
        backgroundImage: `url(${Sky})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflowY: "auto",
      }}
    >
      <div>
        <h1>Life Organizer! UnSuck your life?</h1>
        <h1 className="heading">Welcome {data?.me.username}!</h1>
        <button className="logout" onClick={handleLogout}>
          <span>Log Out</span>
        </button>
        <Link to="/Investment">
          <section className="outline">
            Investment
            <li>nivida</li>
            <li>microsoft</li>
            <li>Robinhood</li>
            <li>Webull</li>
          </section>
        </Link>
        <Link to="/Journal">
          <div className="outline">
            Journal
            <p> good day </p>
          </div>
        </Link>
        <Link to="/Bills">
          <div className="outline">Bills</div>
        </Link>
        <Link to="/seclude">
          <div className="outline">Seclude</div>
        </Link>
        <Link to="/Goals">
          <div className="outline">Dreams/Goals</div>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
