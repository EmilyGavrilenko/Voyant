import React from 'react';
// import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

import Landing from 'components/Landing';
import Navbar from 'components/core/Navbar';
import SignIn from 'components/authentication/SignIn';
import SignUp from 'components/authentication/SignUp';
import WorldMap from 'components/map/WorldMap';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
    return (
        <BrowserRouter>
            <ClerkProviderWithRoutes />
        </BrowserRouter>
    );
}

function ClerkProviderWithRoutes() {
    const navigate = useNavigate();

    return (
        <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
            <Routes>
                {/* <Route path='/' element={<Landing />} /> */}
                <Route path='/sign-in/*' element={<SignIn />} />
                <Route path='/sign-up/*' element={<SignUp />} />
                <Route
                    path='/'
                    element={
                        <>
                            <SignedIn>
                                <WorldMap />
                            </SignedIn>
                            <SignedOut>
                                <Landing />
                            </SignedOut>
                        </>
                    }
                />
            </Routes>
            <Navbar />
        </ClerkProvider>
    );
}

export default App;
