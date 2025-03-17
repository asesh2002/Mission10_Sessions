import { useEffect, useState } from 'react';
import { bowler } from './types/bowler';

function BowlerList() {
  const [bowlers, setBowlers] = useState<bowler[]>([]);

  useEffect(() => {
    const fetchBowler = async () => {
      const response = await fetch('https://localhost:5001/api/Bowlers');
      const data = await response.json();
      setBowlers(data);
    };
    fetchBowler();
  }, []);

  return (
    <>
      <h1>Bowler Information</h1>
      <table>
        <thead>
          <tr>
            <th>Bowler Name</th>
            <th>Bowler Address</th>
            <th>Bowler Phone</th>
            <th>Bowler Team</th>
          </tr>
        </thead>
        <tbody>
          {bowlers
            .filter((b) => b.teamName === 'Marlins' || b.teamName === 'Sharks') // Now filtering by team name
            .map((b) => (
              <tr key={b.bowlerId}>
                <td>
                  {b.bowlerFirstName}, {b.bowlerMiddleInit}, {b.bowlerLastName}
                </td>
                <td>{b.teamName}</td> {/* Now correctly displaying team name */}
                <td>
                  {b.bowlerAddress} {b.bowlerCity}, {b.bowlerState}{' '}
                  {b.bowlerZip}
                </td>
                <td>{b.bowlerPhoneNumber}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default BowlerList;
