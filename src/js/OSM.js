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
	 * _build_query() builds an OSM link to query public buildings that can
	 * receive documents for basic income.
	 *
	 * @memberof OSM
	 * @param {String} city: the name of the city/state/country to run build the
	 * query.
	 * @see this.query()
	 *
	 * @returns {String} url for the query.
	 */
	_build_query( city ) {

		let params = new URLSearchParams();

		let q = `
		[out:json][timeout:10];
		area[name="${city}"];
		way(area)[building=public][name ~ "INSS"];
		out center;
		`;
		params.append("data", q);

		return this._api + "?" + params.toString();
	}
}
