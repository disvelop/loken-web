import { h, Component } from 'preact';
import ZapIcon from 'preact-feather/dist/icons/zap';
import { isEmpty } from 'lodash';
import { REGIONS, REALMS } from './data';
import style from './style';

export default class Search extends Component {
	state = {
		region: REGIONS[0].slug,
		realm: REALMS[0].slug,
		character: null
	};

	shouldComponentUpdate() {
		return false;
	}

	onRegion = e => {
		const value = this._getSelectedValue(e);
		this.setState({ region: value });
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
		if (isEmpty(character)) {
			throw Error('hah');
		}
		console.debug(this.state);
	};

	render() {
		return (
			<div class={style.search}>
				<select onChange={this.onRegion}>
					{REGIONS.map(r => <option value={r.slug}>{r.name}</option>)}
				</select>
				<select onChange={this.onRealm}>
					{REALMS.map(r => <option value={r.slug}>{r.name}</option>)}
				</select>
				<input onInput={this.onInput} type="search" placeholder="Character name" autocomplete="off" />
				<button onClick={this.onQuery}>
					<ZapIcon />
				</button>			
			</div>
		);
	}

	_getSelectedValue(event) {
		const { target: { selectedOptions } } = event;
		const [option] = selectedOptions;
		return option.value;
	}
}
