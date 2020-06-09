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
    let callback = () => {
      response.send("new session(s) added");
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
        sessions: result,
      };
      response.send(data);
    };
    db.sessions.querySessionsByDateRange(callback, startDate, endDate);
  };

  const postAttendance = (request, response) => {
    console.log(request.body);
    let data = request.body;
    // check if is_present and is_late checkbox data exists
    if (!("is_present" in data)) {
      data.is_present = [""];
    } 
    if (!("is_late" in data)) {
      data.is_late = [""];
    }
    // check that all data is in array format
    for (const key in data) {
      if (!Array.isArray(data[key])) {
        let value = data[key];
        data[key] = [value];
      }
    }
    console.log(data);
    let studentIdOrder = data.student_id_order;
    let isPresent = data.is_present;
    let isLate = data.is_late;
    let remarks = data.remarks;
    let document = data.document;
    let sessionId = parseInt(data.session_id[0]);
    let callback = () => {
      response.redirect("/calendar");
    };
    db.sessions.markAttendance(
      callback,
      studentIdOrder,
      isPresent,
      isLate,
      remarks,
      document,
      sessionId
    );
  };

  return {
    newSession,
    getSessions,
    postAttendance,
  };
};
