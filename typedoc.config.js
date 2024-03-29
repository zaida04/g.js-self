module.exports = {
    exclude: ['**/node_modules/**', '**/dist/**', '**/types/**', '**/@types/**'],
    excludeExternals: true,
    excludeNotExported: true,
    'external-modulemap': '.*packages/([^/]+)/.*',
    ignoreCompilerErrors: true,
    media: 'media',
    mode: 'modules',
    name: 'Guilded.JS',
    out: 'docs',
    preserveConstEnums: true,
    readme: 'README.md',
    stripInternal: true,
    theme: 'minimal',
    tsconfig: 'tsconfig.base.json',
};
