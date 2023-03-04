const router = require("express").Router();
const Menu = require("../models/Menu");
const User = require("../models/User");


//create a menu

router.post('/', async (req, res)=>{
    const newMenu = new Menu(req.body);
    try{
        const savedMenu = await newMenu.save();
        res.status(200).json(savedMenu)
    } catch(err){
        res.status(500).json(err);
    }
})
//update a menu

router.put('/:id', async (req, res)=>{
    try{
        const menu = await Menu.findById(req.params.id);
        if(menu.userId === req.body.userId){
            await menu.updateOne({$set: req.body});
            res.status(200).json("menu updated")
        } else{
            res.status(403).json("you can update your menu only")
        }
    } catch(err){
        res.status(500).json(err);
    }
})

//delete a menu

router.delete('/:id', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post deleted")
        } else{
            res.status(403).json("you can delete your post only")
        }
    } catch(err){
        res.status(500).json(err);
    }
})

// like / dislike a post

router.put('/:id/like', async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push: {likes: req.body.userId} });
        res.status(200).json("Post Liked");
    } else{
        await post.updateOne({$pull: {likes: req.body.userId} });
        res.status(200).json("Post Disliked");

    }
    } catch (err){
        res.status(500).json(err);
    }

    
})

// get a post

router.get('/:id', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err)
    }
})

// get timeline posts

router.get('/timeline/all', async (req, res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = router;