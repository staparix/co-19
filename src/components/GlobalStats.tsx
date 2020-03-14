import * as React from "react";
import { Table } from "react-bootstrap";
type Response = {
  cases: number;
  deaths: number;
  recovered: number;
};

function useGlobalStats() {
  const [data, setData] = React.useState<Response>({
    recovered: 0,
    deaths: 0,
    cases: 0
  });

  React.useEffect(() => {
    window
      .fetch("https://coronavirus-19-api.herokuapp.com/all")
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return data;
}

export const GlobalStats: React.FC = () => {
  const globalData = useGlobalStats();
  return (
    <Table variant="dark">
      <table>
        <thead>
          <tr>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{globalData.cases}</td>
            <td>{globalData.deaths}</td>
            <td>{globalData.recovered}</td>
          </tr>
        </tbody>
      </table>
    </Table>
  );
};
