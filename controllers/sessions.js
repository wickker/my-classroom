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

  const getSessions = (request, response) => {
    console.log("query: ", request.query);
    let startDate = parseInt(request.query.startDate);
    let endDate = parseInt(request.query.endDate);
    let callback = (result) => {
      console.log(result);
      let data = {
        sessions: result
      };
      response.send(data);
    }
    db.sessions.querySessionsByDateRange(callback, startDate, endDate);
  }

  return {
    newSession,
    getSessions,
  };
};
