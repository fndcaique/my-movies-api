import { Category } from './category';

describe('Category Tests', () => {
  it("constructor of category", () => {
    const category = new Category('category');

    expect(category.name).toBe("category");
  })
})