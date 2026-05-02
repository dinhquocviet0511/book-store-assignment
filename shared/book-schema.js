"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const zod_1 = require("zod");
exports.BookSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    sku: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    author: zod_1.z.string().min(1),
    description: zod_1.z.string(),
    priceCents: zod_1.z.number().int().nonnegative(),
    coverImageUrl: zod_1.z.string().url(),
    createdAt: zod_1.z.string().datetime(),
});
//# sourceMappingURL=book-schema.js.map