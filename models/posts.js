const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'post must belongs to the user'],
    },
    content: {
      type: String,
      required: [true, 'please provide content'],
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//virtual populate
PostSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'comments',
    select: 'content -post',
  });
  next();
});

const post = mongoose.model('Post', PostSchema);
module.exports = post;
