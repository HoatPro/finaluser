import React from "react";
import { Bar, Pie } from "react-chartjs-2";
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
      chartData: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Population",
            data: [56, 44],
            backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"]
          }
        ]
      },
      chartNat: {
        labels: [
          "AU",
          "BR",
          "CA",
          "CH",
          "DE",
          "DK",
          "ES",
          "FI",
          "FR",
          "GB",
          "IE",
          "IR",
          "NO",
          "NL",
          "NZ",
          "TR",
          "US"
        ],
        datasets: [
          {
            label: "Ratio Count",
            data: [7, 5, 9, 4, 3, 5, 12, 5, 5, 1, 6, 2, 13, 7, 5, 2, 2],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(255,99,132,0.6)"
            ]
          }
        ]
      }
    };
  }

  fetchData() {
    this.setState({
      isLoading: true,
      users: []
    });

    fetch("https://randomuser.me/api/?results=50&nat=us,dk,fr,gb")
      .then(response => response.json())
      .then(parsedJSON =>
        parsedJSON.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          images: `${user.picture.medium}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          phone: `${user.phone}`,
          location: `${user.location.street}, ${user.location.city}`
        }))
      )
      .then(users =>
        this.setState({
          users,
          isLoading: false
        })
      )
      .catch(error => console.log("parsing failed", error));
  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "Rate Male and Famale in 100 users",
              fontSize: 25
            },
            legend: {
              display: true,
              position: "bottom"
            },
            maintainAspecRatio: false
          }}
        />
        <Bar
          data={this.state.chartNat}
          options={{
            title: {
              display: true,
              text: "Rate Male and Famale of National in 100 users",
              fontSize: 25
            },
            legend: {
              display: true,
              position: "bottom"
            },
            maintainAspecRatio: false
          }}
        />
      </div>
    );
  }
}
export default Chart;
