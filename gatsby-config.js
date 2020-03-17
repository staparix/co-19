module.exports = {
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`
        },
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Baloo Chettan 2', 'Droid Serif']
                }
            }
        }
    ],
};
