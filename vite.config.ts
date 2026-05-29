import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import babel from 'vite-plugin-babel';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/ai-learning-notebook-v1/' : '/',
    plugins: [
        react(),
        command === 'serve' &&
            babel({
                include: /\.[jt]sx?$/,
                babelConfig: {
                    presets: [['@babel/preset-typescript', { isTSX: true, allExtensions: true }]],
                    plugins: [
                        [
                            '@locator/babel-jsx/dist',
                            {
                                env: 'development',
                            },
                        ],
                    ],
                },
            }),
        tailwindcss(),
    ],
    // server: {
    //     host: '0.0.0.0',
    //     port: 5173,
    //     strictPort: true,
    // },
}));
