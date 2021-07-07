// code away!
const server = require('./server.js');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

const port = 4100;
server.listen(port, () => {
    console.log(`Running : ${port}`)

})