# Code Collab

Code Collab is a real-time collaborative code editor that allows multiple users to join a shared room and edit code together.

## Screenshots

### Create / Join Room

<img width="1846" height="858" alt="image" src="https://github.com/user-attachments/assets/d3eaef6d-0486-43c0-8b42-fb624ef12600" />
<img width="1837" height="816" alt="image" src="https://github.com/user-attachments/assets/e02fb188-1615-402d-880d-b0816515c760" />


### Multiple Users Collaborating


<img width="971" height="530" alt="image" src="https://github.com/user-attachments/assets/ddbc32d0-e1c1-493d-a2f6-c420d824f986" />

### Code Editing

<img width="1886" height="889" alt="image" src="https://github.com/user-attachments/assets/4dbb96ee-dc2c-4631-8804-ead3fdc78959" />


## Features

* Real-time collaborative code editing
* Room-based collaboration
* Multiple users can join the same room
* Real-time synchronization of code changes
* User presence within collaborative rooms

## How It Works

1. Users join a room using a unique room ID.
2. A WebSocket connection is established using Socket.IO.
3. Code changes are emitted to the server in real time.
4. The server broadcasts changes to other users in the room.
5. All connected users see the updated code simultaneously.

## Tech Stack

**Frontend:** React, Vite, Axios
**Backend:** Node.js, Express.js, Socket.IO
**Communication:** WebSockets

## Live Demo

[Code Collab](https://code-collab-opal-gamma.vercel.app/)

## Author

**Muni Chaurasiya**

[GitHub](https://github.com/Muni923)
