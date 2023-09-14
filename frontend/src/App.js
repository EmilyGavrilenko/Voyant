import React from 'react';
// import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'style/Theme';

import Landing from 'components/Landing';
import Navbar from 'components/core/Navbar';
import SignIn from 'components/authentication/SignIn';
import SignUp from 'components/authentication/SignUp';
import WorldMap from 'components/map/WorldMap';
import Countries from 'components/map/Countries';
import TravelHome from 'components/travels/TravelHome';
import NewCountry from 'components/travels/NewCountry';
import CountryPage from 'components/travels/CountryPage';
import UploadImages from 'components/travels/UploadImagePage';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ClerkProviderWithRoutes />
                </QueryClientProvider>
            </ThemeProvider>
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
                <Route path='/countries' element={<Countries />} />
                <Route path='/passport' element={<TravelHome />} />
                <Route path='/new-country' element={<NewCountry />} />
                <Route path='/upload-images' element={<UploadImages />} />
                <Route path='/country/:country_id' element={<CountryPage />} />
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
