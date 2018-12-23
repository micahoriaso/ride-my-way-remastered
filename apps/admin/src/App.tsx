import * as React from "react";

export interface iState {
  data: string;
}
class App extends React.Component<{}, iState> {
  state: iState = {
    data: ""
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/api");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <p className="App-intro">{data}</p>
      </div>
    );
  }
}

export default App;
