module.exports = ({ env }) => ({
    url: env("https://dressup-8pk8.onrender.com"),
    database: {
        connection: {
            filename:  "D:/data/public", // Adjust the path and database name as needed
        },
    },
