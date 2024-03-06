import express from 'express';
var router = express.Router();

router.get('/myIdentity', function (req, res, next) {
    if (req.session.isAuthenticated) {
        res.json({
            status: "loggedin",
            userInfo: {
                name: req.session.account.name,
                username: req.session.account.username
            }
        })
    } else {
        res.json({ status: "loggedout" })
    }
});

router.post('/', async (req, res, next) => {
    if (req.session.isAuthenticated) {
        // to add a user to user schema
        const { name, username } = req.body;
        console.log(name)
        console.log(username)
        try {
            let user = await req.models.User.findOne({ username: username })
            if (!user) {
                user = new req.models.User({ name, username })
            }
            await user.save()
        } catch (error) {
            console.log(error)
            res.send(500).json({ "status": "error", "error": error })
        }
    }

})



export default router;