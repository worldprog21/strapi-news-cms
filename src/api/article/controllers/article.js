'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
    async findOne(ctx) {
        const slug = ctx.params.id;

        const article = await strapi.db.query('api::article.article').findOne({
            where: { slug },
        });

        if (article) {
            const updatedArticle = await strapi.db.query('api::article.article').update({
                where: { slug },
                data: {
                    views: article.views + 1
                },
            });

            return updatedArticle
        }
    },
    async popularArticles(ctx) {
        const entries = await strapi.db.query("api::article.article").findMany({
            orderBy: { views: "DESC" },
            limit: 5,
            where: {
                views: {
                    $gt: 0
                }
            }
        });

        return entries
    }
}));
