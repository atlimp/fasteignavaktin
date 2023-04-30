import { gql, GraphQLClient } from 'graphql-request';
const GRAPHQL_ENDPOINT = 'https://g.mbl.is/v1/graphql';
const POSTALCODES = gql`
    {
        fs_postal_code(order_by: {postnr: asc}) {
            city: baer
            zip: postnr
            neighborhood: hverfi
        }
    }`;

const REALESTATES = gql`
    query GetRealestates($limit: Int!, $postalCodes: [smallint!], $order: [fs_fasteign_order_by!], $created: timestamptz_comparison_exp = {}) {
        fs_ts_search(args: {}, where: {_and: [{postfang: {_in: $postalCodes}, sent_dags: $created}]}, order_by: $order, limit: $limit) {
            id: eign_id
            price: verd
            realestatevalue: fasteignamat
            fireinsvalue: brunabotamat
            constryear: bygg_ar
            address: heimilisfang
            description: lysing
            zipcode: postfang
            rooms: fjoldi_herb
            bedrooms: fjoldi_svefnhb
            bathrooms: fjoldi_badherb
            type: teg_eign
            created: sent_dags
            size: fermetrar
            latitude
            longitude
            images(order_by: {imgno: asc}) {
                imgno
                id
                big
                small
            }
        }
    }`;

export async function getAllPostalCodes() {
    const client = new GraphQLClient(GRAPHQL_ENDPOINT);

    const data = await client.request(POSTALCODES);

    if (data.fs_postal_code) {
        return data.fs_postal_code;
    }

    return [];
}

export async function getRealEstates(limit = 16, postalCode, lastCreated) {
    const client = new GraphQLClient(GRAPHQL_ENDPOINT);

    const variables = {
        limit,
        postalCodes: [
            postalCode,
        ],
        created: { _gt: lastCreated },
        order: [
            {
                "sent_dags": "asc_nulls_last",
            },
        ]
    }
    const data = await client.request(REALESTATES, variables);

    if (data.fs_ts_search) {
        return data.fs_ts_search;
    }

    return [];
}
