// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function roundToHundredths(num) {
  return Math.round(num * 100) / 100;
}

function getTotalAverage(learnerId) {
  let totalScore = 0;
  let totalMaxScore = 0;
  let assignmentIdsOfLearner = [];
  LearnerSubmissions.forEach((submission) => {
    if (submission.learner_id === learnerId) {
      assignmentIdsOfLearner.push(submission.assignment_id);
      totalScore += submission.submission.score;
    }
  });

  let counter = 0;
  const assignments = AssignmentGroup.assignments;
  while (counter < assignments.length) {
    if (assignmentIdsOfLearner.includes(assignments[counter].id)) {
      totalMaxScore += assignments[counter].points_possible;
    }
    counter++;
  }

  const average = totalScore / totalMaxScore;
  return roundToHundredths(average);
}

function isLate(sub_date, due_date) {
  const subDate = new Date(sub_date);
  const dueDate = new Date(due_date);
  return subDate > dueDate;
}

function isWithinAMonth(sub_date, due_date) {
  const subDate = new Date(sub_date);
  const dueDate = new Date(due_date);
  const subDateMillis = subDate.getTime();
  const dueDateMillis = dueDate.getTime();
  const differenceMillis = Math.abs(dueDateMillis - subDateMillis);
  const differenceDays = differenceMillis / (24 * 60 * 60 * 1000);

  if (differenceDays <= 30) {
    // console.log("The date is within a month.");
    return true;
  } else {
    // console.log("The date is not within a month.");
    return false;
  }
}

function getResult(scoresArray) {
  let results = [];
  for (let item of scoresArray) {
    if (item === undefined) continue;
    const existingItemIndex = results.findIndex(
      (result) => result.learner_id === item.learner_id
    );
    if (existingItemIndex !== -1) {
      results[existingItemIndex] = { ...results[existingItemIndex], ...item };
    } else {
      results.push(item);
    }
  }

  return results;
}

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  if (CourseInfo.id === AssignmentGroup.course_id) {
    const scores = LearnerSubmissions.map((learner) => {
      const relatedAssignment = AssignmentGroup.assignments.find(
        (assignment) => assignment.id === learner.assignment_id
      );
      if (
        !isWithinAMonth(
          learner.submission.submitted_at,
          relatedAssignment.due_at
        )
      )
        return;
      const assignment_id = learner.assignment_id;
      if (
        typeof learner.learner_id === "number" &&
        typeof relatedAssignment.points_possible === "number" &&
        typeof learner.submission.score === "number"
      ) {
        let person = {};
        person["learner_id"] = learner.learner_id;
        person["avg"] = getTotalAverage(learner.learner_id);
        if (relatedAssignment.points_possible < 1) {
          throw new Error("Points possible cannot be 0 or less.");
        } else {
          const submission_score = isLate(
            learner.submission.submitted_at,
            relatedAssignment.due_at
          )
            ? learner.submission.score * 0.9
            : learner.submission.score;
          person[assignment_id] = roundToHundredths(
            submission_score / relatedAssignment.points_possible
          );
        }
        return person;
      } else {
        throw new Error(
          "Learner id, points possible, or submission score is not a number."
        );
      }
    });
    return getResult(scores);
  } else {
    throw new Error("Assignment group does not match course info!");
  }

  //Desired Results
  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0, // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833, // late: (140 - 15) / 150
  //   },
  // ];
}

try {
  getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
} catch (e) {
  console.log(e);
}
