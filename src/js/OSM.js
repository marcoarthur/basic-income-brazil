/**
 * OSM represents Open Street Map service.
 *
 * @exports OSM 
 * @class OSM
 */

export default class OSM {

	constructor() {
		this._api = new URL('https://www.overpass-api.de/api/interpreter');
	}

	/**
	 * query() call OSM interpreter.
	 *
	 * @memberof OSM
	 * @param {String} area: the name of city/state/country to run the query
	 */
	query( area ) {
		return fetch( this._build_query(area) );
	}

	/*
	 * _build_query() builds an OSM link to query OSM the INSS buildings
	 * of a city.
	 *
	 * @memberof OSM
	 * @param {String} city: the name of the city/state/country to run build the
	 * query.
	 * @see this.query()
	 *
	 */
	_build_query( city ) {

		let params = new URLSearchParams();

		let q = `
		[out:json];
		area[name="${city}"];
		way[building=public][name = "INSS"];
		out center;
		`;
		params.append("data", q);

		return this._api + "?" + params.toString();
	}
}
