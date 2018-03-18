import { h, Component } from 'preact';
import { route } from 'preact-router';
import SearchIcon from 'preact-feather/dist/icons/search';
import { isEmpty, lowerCase } from 'lodash';
import { LocalCache } from '../../utils/local-cache';
import { REGIONS } from './regions';
import style from './style';

export default class Search extends Component {
  state = {
    realms: [],
    region: lowerCase(REGIONS[0]),
    realm: null,
    character: null,
    isLoadingRealms: false
  };

  onRegion = e => {
    const value = this._getSelectedValue(e);
    this.setState({ region: lowerCase(value) });
    this._getRealms();
  };

  onRealm = e => {
    const value = this._getSelectedValue(e);
    this.setState({ realm: value });
  };

  onInput = e => {
    const { target: { value } } = e;
    this.setState({ character: value });
  };

  onQuery = e => {
    const { region, realm, character } = this.state;
    route(`/${region}/${realm}/${character}`, false);
  };

  componentDidMount() {
    this._getRealms();
  }

  render() {
    return (
      <div class={style.search}>
        <select onChange={this.onRegion}>
          {REGIONS.map(r => <option value={r}>{r}</option>)}
        </select>
        {this.state.isLoadingRealms ? (
          <div />
        ) : (
          <select onChange={this.onRealm}>
            {this.state.realms.map(r => <option value={r.slug}>{r.name}</option>)}
          </select>
        )}
        <input
          onInput={this.onInput}
          disabled={this.state.isLoadingRealms}
          value={this.state.character}
          type="search"
          placeholder="Character name"
          autocomplete="off"
        />
        <button
          onClick={this.onQuery}
          disabled={this.state.isLoadingRealms || isEmpty(this.state.character)}
        >
          <SearchIcon size={18} />
        </button>
      </div>
    );
  }

  _getSelectedValue(event) {
    const { target: { selectedOptions } } = event;
    const [option] = selectedOptions;
    return option.value;
  }

  async _getRealms() {
    this.setState({ isLoadingRealms: true });
    const region = lowerCase(this.state.region);

    let realms = LocalCache.get(region);
    let shouldCache = false;
    if (!realms) {
      const endpoint = `https://loken-api.herokuapp.com/v1/wow/realms/${region}`;
      const response = await fetch(endpoint);
      realms = await response.json();
      shouldCache = true;
    }

    this.setState({ realms, realm: realms[0].slug, isLoadingRealms: false }, () => {
      if (shouldCache) { LocalCache.set(region, realms); }
    });
  }
}
