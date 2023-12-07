module.exports = {
    async afterUpdate(event) {
        const data = event.result;

        if (data && data.isApproved) {
            const entry = await strapi.entityService.findOne("api::comment.comment", data.id, {
                populate: {
                    user: true,
                    article: true
                }
            })

            if (entry?.user?.id) {
                await strapi.plugins["email"].services.email.send({
                    to: entry.user.email,
                    subject: "Your comment was approved",
                    text: `Hello ${entry.user.username}, \n\n Your comment on the article ${entry?.article?.title} was approved. Best,\n Your Team`
                })
            }
        }
    }
}