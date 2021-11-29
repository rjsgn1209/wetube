import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  console.log(typeof String(video.owner), typeof _id);
  if (!user || String(video.owner) !== user._id) {
    return res.status(403).redirect("/");
  }
  res.render("edit", { pageTitle: "Edit Video", video });
};

export const postEdit = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  if (!user || String(video.owner) !== user._id) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload Video" });

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const { path: videoUrl } = req.file;
  try {
    let video = await Video.create({
      title,
      videoUrl,
      description,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    video = await video.populate("owner");
    const user = video.owner;
    user.videos.push(video._id);
    user.save();
    req.session.user = user;
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const video = await Video.findById(id);
  const dbUser = await User.findById(video.owner);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (!user || String(video.owner) !== user._id) {
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndDelete(id);
  const filterUsers = dbUser.videos.filter((video) => String(video) !== id);
  dbUser.videos = filterUsers;
  dbUser.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: keyword,
    }).populate("owner");
  }

  res.render("search", { pageTitle: "Search", videos });
};
