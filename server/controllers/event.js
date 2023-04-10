import Event from "../models/Event.js";
export const createEvent = async (req, res, next) => {
  let event = new Event(req.body);
  try {
    await event.save();
    res.status(200).send({event:"Event created successfully"});
  } catch (err) {
    next(err.message);
  }
};


export const updateEvent = async (req, res, next) => {
  await Event.findOne({ _id: req.params.id })
    .populate("postedBy", "_id")
    .then((post) => {
      if (post.postedBy._id.toString() === req.user.id.toString()) {
        post
          .updateOne({ $set:req.body}, { new: true })
          .then((result) =>{return res.json(result)})
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};


export const deleteEvent = async (req, res, next) => {
  await Event.findOne({ _id: req.params.id })
    .populate("postedBy", "_id")
    .then((post) => {
      if (post.postedBy._id.toString() === req.user.id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            next(err.message);
          });
        }
    })
    .catch((err) => next(err.message));
};

export const getEvents = async (req, res, next) => {
  try {
    let event = await Event.find()
      .populate("postedBy", "username")
      .populate("comments.postedBy", "username")
      .populate("joinEvent", "username");

    res.status(200).json(event);
  } catch (err) {
    next(err.message);
  }
};

export const getEvent = async(req,res,next)=>{
  try{
    let event = await Event.findById({_id:req.params.id})
      .populate("postedBy", "username")
      .populate("comments.postedBy", "username")
      .populate("joinEvent", "username");
    res.status(200).json(event);
  }catch(err){
    next(err.message);
  }
}


export const createComment = async (req, res, next) => {
  await Event.findByIdAndUpdate(
  req.body.id,
    {
      $push: { comments: { comment: req.body.commentValue, postedBy: req.user.id } },
    },
    { new: true }
  )
    .populate("comments.postedBy", "username")
    .then((result) => {
      res.status(200).send({
        message: result,
      });
    })
    .catch((err) => next(err.message));
};

export const deleteComment = async (req, res, next) => {
  if (req.body.commentPostedBy === req.user.id) {
    await Event.findByIdAndUpdate(
      {_id:req.body.eventId},
      { $pull: { comments: { comment: req.body.value } } },
      { new: true }
    ).then((result) => {
        return res.status(400).json({
          message: result,
        });
      })
      .catch((err) => next(err.message));
  }
};


export const joinEvent = async(req, res,next) => {
  await Event.findByIdAndUpdate(
    {_id:req.body.eventId},
    { $push: { joinEvent: req.user.id},
    $inc : {numberOfPlayer : -1} },
    { new: true }
  ).populate("joinEvent","username")
  .then((result) => {
        return res.status(400).json({
          message: result.message,
        });
    }).catch((err)=>next(err.message));
};


