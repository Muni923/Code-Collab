const { Room } = require('../models/room-model');

const createRoom = async (req, res) => {
    try {
        const { roomname } = req.body;
        if (!roomname) {
            return res.status(400).json({
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
            return res.status(201).json({
                success: true,
                message: "Room created",
                roomid: room._id,
                username: req.user.username
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error at creating room : ${err.message}`
        })
    }
}


const joinRoom = async (req, res) => {
    try {
        const { roomname, roomid } = req.body;

        const room = await Room.findById(roomid);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        console.log("========== JOIN DEBUG ==========");
        console.log("USER ID:", req.user._id.toString());
        console.log("ROOM ID:", roomid);
        console.log(
            "MEMBERS:",
            room.members.map(member => member.toString())
        );

        const alreadyMember = room.members.some(
            member =>
                member.toString() === req.user._id.toString()
        );

        console.log("ALREADY MEMBER:", alreadyMember);

        if (alreadyMember) {
            return res.status(409).json({
                success: false,
                message: "Already a member"
            });
        }

        room.members.push(req.user._id);

        await room.save();

        console.log(
            "AFTER JOIN:",
            room.members.map(member => member.toString())
        );

        return res.status(200).json({
            success: true,
            message: "User joined the room",
            username: req.user.username
        });

    } catch (err) {
        console.log("JOIN ERROR:", err);

        return res.status(500).json({
            success: false,
            message: `Error at joining room : ${err.message}`
        });
    }
};



const leaveRoom = async (req, res) => {
    try {
        const userid = req.user._id;
        const roomid = req.body.roomid;
        const currentRoom = await Room.findById(roomid);

        currentRoom.members = currentRoom.members.filter(
            member => member.toString() !== userid.toString()
        );

        await currentRoom.save();
        res.status(200).json({
            success: true,
            message: "left room"

        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Error at leaving room : ${err.message}`
        })
    }
}


const getAllmembers = async (req, res) => {
    const roomid = req.params.roomid;
    const room = await Room.findById(roomid);
    const members = await room.populate('members', 'username');

    res.status(200).json({
        success: true,
        members: room.members
    })
}

module.exports = { createRoom, joinRoom, leaveRoom, getAllmembers }