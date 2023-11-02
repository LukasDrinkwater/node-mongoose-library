const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// better way of doing the time
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  // console.log(DateTime.fromJSDate(this.date_of_birth));
  // console.log(
  //   DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
  // );
  if (this.date_of_birth !== undefined) {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  } else {
    return "";
  }
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  // console.log(
  //   `ITS ${this.first_name} ----- ${DateTime.fromJSDate(this.date_of_death)}`
  // );

  // console.log(
  //   DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
  // );
  if (this.date_of_death !== undefined) {
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  } else {
    return "";
  }
});

// Export model
// This is that you use to actually request for the data
module.exports = mongoose.model("Author", AuthorSchema);
