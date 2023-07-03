const socketIds = require('../model/socketIds');

const socketHandler = (io) => {

    io.on("connection", (socket) => {
        socket.emit("me", socket.id);
        console.log('user just connected with id :' + socket.id);

        // Handle disconnect event
        socket.on("disconnect", () => {
            console.log('User disconnected with ID: ' + socket.id);
        });

        socket.on("userConnected", async ({ data }) => {
            console.log("user Connected :");
            if (!data) {
                return console.log("user id is missing ");
            }
            let existingsocketIds;
            // Check if socketIds exist ::::
            try {
                existingsocketIds = await socketIds.findOne({ userid: data });
            } catch (error) {
                console.log({ success: false, message: 'internal server error ', data: error });
            }

            if (existingsocketIds) {
                // Update socketIds::
                existingsocketIds.socketid = socket.id;
                try {
                    // await socketIds.updateOne();
                    await existingsocketIds.save();
                } catch (error) {
                    console.log(error);
                }
            } else {

                // Create a new socketIds:::
                let newsocketIds = new socketIds({
                    userid: data,
                    socketid: socket.id
                });

                try {
                    await newsocketIds.save();
                } catch (error) {
                    return;
                }
            }


        });

        socket.on("alertUser", ({ userID, data }) => {
            console.log(`socket id :   ${userID}`);
            socket.to(userID).emit("Alert", { success: true, data });
        })
    });

};

module.exports = socketHandler;