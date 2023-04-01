import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import LeaderBoard from './pages/LeaderBoard/LeaderBoard';
import NotFound from './pages/NotFound/NotFound';
import Schedule from './pages/Schedule/Schedule';
import LeagueService from './services/LeagueService';
import './App.scss';

export const AppContext = createContext();

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            const newData = new LeagueService();
            await newData.fetchData();
            setData(newData);
        })();
    }, []);

    return (
        <AppContext.Provider
            value={{
                data,
            }}
        >
            <Navbar />
            <Switch>
                <Route path='/' exact>
                    <Schedule />
                </Route>
                <Route path='/schedule' exact>
                    <Schedule />
                </Route>
                <Route path='/leaderboard' exact>
                    <LeaderBoard />
                </Route>
                <Route path='*'>
                    <NotFound />
                </Route>
            </Switch>
            <Footer />
        </AppContext.Provider>
    );
}

export default App;
