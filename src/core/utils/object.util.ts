// src/core/utils/object.util.ts
export const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length === 0;
};
