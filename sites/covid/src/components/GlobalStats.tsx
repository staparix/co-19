import * as React from "react";
import PieChart from "react-minimal-pie-chart";

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
    <PieChart
      label={({ data, dataIndex }) => (
        `${data[dataIndex].title} - ${data[dataIndex].value}`
      )}
      labelPosition={50}
      labelStyle={{
        fontSize: "5px",
        fill: "#fff"
      }}
      data={[
        { title: "Cases", value: globalData.cases, color: "#E38627" },
        { title: "Recovered", value: globalData.recovered, color: "#C13C37" },
        { title: "Deaths", value: globalData.deaths, color: "#6A2135" }
      ]}
    />
  );
};
