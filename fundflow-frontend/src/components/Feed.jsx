import React, { useState } from 'react';
import './Feed.css';
import { Header } from './Header';
import { Footer } from './Footer';
import API from '../utils/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
<ToastContainer position="top-right" autoClose={1500} />


export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('http://localhost:5000/api/feedback', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         text: feedbackText,
  //       }),
  //     });

  //     if (response.ok) {
  //       alert('Thank you for your feedback!');
  //       setFeedbackText('');
  //     } else {
  //       alert('Failed to send feedback. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting feedback:', error);
  //     alert('An error occurred. Please try again later.');
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/api/feedback', {
        text: feedbackText,
      });

      // alert('Thank you for your feedback!');
      toast.success('Thank you for your feedback!')
      setFeedbackText('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('An error occurred. Please try again later.')

      // alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Header />
      <div className="feedback-container">
        <div className="feedback-card">
          <h2 className="feedback-title">Send us some feedback!</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              className="feedback-textarea"
              placeholder="Describe your issue or idea..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
            />
            <button type="submit" className="feedback-submit">
              Send Feedback
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1500} />

      <Footer />
    </>
  );
}
