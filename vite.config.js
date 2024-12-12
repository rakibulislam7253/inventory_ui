// import { fileURLToPath, URL } from 'node:url';

// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';

// // https://vitejs.dev/config/
// export default defineConfig(() => {
//     return {
//         plugins: [vue()],
//         resolve: {
//             alias: {
//                 '@': fileURLToPath(new URL('./src', import.meta.url))
//             }
//         }
//     };
// });

import { fileURLToPath, URL } from 'node:url';
import dns from 'node:dns';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
dns.setDefaultResultOrder('verbatim');
export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            chunkSizeWarningLimit: 2600
        },
        base: '/'
    };
});
