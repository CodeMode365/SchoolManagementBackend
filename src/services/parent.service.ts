import { Parent, Student } from '@/models';
import type { ParentSchemaType } from '@/types/model';
import { pick } from 'lodash';

const getAll = async () => {
  const parents = await Parent.find();
  return parents;
};

const getChildren = async (parentId: string) => {
  // const parentWithChild = await Parent.findById(parentId).populate('children');
  const children = await Student.find().where({
    $elemMatch: { parent: parentId },
  });
  return pick(children, ['children']);
};

const getByOrg = async (orgId: string) => {
  const parents = await Parent.find({ organization: orgId });
  return parents;
};

const add = async (payload: ParentSchemaType) => {
  const parent = new Parent(payload);
  await parent.save();
  return parent;
};

const update = async () => {};

const remove = async (parentId: string) => {
  await Parent.findByIdAndDelete(parentId);
};

const bulkAdd = async () => {};

const bulkRemove = async () => {};

export default {
  getAll,
  getChildren,
  getByOrg,
  add,
  remove,
  update,
  bulkAdd,
  bulkRemove,
};
