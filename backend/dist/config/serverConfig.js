"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
function startServer(app) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
module.exports = startServer;
