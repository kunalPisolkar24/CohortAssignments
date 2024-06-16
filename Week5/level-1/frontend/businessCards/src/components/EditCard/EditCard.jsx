import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditCard() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [twitter, setTwitter] = useState("");
    const [interests, setInterests] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            setIsLoading(true); // Start loading
            try {
                const response = await axios.get(`http://localhost:3000/cards/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const cardData = response.data.card; 
                setName(cardData.name);
                setDescription(cardData.description);
                setLinkedin(cardData.linkedin || "");
                setTwitter(cardData.twitter || "");
                setInterests(cardData.interests ? cardData.interests.join(", ") : ""); // Check if interests exist
            } catch (error) {
                console.error("Error fetching card: ", error);
                setErrorMessage("Failed to fetch card.");
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchCard();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/cards/${id}`, {
                name,
                description,
                linkedin,
                twitter,
                interests: interests.split(",").map((interest) => interest.trim())
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("Card updated successfully");
            setErrorMessage(null);
            navigate("/cards");
        }
        catch (error) {
            console.error("Error updating card: ", error);
            if (error.response && error.response.data && error.response.data.message)
                setErrorMessage(error.response.data.message);
            else
                setErrorMessage("An error occurred while updating the card.");
        }
    };

    if (isLoading)
        return <div>Loading...</div>;

    if (errorMessage)
        return <div className="alert alert-danger">{errorMessage}</div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">

                        <div className="card-header">
                            <h3 className="text-center">Edit Card</h3>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name: </label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description: </label>
                                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="linkedin" className="form-label">LinkedIn (Optional): </label>
                                    <input type="text" className="form-control" id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="twitter" className="form-label">Twitter (Optional): </label>
                                    <input type="text" className="form-control" id="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="interests" className="form-label">Interests (comma-separated): </label>
                                    <input type="text" className="form-control" id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} />
                                </div>

                                <button type="submit" className="btn btn-primary w-100"> Update Card</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default EditCard;