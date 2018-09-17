import React from "react";
import image from "../images/user-avatars-pack_23-2147502629.svg";
import Collapsible from "./Collapsible";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: []
    };
    }
    componentWillMount() {
        localStorage.getItem('users') && this.setState({
            users: JSON.parse(localStorage.getItem('users')),
            isLoading: false
        })
    }


    componentDidMount() {

        const date = localStorage.getItem('usersDate');
        const usersDate = date && new Date(parseInt(date));
        const now = new Date();

        const dataAge = Math.round((now - usersDate) / (1000 * 60)); // in minutes
        const tooOld = dataAge >= 1;

        if (tooOld) {
            this.fetchData();
        } else {
            console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
        }

    }


  fetchData() {
    this.setState({
      isLoading: true,
      users: []
    });

    fetch(
      "https://randomuser.me/api/?results=100&nat=AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US"
    )
      .then(response => response.json())
      .then(parsedJSON =>
        parsedJSON.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          images: `${user.picture.medium}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          phone: `${user.phone}`,
          location: `${user.location.street}, ${user.location.city}`,
          national: `${user.nat}`
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

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('users', JSON.stringify(nextState.users));
        localStorage.setItem('usersDate', Date.now());
    }


  render() {
    const { isLoading, users } = this.state;
    return <div>
        <header>
          <img src={image} />
          <h1>
            Random Users Data <button className="btn btn-sm btn-danger" onClick={e => {
                this.fetchData();
              }}>
              Refresh Data
            </button>
          </h1>
        </header>
        <div className={`content ${isLoading ? "is-loading" : ""}`}>
          <div className="panel-group">
            {!isLoading && users.length > 0 ? users.map(contact => {
                  const { username, images, name, email, location, phone, national } = contact;
                    return <Collapsible key={username} title={name} >
                      <p>
                        <img src={images} />
                        <br />
                        Email: {email}
                        <br />
                        PhoneNumber : {phone}
                        <br />
                        {location}
                        <br />
                        National :{national}
                      </p>
                    </Collapsible>;
                }) : null}
          </div>
          <div className="loader">
            <div className="icon" />
          </div>
        </div>
      </div>;
  }
}
export default Home;
