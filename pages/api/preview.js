export default async (req, res) => {
  console.log("Hello");
  console.log(req.query.draftKey);

  res.setPreviewData({
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: "/" });
  res.end("Preview mode enabled");
};
