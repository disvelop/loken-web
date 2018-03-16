import { h, Component } from 'preact';
import style from './style';
import { REGIONS, REALMS } from './data';

export default class Search extends Component {
	onRegion = e => {
		console.debug(e);
	};

	onRealm = e => {
		console.debug(e);
	};

	onQuery = e => {
		console.debug(e);
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
				<input type="search" placeholder="Character name" autocomplete="off" />
				<button onClick={this.onQuery}>Go</button>
			</div>
		);
	}
}
