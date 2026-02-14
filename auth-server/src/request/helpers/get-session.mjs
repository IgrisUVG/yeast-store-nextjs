export default function(req, db) {
  const authHeader = req.headers['authorization'];

  if (authHeader === undefined) {
    console.error("No header provided");
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (token === undefined) {
    console.error("Incorrect header format");
    return null;
  }

  const session = db.data.sessions.find((s) => s.token === token);

  if (session === undefined) {
    return null;
  }

  return session;
}
