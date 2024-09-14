import { Exam } from '@/models';
import mongoose from 'mongoose';

// org --> last exam --> all results --> group by subjects -->array of objects with pass and fail data
const passVsFailData = async (orgId: string) => {
  const data = await Exam.aggregate([
    // Match exams by organization and get the latest one
    { $match: { organization: new mongoose.Types.ObjectId(orgId) } },
    { $sort: { createdAt: -1 } },
    { $limit: 1 },
    // Lookup to get results associated with the exam
    {
      $lookup: {
        from: 'results',
        localField: '_id',
        foreignField: 'exam',
        as: 'results',
      },
    },
    { $unwind: '$results' },
    { $unwind: '$results.marks' },
    // Lookup to get subject details
    {
      $lookup: {
        from: 'subjects',
        localField: 'results.marks.subject',
        foreignField: '_id',
        as: 'subjectInfo',
      },
    },
    { $unwind: '$subjectInfo' },
    // Group by subject and calculate pass/fail counts
    {
      $group: {
        _id: '$results.marks.subject',
        subjectName: { $first: '$subjectInfo.name' },
        pass: {
          $sum: {
            $cond: {
              if: {
                $gte: [
                  '$results.marks.obtainedMark',
                  '$results.marks.passMark',
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        fail: {
          $sum: {
            $cond: {
              if: {
                $lt: ['$results.marks.obtainedMark', '$results.marks.passMark'],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    // Project the final structure
    {
      $project: {
        _id: 0,
        subjectId: '$_id',
        subjectName: 1,
        pass: 1,
      },
    },
  ]);

  return data;
};

export default {
  passVsFailData,
};
