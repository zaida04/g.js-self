module.exports = {
    comments: true,
    parserOpts: { strictMode: true },
    plugins: ['babel-plugin-replace-ts-export-assignment', 'babel-plugin-const-enum'],
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'commonjs',
                targets: { node: 'current' },
            },
        ],
        '@babel/preset-typescript',
    ],
    sourceMaps: 'inline',
};
