var appRouter = function(app) {
	app.get("/admin/directory/v1/users", function(req, res) {
    res.send("{List of users}");
});
}

module.exports = appRouter;