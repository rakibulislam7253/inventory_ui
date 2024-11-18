import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
const BASE_URL = import.meta.env.VITE_APP_CONTROL_CENTER_URL;
const router = createRouter({
    history: createWebHistory(),
    // history: createWebHistory('/inventory_ui/'),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: 'UnitOfMeasurement',
                    name: 'unit',
                    component: () => import('../components/UnitOfMeasurement/unit.vue')
                },
                {
                    path: '/test',
                    name: 'test',
                    component: () => import('../components/text.vue')
                },
                {
                    path: 'store',
                    name: 'store',
                    component: () => import('../components/store/store.vue')
                },
                {
                    path: 'warehouseInformation',
                    name: 'warehouse',
                    component: () => import('../components/Warehouse_Information/warehouse.vue')
                },
                {
                    path: 'product/category',
                    name: 'category',
                    component: () => import('../components/Product_category/Category.vue')
                },
                {
                    path: 'product/itemInfo',
                    name: 'itemInfo',
                    component: () => import('../components/Product_category/item.vue')
                },
                {
                    path: 'supplierInformation/suppliers',
                    name: 'item',
                    component: () => import('../components/suppliers_information/Supplier.vue')
                },
                {
                    path: 'purchase_Order/purchase',
                    name: 'purchase',
                    component: () => import('../components/Purchase Order/purchaseOrder.vue')
                },
                {
                    path: 'orderReceived',
                    name: 'orderReceived',
                    component: () => import('../components/OrderReceived/orderReceived.vue')
                },
                {
                    path: 'product_requisition/requisition',
                    name: 'requisition',
                    component: () => import('../components/Product Requisition/Requition.vue')
                },
                {
                    path: 'product_requisition/purchaseIssue',
                    name: 'purchaseIssue',
                    component: () => import('../components/Product Requisition/purchaseIssue.vue')
                },
                {
                    path: 'receive_acknowledge',
                    name: 'receive_acknowledge',
                    component: () => import('../components/receive_acknowledge/Receive_Acknowledge.vue')
                },
                {
                    path: 'return_adjustment',
                    name: 'return_adjustment',
                    component: () => import('../components/Return_adjustment/return_adjustment.vue')
                },
                {
                    path: 'authorization',
                    name: 'authorization',
                    component: () => import('../components/Authorization/authorization.vue')
                }
            ]
        },

        {
            path: '/inventory_ui/login',
            name: '/login',
            beforeEnter: () => {
                window.location.href = BASE_URL + 'login';
            }
        }
    ]
});

export default router;
