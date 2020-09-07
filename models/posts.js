const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, 'please provide content'],
  },
  photo: {
    type: [String],
  },
});

PostSchema.pre('/^find/', function (next) {
  this.populate({
    path: 'user',
    select: 'name -__id',
  });
});

const post = mongoose.model('Post', PostSchema);
module.exports = post;
