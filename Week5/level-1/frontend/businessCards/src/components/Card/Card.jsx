import React from "react";

export default function Card({ card }) {
    // console.log(card);
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">{card.description}</p>

                <ul className="list-group list-group-flush">
                    {card.interests.map((interest, index) => (
                        <li key={index} className="list-group-item">{interest}</li>
                    ))}
                </ul>

                <div className="mt-3">
                    {card.linkedin && (
                        <a href={card.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary me-2"> LinkedIn </a>
                    )}

                    {card.twitter && (
                        <a href={card.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info"> Twitter </a>
                    )}
                </div>
            </div>
        </div>
    );
}