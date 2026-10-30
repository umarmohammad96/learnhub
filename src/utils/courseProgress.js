export const progress = (course, completedLessons) =>
  Math.min(
    100,
    Math.round(
      ((completedLessons[course.id] || []).length / course.lessons) * 100,
    ),
  );

export const allLessons = (course) =>
  course.modules.flatMap((module) => module.slice(1));
