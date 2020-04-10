module.exports = {
  plugins: [
    `gatsby-theme-blog`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typescript`
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Baloo Chettan 2", "Droid Serif"]
        }
      }
    }
  ]
};
