module.exports = ({ env }) => ({
    url: env("RENDER_EXTERNAL_URL"),
    database: {
        connection: {
            filename:  "D:/data/public", // Adjust the path and database name as needed
        },
    },
