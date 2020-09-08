const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'please provide content to post'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'comments must belongs to the user'],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'comments must belongs to the post'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CommentSchema.pre('save', function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;