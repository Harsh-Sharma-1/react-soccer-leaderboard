import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import './Schedule.scss';

const Schedule = () => {
    const { data } = useContext(AppContext);
    const matches = data ? data.getMatches() : [];

    const Row = ({ item }) => {
        return (
            <tr>
                <td>
                    {new Date(item.matchDate).toLocaleDateString()}{' '}
                    {new Date(item.matchDate).getHours()}:
                    {new Date(item.matchDate).getMinutes()}
                </td>
                <td>{item.stadium}</td>
                <td className='bold'>
                    <div className='homeTeam'>
                        <p> {item.homeTeam} </p>
                        <img
                            src={`https://flagsapi.codeaid.io/${item.homeTeam}.png`}
                            alt=''
                        />
                    </div>
                </td>
                <td className='score bold'>{`${item.homeTeamScore} : ${item.awayTeamScore}`}</td>
                <td className='bold'>
                    <div className='awayTeam'>
                        <img
                            src={`https://flagsapi.codeaid.io/${item.awayTeam}.png`}
                            alt=''
                        />
                        <p> {item.awayTeam} </p>
                    </div>
                </td>
            </tr>
        );
    };
    return (
        <div className='schedule'>
            <h1>League Schedule</h1>
            <table cellSpacing='0' cellPadding='0'>
                <thead>
                    <tr>
                        <th className='tableDateTime'>Date/time</th>
                        <th className='tableStadium'>Stadium</th>
                        <th className='homeTeamHeader'>Home Team</th>
                        <th className='tableScore'></th>
                        <th className='awayTeamHeader'>Away Team</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((item, i) => (
                        <Row key={i} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
