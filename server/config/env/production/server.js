module.exports = ({ env }) => ({
    url: env("RENDER_EXTERNAL_URL"),
    dirs: {
      public: "/d/sqlite_data"
    },
  });
