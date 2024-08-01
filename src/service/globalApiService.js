// get_product_details_by_id
export async function fetchData(param1) {
    try {
        const response = await fetch(`http://10.140.6.22/inventory_api/api/Product/get_product_details_by_id?product_id=${param1}`);
        const data = response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
// Suppliers
export async function supplierData(param1) {
    try {
        const response = await fetch(`http://10.140.6.22/inventory_api/api/Suppliers/get_suppliers_info_by_id?suppliers_id=${param1}`);
        const data = response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
