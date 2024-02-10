module.exports = ({ env }) => ({
    url: env("RENDER_EXTERNAL_URL"),
    database: {
        connection: {
            filename: 'D:/sqlite_folder/data.db', // Adjust the path and database name as needed
        },
    },
});
