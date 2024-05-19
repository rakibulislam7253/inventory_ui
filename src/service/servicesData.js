export const CustomerService = {
    getData() {
        return [
            {
                id: 1000,
                name: 'James Butt',
                country: {
                    name: 'Algeria',
                    code: 'dz'
                },
                company: 'Benton, John B Jr',
                date: '2015-09-13',
                status: 'unqualified',
                verified: true,
                activity: 17,
                uom: 'kg',
                representative: {
                    name: 'Ioni Bowcher',
                    image: 'ionibowcher.png'
                },
                balance: 70663
            },
            {
                id: 1001,
                name: 'Josephine Darakjy',
                country: {
                    name: 'Egypt',
                    code: 'eg'
                },
                company: 'Chanay, Jeffrey A Esq',
                date: '2019-02-09',
                status: 'proposal',
                verified: true,
                uom: 'kg',
                activity: 0,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                },
                balance: 82429
            },
            {
                id: 1014,
                name: 'Cammy Albares',
                country: {
                    name: 'Philippines',
                    code: 'ph'
                },
                company: 'Rousseaux, Michael Esq',
                date: '2019-06-25',
                uom: 'kg',
                status: 'new',
                verified: true,
                activity: 90,
                representative: {
                    name: 'Asiya Javayant',
                    image: 'asiyajavayant.png'
                },
                balance: 30236
            },
            {
                id: 1015,
                name: 'Mattie Poquette',
                country: {
                    name: 'Venezuela',
                    code: 've'
                },
                company: 'Century Communications',
                date: '2017-12-12',
                uom: 'kg',
                status: 'negotiation',
                verified: false,
                activity: 52,
                representative: {
                    name: 'Anna Fali',
                    image: 'annafali.png'
                },
                balance: 64533
            },
            {
                id: 1016,
                name: 'Meaghan Garufi',
                country: {
                    name: 'Malaysia',
                    code: 'my'
                },
                company: 'Bolton, Wilbur Esq',
                date: '2018-07-04',
                uom: 'kg',
                status: 'unqualified',
                verified: false,
                activity: 31,
                representative: {
                    name: 'Ivan Magalhaes',
                    image: 'ivanmagalhaes.png'
                },
                balance: 37279
            },

            {
                id: 1499,
                name: 'Chauncey Motley',
                country: {
                    name: 'Argentina',
                    code: 'ar'
                },
                company: 'Affiliated With Travelodge',
                date: '2019-04-23',
                uom: 'kg',
                status: 'renewal',
                verified: true,
                activity: 42,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                },
                balance: 88090
            }
        ];
    },

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    },

    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};
