import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

function CardList() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cards", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setCards(response.data.cards);
      } catch (error) {
        console.error("Error fetching cards: ", error);
        setError("Failed to fetch Cards.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
const currentCards = cards.length > 0 ? cards.slice(indexOfFirstCard, indexOfLastCard) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:3000/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
      });

      setCards(cards.filter(card => card._id !== cardId)); 

      if (currentPage > Math.ceil(cards.length / cardsPerPage)) {
        setCurrentPage(currentPage - 1); 
      }

    } catch (error) {
      console.error("Error deleting card:", error);
      setError("Failed to delete card."); 
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Card List</h2>

      {isLoading && <div>Loading...</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {currentCards.map(card => (
          <div key={card._id} className="col-md-4 mb-4">
            <Card card={card} />

            <button onClick={() => handleDelete(card._id)} className="btn btn-danger mt-2">
              Delete
            </button>

            <button onClick={() => navigate(`/edit/${card._id}`)} className="btn btn-primary mt-2 ms-2"> 
              Edit
            </button>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CardList;