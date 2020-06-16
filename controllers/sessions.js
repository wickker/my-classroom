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

  // get sessions by date range
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

  // const postAttendance = (request, response) => {
  //   console.log(request.body);
  //   console.log('console log endssssssss');
  //   let data = request.body;
  //   // check if is_present and is_late checkbox data exists
  //   if (!("is_present" in data)) {
  //     data.is_present = [""];
  //   }
  //   if (!("is_late" in data)) {
  //     data.is_late = [""];
  //   }
  //   // check that all data is in array format
  //   for (const key in data) {
  //     if (!Array.isArray(data[key])) {
  //       let value = data[key];
  //       data[key] = [value];
  //     }
  //   }
  //   console.log(data);
  //   let classId = data.classId;
  //   let studentIdOrder = data.student_id_order;
  //   let isPresent = data.is_present;
  //   let isLate = data.is_late;
  //   let remarks = data.remarks;
  //   let document = data.document;
  //   let sessionId = parseInt(data.session_id[0]);
  //   let callback = () => {
  //     response.redirect("/attendance?classid=" + classId);
  //   };
  //   db.sessions.markAttendance(
  //     callback,
  //     studentIdOrder,
  //     isPresent,
  //     isLate,
  //     remarks,
  //     document,
  //     sessionId
  //   );
  // };

  const postAttendance = (request, response) => {
    console.log(request.body);
    let data = request.body;
    let classId = data.classId;
    console.log('in postAttendance');
    let callback = () => {
      response.send({classId});
      // response.redirect("/attendance?classid=" + classId);
    };
    db.sessions.markAttendance(callback, data);
  };

  const deleteSession = (request, response) => {
    console.log(request.body);
    let id = parseInt(request.body.seshId);
    let callback = (result) => {
      console.log(result);
      response.redirect("/calendar");
    };
    db.sessions.removeSession(callback, id);
  };

  const getAttendanceByClass = (request, response) => {
    console.log(request.query);
    let classId = parseInt(request.query.classId);
    console.log(classId);
    let callback = (result) => {
      console.log(result);
      response.send(result);
    };
    db.sessions.getAttendanceData(callback, classId);
  };

  const getAllSessions = (request, response) => {
    let callback = (result) => {
      response.send(result);
    };
    db.sessions.getAllSessionsQuery(callback);
  };

  const getSessionsForDashboard = (request, response) => {
    console.log(request.query);
    let instructorId = parseInt(request.query.instructorId);
    let callback = (result) => {
      response.send(result);
    };
    db.sessions.sessionsForDashboard(callback, instructorId);
  };

  const editSession = (request, response) => {
    console.log(request.body);
    let sessionId = request.body.sessionId;
    let classId = request.body.classId;
    let startDateTime = request.body.startDateTime;
    let endDateTime = request.body.endDateTime;
    let location = request.body.location;
    let callback = () => {
      response.redirect("/");
    };
    db.sessions.updateSession(
      callback,
      sessionId,
      startDateTime,
      endDateTime,
      location
    );
  };

  return {
    newSession,
    getSessions,
    postAttendance,
    deleteSession,
    getAttendanceByClass,
    getAllSessions,
    getSessionsForDashboard,
    editSession,
  };
};
