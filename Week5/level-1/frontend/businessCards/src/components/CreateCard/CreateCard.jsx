import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCard() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [interests, setInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can add more robust client-side validation here if needed

    try {
      const response = await axios.post('http://localhost:3000/cards', {
        name,
        description,
        linkedin,
        twitter,
        interests: interests.split(',').map(interest => interest.trim()) // Convert comma-separated string to array
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Or get from cookie
        }
      });

      console.log('Card created successfully:', response.data);
      setErrorMessage(null); // Clear any previous errors
      
      navigate('/cards');

    } catch (error) {
      console.error('Error creating card:', error);

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while creating the card.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Create New Card</h3>
            </div>
            <div className="card-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    rows="3" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="linkedin" className="form-label">LinkedIn (Optional):</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    id="linkedin" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="twitter" className="form-label">Twitter (Optional):</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    id="twitter" 
                    value={twitter} 
                    onChange={(e) => setTwitter(e.target.value)} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="interests" className="form-label">Interests (comma-separated):</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="interests" 
                    value={interests} 
                    onChange={(e) => setInterests(e.target.value)} 
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">Create Card</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;