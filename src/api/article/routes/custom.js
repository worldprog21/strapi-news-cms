module.exports = {
    routes: [
        {
            method: "GET",
            path: '/popularArticles',
            handler: 'article.popularArticles',
            config: {
                auth: false,
            }
        }
    ]
}