type DefaultType = { _id: unknown };

export default function RemoveObjectID<T>(
  object: T & DefaultType
): Omit<T, "_id"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...newObject } = object;
  return newObject;
}
