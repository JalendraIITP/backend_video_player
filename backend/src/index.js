import connectDB from './db/index.js'
import { app } from './app.js'

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server listening on port: ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongodb Connection Failed: ", err)
    })