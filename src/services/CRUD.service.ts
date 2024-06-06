import { Model, Document } from 'mongoose';
import { Helper } from '@/helpers';
import { ApiError } from '@/utils';

interface iDateFilter {
  startDate?: Date;
  endDate?: Date;
}

interface iPageArgs {
  page: number;
  limit: number;
}

// Define the basic filter type
type BasicFilter<T> = Partial<Record<keyof T, T[keyof T]>>;

// Define query operators
type QueryOperators<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
  $nin?: T[];
  $regex?: RegExp;
};

// Combine basic filters and operators
type FilterQuery<T> = {
  [P in keyof T]?:
    | T[P]
    | QueryOperators<T[P]>
    | Array<T[P] | QueryOperators<T[P]>>;
};

export default class CrudService<T extends Document> {
  private Model: Model<T>;

  constructor(model: Model<T>) {
    this.Model = model;
  }

  public async getAll(filters: FilterQuery<T>, pageArgs: iPageArgs) {
    const { page, limit } = pageArgs;
    const skip = (page - 1) * limit;
    const data = await this.Model.aggregate([
      {
        $match: {
          $expr: filters,
          $comment: 'Filter items by date',
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);
    return { data, ...Helper.pageProvider(await this.count(), page, limit) };
  }

  public async getOne(id: string): Promise<T> {
    const item = await this.Model.findById(id);
    if (!item) throw ApiError.notFound('Item not found');
    return item;
  }

  public async create(item: Partial<T>): Promise<void> {
    const newItem = new this.Model(item);
    await newItem.save();
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

  public async count(): Promise<number> {
    return await this.Model.countDocuments();
  }
}
