const catchAsync = require("../utils/catchAsync");
const Url = require("./../models/urlModel");
const AppError = require("../utils/AppError");
module.exports = {
  getAllUrls: catchAsync(async (req, res, next) => {
    const urls = await Url.find();

    res.status(200).json(urls);
  }),

  getUrl: catchAsync(async (req, res, next) => {
    const url = await Url.findOne({ code: req.params.code });

    if (!url) return next(new AppError("Url not found!", 404));

    res.status(200).json(url);
  }),

  createUrl: catchAsync(async (req, res, next) => {
    const url = await Url.create(req.body);

    res.status(201).json(url);
  }),

  updateUrl: catchAsync(async (req, res, next) => {
    const url = await Url.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!url) return next(new AppError("Url not found!", 404));
    res.status(200).json(url);
  }),

  deleteUrl: catchAsync(async (req, res, next) => {
    const url = await Url.findByIdAndDelete(req.params.id);

    if (!url) return next(new AppError("Url not found!", 404));

    res.status(204).json(null);
  }),
};
