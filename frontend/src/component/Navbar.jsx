import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const Box_content = [
    {
      icon: './icons/home.png',
      toLink: '/',
    },
    {
      icon: './icons/weather.png',
      toLink: '/weather',
    },
    {
      icon: './icons/chat.png',
      toLink: '/chat',
    },
    {
      icon: './icons/user.png',
      toLink: '/login',
    },
  ];

  return (
    <div className="flex w-20  h-screen fixed isolate aspect-video  bg-white/20 shadow-lg ring-1 ring-black/10">
      <ul className="h-full mt-4">
        <li>
          <img
            className="w-full"
            src="./main_logo.png"
            alt="Logo"
          />
        </li>
        <div className='flex flex-col gap-12 mt-20 justify-center items-center'>
          {Box_content.map((con, index) => (
            <Box key={index} icon={con.icon} toLink={con.toLink} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

const Box = ({ icon, toLink }) => {
  return (
    <div className="w-8 h-8">
      <Link to={toLink}>
        <img className="w-full h-full" src={icon} alt="icon" />
      </Link>
    </div>
  );
};