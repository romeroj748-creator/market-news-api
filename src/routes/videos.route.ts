import express, { Request, Response } from "express";
const router = express.Router();
import { YoutubeFile } from "./../data/youtube/youtube-file.data";

const youtubeFile = new YoutubeFile();

router.get("/list", (req: Request, res: Response) => {
  console.log("Hello");
  youtubeFile
    .readYoutubeVideosFromFile()
    .then(videos => {
      console.log(videos);
      res.status(200).send(videos);
    })
    .catch(error => {
      console.log("Error occured");
      console.log(error);
      res.status(400).send(error);
    });
});

module.exports = router;
