import React from "react";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      paginationData: [],
      currentPaginationData: [],
      selectedPage: 3,
      totalNumberPage: 0,
      paginationPage: 1,
      currentPageLength: 0,
    };
  }

  componentWillMount() {
    fetch("https://reqres.in/api/users?page=1&per_page=3")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var currentData = data.data.slice(0, data.per_page);
        this.setState({
          paginationData: data.data,
          currentPaginationData: currentData,
          currentPageLength: currentData.length,
          totalNumberPage: data.total_pages,
        });
      });
  }

  selectPage = (event) => {
    console.log(event.target.value);
    this.setState({ selectedPage: event.target.value });
    fetch(`https://reqres.in/api/users?page=1&per_page=${event.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // var currentData = data.data.slice(this.state.currentPageLength, data.per_page);
        // console.log(currentData);
        this.setState({ paginationData: data.data, currentPaginationData: data.data });
      });
  };

  prevFunction = () => {
    // if (this.state.paginationPage * this.state.selectedPage - this.state.selectedPage > 1) {
    fetch(`https://reqres.in/api/users?page=${this.state.paginationPage - 1}&per_page=${this.state.selectedPage}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ paginationData: data.data, currentPaginationData: data.data });
      });
    this.setState({ paginationPage: this.state.paginationPage - 1 });
    // }
  };

  nextFunction = () => {
    // if (this.state.paginationPage * this.state.selectedPage + this.state.selectedPage < 12) {
    console.log(this.state.currentPageLength);
    fetch(`https://reqres.in/api/users?page=${this.state.paginationPage + 1}&per_page=${this.state.selectedPage}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ paginationData: data.data, currentPaginationData: data.data });
      });
    this.setState({ paginationPage: this.state.paginationPage + 1 });
    // }
  };

  render() {
    console.log(this.state.paginationData);
    return (
      <div>
        <div>
          <label for="cars">Select Page::</label>
          <select onChange={this.selectPage} name="select page" id="selectPage">
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        </div>
        <div>
          <table>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {this.state.currentPaginationData.length !== 0 ? (
              this.state.currentPaginationData.map((singleData) => (
                <tr>
                  <td>{singleData.id}</td>
                  <td>{singleData.first_name}</td>
                  <td>{singleData.email}</td>
                </tr>
              ))
            ) : (
              <span>No Data Found</span>
            )}
          </table>
        </div>
        <div>
          <button onClick={() => this.prevFunction()}>Prev</button>
          <button onClick={() => this.nextFunction()}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
