export default function (session) {
  return (
    session !== null &&
    session.status === "active" &&
    +new Date(session.expirationDate) > Date.now()
  );
}
