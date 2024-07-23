const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
    name: {type: String, required : true},
    email: {type: String, required: true, unique: true},
    borrowedBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}],
    borrowedComputers: {type: mongoose.Schema.Types.ObjectId,validate: {
        validator: function(v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }, ref: 'computer'}
});

module.exports = mongoose.model('Borrower', borrowerSchema);