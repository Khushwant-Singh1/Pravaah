import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const Box_content = [
    {
      icon: './aius.jpg',
      toLink: '/login',
    },
    {
      icon: './aius.jpg',
      toLink: '/weather',
    },
    {
      icon: './aius.jpg',
      toLink: '/contact',
    },
    {
      icon: './aius.jpg',
      toLink: '/ppt',
    },
  ];

  return (
    <div className="flex w-20 bg-blue-200 h-screen fixed">
      <ul className="h-full mt-4">
        <li>
          <img
            className="w-full"
            src="./Namami_Gange_Logo_English-removebg-preview.png"
            alt="Logo"
          />
        </li>
        <div className='flex flex-col gap-10 mt-20 justify-center items-center'>
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
    <div className="w-10 bg-blue-100 h-10">
      <Link to={toLink}>
        <img className="w-full h-full" src={icon} alt="icon" />
      </Link>
    </div>
  );
};