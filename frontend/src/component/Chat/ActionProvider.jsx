import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = async (message) => {
    console.log(typeof(message));
    try {
      const response = await fetch('http://localhost:8080/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ data: message }), 
      });      

      const data = await response.json();

      console.log(data);

      const botMessage = createChatBotMessage(data);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.error('Error in handleHello:', error);

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
