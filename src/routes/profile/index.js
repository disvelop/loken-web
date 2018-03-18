import { h, Component } from 'preact';

export default class Profile extends Component {
  state = {
    profile: null,
    isLoadingData: true
  };

  componentDidMount() {
    this._getProfileData();
  }

  render() {
    return (
      <div>
        {this.state.isLoadingData ? (
          <h1>loading...</h1>
        ) : (
          <div>{JSON.stringify(this.state.profile)}</div>
        )}
      </div>
    );
  }

  async _getProfileData() {
    const { region, realm, character } = this.props;
    const endpoint = `https://loken-api.herokuapp.com/v1/analyser/${region}/${realm}/${character}`
    const response = await fetch(endpoint);
    const data = await response.json();
    this.setState({ profile: data, isLoadingData: false })
  }
}