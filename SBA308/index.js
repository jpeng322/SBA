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

// function getAverage(learnerId) {

// }

function getResult(scoresArray) {
  let results = [];
  for (let item of scoresArray) {
      // console.log(item, "item");
    //   console.log(item.learner_id)
    //   const existingItemIndex = results.indexOf(item.learner_id);
      const existingItemIndex = results.findIndex(result => result.learner_id === item.learner_id)
      console.log(existingItemIndex)
    //   console.log(existingItemIndex === -1)
      if (existingItemIndex !== -1) {
        //   console.log("hello")
        //   console.log(existingItemIndex);
          //   console.log(results[existingItemIndex]);
          console.log({ ...results[existingItemIndex], ...item })
          results[existingItemIndex] = { ...results[existingItemIndex], ...item }
        //   results[existingItemIndex].item.assignment_id = item.score;
      } else {
        results.push(item)
    //   results.push({ id: item.learner_id, keyy: item.score });
    }
    // const newArray = newArray.map(item => {
    //     if (item.)
    // } )
    //     for (let result of results) {

    //       if (result.learner_id)
    // } else {
    //         results.push({ id: item.learner_id, item.assignment_id: item.score})
    //     }

    console.log(results);
  }
}


function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  // console.log(CourseInfo, AssignmentGroup, "ASSIGNMENTS", LearnerSubmissions, "learnersubmissions")
  // console.log(AssignmentGroup)
  // const courseAssignment = AssignmentGroup.find(assignment => assignment.course_id === CourseInfo.id)
  // console.log(courseAssignment)
  const scores = LearnerSubmissions.map((learner) => {
    const relatedAssignment = AssignmentGroup.assignments.find(
      (assignment) => assignment.id === learner.assignment_id
    );
      // console.log(relatedAssignment, "relatedassign");
      const assignment_id = learner.assignment_id
    //   console.log(assignment_id)
      let person = {}
      person["learner_id"] = learner.learner_id
      person[assignment_id] = learner.submission.score / relatedAssignment.points_possible
      return person
      return {
        
      learner_id: learner.learner_id,
    //   assignment_id: learner.assignment_id,
      assignment_id: learner.submission.score / relatedAssignment.points_possible,
    };
  });
    //   console.log(scores);
    [
        { learner_id: 125, assignment_id: 1, score: 0.94 },
        { learner_id: 125, assignment_id: 2, score: 1 },
        { learner_id: 125, assignment_id: 3, score: 0.8 },
        { learner_id: 132, assignment_id: 1, score: 0.78 },
        { learner_id: 132, assignment_id: 2, score: 0.9333333333333333 }
    ]
    
    // to this 
    const result = [
        {
          id: 125,
          avg: 0.985, // (47 + 150) / (50 + 150)
          1: 0.94, // 47 / 50
          2: 1.0 // 150 / 150
        },
        {
          id: 132,
          avg: 0.82, // (39 + 125) / (50 + 150)
          1: 0.78, // 39 / 50
          2: 0.833 // late: (140 - 15) / 150
        }
    ];


    


    




  console.log(getResult(scores));
}

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
