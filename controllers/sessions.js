module.exports = (db) => {
  const newSession = (request, response) => {
    console.log(request.body);
    let data = request.body;
    let classId = data.classId;
    let startDateTime = data.startDateTime;
    let endDateTime = data.endDateTime;
    let location = data.location;
    let frequency = parseInt(data.frequency);
    let upTillDate = data.upTillDate;
    let callback = (result) => {
      console.log(result);
    };
    db.sessions.writeNewSession(
      callback,
      classId,
      startDateTime,
      endDateTime,
      location,
      frequency,
      upTillDate
    );
  };

  return {
    newSession,
  };
};
