import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                realisation: resolve(__dirname, 'Réalisation.html'),
                contact: resolve(__dirname, 'Contact.html'),
                engagements: resolve(__dirname, 'Engagements.html'),
                service: resolve(__dirname, 'Service.html'),
                produits: resolve(__dirname, 'produits.html'),
                faq: resolve(__dirname, 'FAQ.html'),
            },
        },
    },
};
