import './Navbar.css';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='glassmorphism'></div>
            <h1 className='navbar-title'>Voyant</h1>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <a className='link' href='/sign-in'>
                    get started ✈️
                </a>
            </SignedOut>
        </nav>
    );
};

export default Navbar;
