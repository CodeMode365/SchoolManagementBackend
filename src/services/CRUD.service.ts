import { Model, Document, type FilterQuery } from 'mongoose';
import { Helper } from '@/helpers';
import { ApiError } from '@/utils';

interface iDateFilter {
  startDate?: Date;
  endDate?: Date;
}

interface iPageArgs {
  page: number;
  limit: number;
  sort?: { [key: string]: 1 | -1 };
}

// Define the basic filter type
type BasicFilter<T> = Partial<Record<keyof T, T[keyof T]>>;

// Define query operators
// type QueryOperators<T> = {
//   $eq?: T;
//   $ne?: T;
//   $gt?: T;
//   $gte?: T;
//   $lt?: T;
//   $lte?: T;
//   $in?: T[];
//   $nin?: T[];
//   $regex?: RegExp;
// };

// // Combine basic filters and operators
// export type FilterQuery<T> = {
//   [P in keyof T]?:
//     | T[P]
//     | QueryOperators<T[P]>
//     | Array<T[P] | QueryOperators<T[P]>>;
// };

export default class CrudService<T extends Document> {
  private Model: Model<T>;

  constructor(model: Model<T>) {
    this.Model = model;
  }

  public async getAll(filters: FilterQuery<T>, pageArgs: iPageArgs) {
    const { page = 1, limit = 10, sort } = pageArgs;
    const skip = (page - 1) * limit;
    const data = await this.Model.aggregate([
      { $match: { ...filters, $comment: 'Filter items by date' } },
      ...(sort ? [{ $sort: sort }] : []),
      { $skip: skip },
      { $limit: limit },
    ]);
    console.log('currentPage', page);
    return {
      data,
      ...Helper.pageProvider(await this.count(filters), page, limit),
    };
  }

  public async getOne(id: string): Promise<T> {
    const item = await this.Model.findById(id);
    if (!item) throw ApiError.notFound('Item not found');
    return item;
  }

  public async getByOrg(
    orgId: string,
    filters: FilterQuery<T>,
    pageArgs: iPageArgs
  ) {
    const item = await this.Model.find({ organization: orgId, ...filters })
      .skip(pageArgs.page - 1)
      .limit(pageArgs.limit);
    if (item.length <= 0) throw ApiError.notFound('Item not found');
    return item;
  }

  public async findOne(filters: Record<string, unknown>) {
    const item = await this.Model.findOne(filters);
    if (!item) throw ApiError.notFound('Item not found');
    return item;
  }

  public async create(item: Partial<T>) {
    const newItem = new this.Model(item);
    await newItem.save();
    return newItem;
  }

  public async update(id: string, data: Partial<T>): Promise<T> {
    const newItem = await this.Model.findByIdAndUpdate(id, data, { new: true });
    if (!newItem) throw ApiError.internalError('Failed to save!');
    return newItem;
  }

  public async remove(id: string): Promise<void> {
    await this.Model.findByIdAndDelete(id).catch((err) => {
      console.log(err);
      throw ApiError.internalError('Failed to remove!');
    });
  }

  public async count(filter: FilterQuery<T>): Promise<number> {
    return await this.Model.find()
      .where({ ...filter })
      .countDocuments();
  }
}
