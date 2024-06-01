import { Helper } from '@/helpers';
import { ApiError } from '@/utils';
import type { Model } from 'mongoose';

interface iDateFilter {
  startDate?: Date;
  endDate?: Date;
}

interface iPageArgs {
  page?: number;
  limit?: number;
}

export default class CrudService<T extends Document> {
  private Model: Model<T>;

  constructor(model: Model<T>) {
    this.Model = model;
  }

  public async getAll(pageArgs: iPageArgs, dateFilter?: iDateFilter) {
    const filters = [];
    const { page, limit } = pageArgs;
    if (dateFilter?.startDate) filters.push({ $gte: dateFilter.startDate });
    if (dateFilter?.startDate) filters.push({ $lte: dateFilter.endDate });
    const data = await this.Model.find({
      $and: filters,
      $comment: 'Filter items by date',
    });
    return { data, pagination: Helper.pageProvider(data.length, page, limit) };
  }

  public async getOne(id: string): Promise<T> {
    const item = await this.Model.findById(id);
    if (!item) throw ApiError.notFound('Item not found');
    return item;
  }

  public async add(item: T): Promise<void> {
    const newItem = new this.Model(item);
    await newItem.save();
  }

  public async update(id: string, data: T): Promise<T> {
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

  public async count(dateFilter?: iDateFilter): Promise<number> {
    const filters = [];
    if (dateFilter?.startDate) filters.push({ $gte: dateFilter.startDate });
    if (dateFilter?.startDate) filters.push({ $lte: dateFilter.endDate });
    return await this.Model.countDocuments({ $and: filters });
  }
}
