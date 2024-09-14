import mongoose, { Schema, Model, Document } from 'mongoose';
import { faker } from '@faker-js/faker';

interface DummyDataOptions {
  count: number;
}

function generateDummyData<T extends Document>(
  model: Model<T>,
  options: DummyDataOptions = { count: 10 }
): Partial<T>[] {
  const dummyData: Partial<T>[] = [];
  const schema = model.schema;

  // Helper to generate unique values for a given field
  const generateUniqueValues = (generate: () => any, count: number): any[] => {
    const values = new Set<any>();
    while (values.size < count) {
      values.add(generate());
    }
    return Array.from(values);
  };

  // Store unique values for fields with unique constraints
  const uniqueValuesMap: Record<string, any[]> = {};

  // Identify fields with unique constraints and prepare unique values
  schema.eachPath((path, schemaType) => {
    if (schemaType.options.unique) {
      if (schemaType instanceof Schema.Types.String) {
        uniqueValuesMap[path] = generateUniqueValues(
          () => faker.internet.email(),
          options.count
        );
      } else if (schemaType instanceof Schema.Types.Number) {
        uniqueValuesMap[path] = generateUniqueValues(
          () => faker.number.int(),
          options.count
        );
      } else if (schemaType instanceof Schema.Types.ObjectId) {
        uniqueValuesMap[path] = generateUniqueValues(
          () => new mongoose.Types.ObjectId(),
          options.count
        );
      }
    }
  });

  // Generate dummy data
  for (let i = 0; i < options.count; i++) {
    const document: Partial<T> = {};

    schema.eachPath((path, schemaType) => {
      if (schemaType instanceof Schema.Types.String) {
        if (schemaType.enumValues && schemaType.enumValues.length) {
          // Handle enums
          document[path as keyof T] = faker.helpers.arrayElement(
            schemaType.enumValues
          ) as unknown as T[keyof T];
        } else if (uniqueValuesMap[path]) {
          // Use unique value for unique fields
          document[path as keyof T] = uniqueValuesMap[path][i] as T[keyof T];
        } else {
          document[path as keyof T] =
            faker.lorem.word() as unknown as T[keyof T];
        }
      } else if (schemaType instanceof Schema.Types.Number) {
        if (uniqueValuesMap[path]) {
          // Use unique value for unique fields
          document[path as keyof T] = uniqueValuesMap[path][i] as T[keyof T];
        } else {
          document[path as keyof T] =
            faker.number.int() as unknown as T[keyof T];
        }
      } else if (schemaType instanceof Schema.Types.Boolean) {
        document[path as keyof T] =
          faker.datatype.boolean() as unknown as T[keyof T];
      } else if (schemaType instanceof Schema.Types.Date) {
        document[path as keyof T] = faker.date.past() as unknown as T[keyof T];
      } else if (schemaType instanceof Schema.Types.ObjectId) {
        if (uniqueValuesMap[path]) {
          // Use unique value for unique fields
          document[path as keyof T] = uniqueValuesMap[path][i] as T[keyof T];
        } else {
          document[path as keyof T] =
            new mongoose.Types.ObjectId() as unknown as T[keyof T];
        }
      } else if (
        schemaType instanceof Schema.Types.Array &&
        schemaType.caster instanceof Schema.Types.ObjectId
      ) {
        document[path as keyof T] = [
          new mongoose.Types.ObjectId(),
        ] as unknown as T[keyof T];
      }
    });

    dummyData.push(document);
  }

  return dummyData;
}

export default generateDummyData;
