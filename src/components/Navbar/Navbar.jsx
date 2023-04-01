import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import './Navbar.scss';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='logo'>
                <Link to='/'>
                    <img src='/images/logo.svg' alt='' />
                </Link>
            </div>
            <div className='nav-list'>
                <Link to='/schedule'>
                    <div>
                        <img src='/images/schedule.png' alt='' />
                        <span>Schedule</span>
                    </div>
                </Link>
                <Link to='/leaderboard'>
                    <div>
                        <img src='/images/leaderboard.png' alt='' />
                        <span>Leaderboard</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
