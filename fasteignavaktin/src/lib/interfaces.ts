export interface ZipData {
	zipCode: number;
	city: string;
	neighborhood: string;
}

export interface PropertyData {
	id: number;
	price: number;
	pricePerSqMtr: number;
	realEstateValue: number;
	fireInsuranceValue: number;
	constructionYear: number;
	address: string;
	description: string;
	zip: ZipData;
	rooms: number;
	bathrooms: number;
	bedrooms: number;
	type: string;
	created: Date;
	size: number;
	latitude: number;
	longitude: number;
	image: string;
	url: string;
}

export interface SearchParams {
	latMin: number;
	latMax: number;
	lonMax: number;
	lonMin: number;
	pageNo?: number;
	orderBy: string;
	asc_desc: string;
}
