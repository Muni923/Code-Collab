const { Room } = require('../models/room-model');

const createRoom = async (req, res) => {
    try {
        const { roomname } = req.body;
        if (!roomname) {
            return res.json({
                success: false,
                message: "Roomname required"
            })
        }
        const { _id } = req.user;

        const room = await Room.create({
            roomname,
            owner: _id,
            members: [_id]
        })
        if (room) {
            return res.json({
                success: true,
                message: "Room created"
            })
        }

    }
    catch (err) {
        return res.json({
            success: false,
            message: `Error at creating room : ${err.message}`
        })

    }

}


const joinRoom = async (req, res) => {
    try {
        const { roomname, roomid } = req.body;

        if (!roomname || !roomid) {
            return res.json({
                success: false,
                message: "All fields required"
            })
        }


        const room = await Room.findById(roomid);

        if (!room) {
            return res.json({
                success: false,
                message: "Room not found"
            })
        }
        if (room.roomname != roomname) {
            return res.json({
                success: false,
                message: "Room not found"
            })
        }


        const alreadyMember = room.members.some(
            id => id.toString() === req.user._id.toString()
        );

        if (alreadyMember) {
            return res.json({
                success: false,
                message: "Already a member"
            });
        }

        room.members.push(req.user._id);
        await room.save();

        return res.json({
            success: true,
            message: "User joined the room"
        })



    }
    catch (err) {
        return res.json({
            success: false,
            message: `Error at joining room : ${err.message}`
        })

    }

}

const leaveRoom = async (req, res) => {
    try {
        const userid = req.user._id;

        const currentRoom = await Room.findById(roomid);

        currentRoom.members = currentRoom.members.filter(
            member => member.toString() !== userid.toString()
        );

        currentRoom.save();

    }
    catch (err) {
        res.json({
            success: false,
            message: `Error at leaving room : ${err.message}`
        })
    }

}
module.exports = { createRoom, joinRoom, leaveRoom }