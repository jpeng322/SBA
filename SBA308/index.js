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

  AssignmentGroup.assignments.forEach((assignment) => {
    if (assignmentIdsOfLearner.includes(assignment.id)) {
      totalMaxScore += assignment.points_possible;
    }
  });
  const average = totalScore / totalMaxScore;
  return roundToHundredths(average);
}

function roundToHundredths(num) {
  return Math.round(num * 100) / 100;
}

function getResult(scoresArray) {
  let results = [];
  for (let item of scoresArray) {
    const existingItemIndex = results.findIndex(
      (result) => result.learner_id === item.learner_id
    );
    if (existingItemIndex !== -1) {
      //   console.log({ ...results[existingItemIndex], ...item });
      results[existingItemIndex] = { ...results[existingItemIndex], ...item };
    } else {
      results.push(item);
    }
  }

  console.log(results);
}

function isDue(sub_date, due_date) {
  //   if (sub_date > due_date) {
  //     console.log("is due");
  //   } else {
  //     return false
  //     }

  return sub_date > due_date;
}

// isDue(new Date("2023-01-25"), new Date("3156-11-15"));
// console.log(new Date("2023-01-25") < new Date("3156-11-15"));

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  const scores = LearnerSubmissions.map((learner) => {
    const relatedAssignment = AssignmentGroup.assignments.find(
      (assignment) => assignment.id === learner.assignment_id
    );
    // console.log(isDue(learner.submission.submitted_at, relatedAssignment.due_at), learner.submission.submitted_at, relatedAssignment.due_at );
    // if (!isDue(learner.submission.submitted_at, relatedAssignment.due_at)) {
    const assignment_id = learner.assignment_id;
    // console.log(isDue(learner.submission.submitted_at, relatedAssignment.due_at));
    let person = {};
    person["learner_id"] = learner.learner_id;
    person["avg"] = getTotalAverage(learner.learner_id);
    person[assignment_id] = roundToHundredths(
      learner.submission.score / relatedAssignment.points_possible
    );
    return person;
    // }
  });

  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  getResult(scores);
}

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
