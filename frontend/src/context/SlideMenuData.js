import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as LiaIcons from 'react-icons/lia';
import * as BsIcons from 'react-icons/bs';

export const SlideMenuData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    login: 'home'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    login: true
  },
  {
    title: 'Bits',
    path: '/bits',
    icon: <MdIcons.MdTaskAlt />,
    cName: 'nav-text',
    login: true
  },
  {
    title: 'Objectives',
    path: '/objectives',
    icon: <LiaIcons.LiaBullseyeSolid />,
    cName: 'nav-text',
    login: true
  },
  {
    title: 'Log Out',
    path: '/logout',
    icon: <IoIcons.IoIosLogOut />,
    cName: 'nav-text',
    login: true
  },
  {
    title: 'Register',
    path: '/register',
    icon: <BsIcons.BsPencilSquare />,
    cName: 'nav-text',
    login: false
  },
  {
    title: 'Login',
    path: '/login',
    icon: <IoIcons.IoIosLogIn />,
    cName: 'nav-text',
    login: false
  }
];