import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import './LeaderBoard.scss';

const LeaderBoard = () => {
    const { data } = useContext(AppContext);
    const leaderBData = data ? data.getLeaderboard() : [];
    console.log(leaderBData);

    const Row = ({ item }) => {
        return (
            <tr>
                <td className='bold'>
                    <div className='teamName'>
                        <img
                            src={`https://flagsapi.codeaid.io/${item.teamName}.png`}
                            alt=''
                        />
                        <p> {item.teamName} </p>
                    </div>
                </td>

                <td>{item.matchesPlayed}</td>
                <td className='tableGF'>{item.goalsFor}</td>
                <td className='tableGD'>
                    {Math.abs(item.goalsFor - item.goalsAgainst)}
                </td>
                <td className='tableGA'>{item.goalsAgainst}</td>
                <td>{item.points}</td>
            </tr>
        );
    };

    return (
        <div className='leaderboard'>
            <h1>League Standings</h1>
            <table cellSpacing='0' cellPadding='0'>
                <thead>
                    <tr>
                        <th className='tableName'>TeamName</th>
                        <th className='tableMP'>MP</th>
                        <th className='tableGF'>GF</th>
                        <th className='tableGD'>GD</th>
                        <th className='tableGA'>GA</th>
                        <th className='tablePoints'>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBData.map((item, i) => (
                        <Row key={i} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderBoard;
