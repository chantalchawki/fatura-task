export default function (req, res, next) {
  let { page } = req.query;
  if (!page) {
    page = 0;
  }
  req.query.limit = 25;
  req.query.skip = page * 25;
  next();
}
