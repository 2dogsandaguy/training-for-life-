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
            <h2>Investments</h2>
            {data.me.investments.length > 0 ? (
              <ul>
                {data.me.investments.map((investment) => (
                  <li key={investment._id}>
                    <strong>Type:</strong> {investment.type}<br />
                    <strong>Amount:</strong> ${investment.amount}<br />
                    <strong>URL:</strong> <a href={investment.url} target="_blank" rel="noopener noreferrer">{investment.url}</a><br />
                    <strong>Date:</strong> {investment.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No investments yet. Start adding your investments!</p>
            )}
          </section>
        </Link>

        <Link to="/Journal">
          <div className="outline">
            <h2>Journal</h2>
            {data.me.journals.length > 0 ? (
              <ul>
                {data.me.journals.map((journal) => (
                  <li key={journal._id}>
                    <p>{journal.journal}</p>
                    <p><strong>Date:</strong> {journal.createdAt}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No journal entries yet.</p>
            )}
          </div>
        </Link>

        <Link to="/Bills">
          <div className="outline">
            <h2>Bills</h2>
            {data.me.bills.length > 0 ? (
              <ul>
                {data.me.bills.map((bill) => (
                  <li key={bill._id}>
                    <strong>Category:</strong> {bill.category || bill.customCategory}<br />
                    <strong>Amount:</strong> ${bill.amount}<br />
                    <strong>Date:</strong> {bill.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bills yet.</p>
            )}
          </div>
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
