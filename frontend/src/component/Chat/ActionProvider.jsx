import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = async (message) => {
    try {
      // Send a POST request to the backend with the message data
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: message }),
      });

      // Wait for the response and parse it as JSON
      const data = await response.json();

      // Create a bot message with the response from the server
      const botMessage = createChatBotMessage(data.response); // Adjust to match response format

      // Update the chatbot state with the new message
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      // Handle errors (e.g., network failure, response issues)
      console.error('Error in handleHello:', error);

      // Optionally, send an error message to the chatbot
      const errorMessage = createChatBotMessage('Oops! Something went wrong. Please try again later.');
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
