module.exports = {
    EmailRecentArticles: {
        task: async ({ strapi }) => {
            const articles = await strapi.db.query("api::article.article").findMany({
                where: {
                    createdAt: {
                        $gte: new Date().getTime() - 24 * 60 * 60 * 1000
                    }
                }
            })

            const users = await strapi.plugins["users-permissions"].services.user.fetchAll();

            if (articles) {
                users?.forEach(user => {
                    const emailMessage = `Hello ${user.username},\nHere are the new articles from the last 24 hours: \n${articles.map(article => `${article.title}`).join(`\n`)}\nBest,\nYour Team`

                    // strapi.plugins["email"].services.email.send({
                    //     to: user.email,
                    //     subject: "List of new articles created within the last 24 hours",
                    //     text: emailMessage
                    // })
                })
            }
        },
        options: {
            rules: "0 0 0 * * *" // this task runs every day at midnight
        }
    }
}