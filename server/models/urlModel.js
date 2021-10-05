const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema(
    {
        longUrl: {
            type: "string",
            required: [true, "url is invalid!"],
            trim: true,
        },
        code: String,
        shortUrl: String,
    },
    {
        timestamps: true,
    }
);

urlSchema.pre("save", function (next) {
    this.code = shortid.generate();
    this.shortUrl = `http://hitly.club/${this.code}`;
    next();
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
