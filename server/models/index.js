import mongoose from "mongoose";
import User from "./user";
// import Attendance from "./attendance";
// import Submission from "./submission";
// import Assignment from "./assignment";
// import Session from "./session";
// import Checkpoint from "./checkpoint";
// import CheckpointScore from ".checkpointscore";

const db = {
    connect: (uri) => {
        mongoose.connect(uri);

        mongoose.Promise = global.Promise;

        mongoose.connection.on("error", (err) => {
            console.error(`Mongoose connection error: ${err}`);
            process.exit(1);
        })
    },

    User: User,
    // Attendance: Attendance,
    // Submission: Submission,
    // Assignment: Assignment,
    // Session: Session,
    // Checkpoint: Checkpoint,
    // CheckpointScore: CheckpointScore
}

export default db;