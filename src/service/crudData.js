export const ProductService = {
    getProductsData() {
        return [
            // {
            //     id: '',
            //     code: '',
            //     name: '',
            //     description: '',
            //     image: '',
            //     price: 0,
            //     category: '',
            //     quantity: 0,
            //     inventoryStatus: '',
            //     rating: 4
            // },
            // {
            // }
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};
