import {
  Category,
  CategorySearchParams,
  CategorySearchResult
} from '#category/domain';
import {
  NotFoundError,
  SearchParams,
  SearchResult,
  UniqueEntityId,
  isValidUUID
} from '#common/domain';
import { setupSequelize } from '#common/infra/db/testing/helpers/sequelize.helper';
import _chance from 'chance';
import { CategoryModel } from './category-model';
import { CategoryModelMapper } from './category-model-mapper';
import { CategorySequelizeRepository } from './category-sequelize.repository';
describe('CategorySequelizeRepository Integration Tests', () => {
  setupSequelize({ models: [CategoryModel] });
  const chance = _chance();

  let repository: CategorySequelizeRepository;
  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it('should insert a new entity', async () => {
    let category = new Category({ name: 'Name' });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toEqual(category.toJSON());

    category = new Category({ name: 'Name', description: 'Description' });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toEqual(category.toJSON());
  });

  it('should insert a new entity', async () => {
    const category = new Category({ name: 'Name' });
    await repository.insert(category);
    const model = await CategoryModel.findByPk(category.id);

    expect(model.toJSON()).toEqual(category.toJSON());
  });

  it('should throw error when entity not found', async () => {
    await expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError('Entity Not Found using ID fake id')
    );

    await expect(
      repository.findById('0a8b9e21-b580-4a17-a88f-3080aa7d5b88')
    ).rejects.toThrow(
      new NotFoundError(
        'Entity Not Found using ID 0a8b9e21-b580-4a17-a88f-3080aa7d5b88'
      )
    );

    await expect(
      repository.findById(
        new UniqueEntityId('0a8b9e21-b580-4a17-a88f-3080aa7d5b88')
      )
    ).rejects.toThrow(
      new NotFoundError(
        'Entity Not Found using ID 0a8b9e21-b580-4a17-a88f-3080aa7d5b88'
      )
    );
  });

  it('should find an entity by id', async () => {
    const entity = new Category({ name: 'name' });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toEqual(entityFound.toJSON());
  });

  it('should return all categories', async () => {
    const entity = new Category({ name: 'Name' });
    await repository.insert(entity);
    let entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(entities).toEqual([entity]);

    const entity2 = new Category({ name: 'Name 2' });
    await repository.insert(entity2);
    entities = await repository.findAll();
    expect(entities).toHaveLength(2);
    expect(entities).toEqual([entity, entity2]);
  });

  describe('search method tests', () => {
    it('should only apply paginate when other params is null', async () => {
      const createdAt = new Date();
      await CategoryModel.factory()
        .count(11)
        .bulkCreate(() => ({
          id: chance.guid({ version: 4 }),
          name: 'Name',
          description: 'Description',
          isActive: true,
          createdAt
        }));
      const spyToEntity = jest.spyOn(CategoryModelMapper, 'toEntity');
      const searchOutput = await repository.search(new CategorySearchParams());
      expect(spyToEntity).toBeCalledTimes(10);
      expect(searchOutput).toBeInstanceOf(CategorySearchResult);
      expect(searchOutput.toJSON()).toEqual({
        total: 11,
        page: 1,
        limit: 10,
        lastPage: 2,
        sortBy: null,
        sortDir: null,
        filter: null,
        items: searchOutput.items
      });
      searchOutput.items.forEach((item) => {
        expect(item).toBeInstanceOf(Category);
        expect(isValidUUID(item.id)).toBe(true);
        expect(item.toJSON()).toEqual({
          id: item.id,
          name: 'Name',
          description: 'Description',
          isActive: true,
          createdAt
        });
      });
    });

    it('should order by createdAt DESC when search params are null', async () => {
      const createdAt = new Date();
      await CategoryModel.factory()
        .count(11)
        .bulkCreate((index) => ({
          id: chance.guid({ version: 4 }),
          name: `Name-${index}`,
          description: 'Description',
          isActive: true,
          createdAt: new Date(createdAt.getTime() + index)
        }));
      const searchOutput = await repository.search(new CategorySearchParams());
      [...searchOutput.items].reverse().forEach((item, index) => {
        expect(`${item.name}-${index}`);
      });
    });

    it('should apply paginate and filter', async () => {
      const defaultProps = {
        description: null,
        isActive: true,
        createdAt: new Date()
      };
      const categoriesProp = [
        { ...defaultProps, id: chance.guid({ version: 4 }), name: 'test' },
        { ...defaultProps, id: chance.guid({ version: 4 }), name: 'a' },
        { ...defaultProps, id: chance.guid({ version: 4 }), name: 'TEST' },
        { ...defaultProps, id: chance.guid({ version: 4 }), name: 'TeSt' }
      ];

      const categories = await CategoryModel.bulkCreate(categoriesProp);

      let searchOutput = await repository.search(
        new CategorySearchParams({ page: 1, limit: 2, filter: 'TEST' })
      );
      expect(searchOutput).toEqual(
        new CategorySearchResult({
          items: [
            CategoryModelMapper.toEntity(categories[0]),
            CategoryModelMapper.toEntity(categories[2])
          ],
          total: 3,
          page: 1,
          limit: 2,
          sortBy: null,
          sortDir: null,
          filter: 'TEST'
        })
      );

      searchOutput = await repository.search(
        new CategorySearchParams({ page: 2, limit: 2, filter: 'TEST' })
      );
      expect(searchOutput).toEqual(
        new CategorySearchResult({
          items: [CategoryModelMapper.toEntity(categories[3])],
          total: 3,
          page: 2,
          limit: 2,
          sortBy: null,
          sortDir: null,
          filter: 'TEST'
        })
      );
    });

    it('should apply paginate and sort', async () => {
      const defaultProps = {
        description: null,
        isActive: true,
        createdAt: new Date()
      };
      const categoriesProp = [
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'ab',
          description: '1'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'aa',
          description: '2'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'ad',
          description: '3'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'ae',
          description: '4'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'ac',
          description: '5'
        }
      ];

      const categories = await CategoryModel.bulkCreate(categoriesProp);

      const arrange = [
        {
          params: new SearchParams({ page: 1, limit: 2, sortBy: 'name' }),
          result: new SearchResult({
            total: 5,
            items: [
              CategoryModelMapper.toEntity(categories[1]),
              CategoryModelMapper.toEntity(categories[0])
            ],
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'asc',
            filter: null
          })
        },
        {
          params: new SearchParams({ page: 2, limit: 2, sortBy: 'name' }),
          result: new SearchResult({
            total: 5,
            items: [
              CategoryModelMapper.toEntity(categories[4]),
              CategoryModelMapper.toEntity(categories[2])
            ],
            page: 2,
            limit: 2,
            sortBy: 'name',
            sortDir: 'asc',
            filter: null
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc'
          }),
          result: new SearchResult({
            total: 5,
            items: [
              CategoryModelMapper.toEntity(categories[3]),
              CategoryModelMapper.toEntity(categories[2])
            ],
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: null
          })
        },
        {
          params: new SearchParams({
            page: 2,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc'
          }),
          result: new SearchResult({
            total: 5,
            items: [
              CategoryModelMapper.toEntity(categories[4]),
              CategoryModelMapper.toEntity(categories[0])
            ],
            page: 2,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: null
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 3,
            sortBy: 'description',
            sortDir: 'desc'
          }),
          result: new SearchResult({
            total: 5,
            items: [
              CategoryModelMapper.toEntity(categories[4]),
              CategoryModelMapper.toEntity(categories[3]),
              CategoryModelMapper.toEntity(categories[2])
            ],
            page: 1,
            limit: 3,
            sortBy: 'description',
            sortDir: 'desc',
            filter: null
          })
        }
      ];
      expect.assertions(arrange.length);

      for (let i = 0; i < arrange.length; i++) {
        const item = arrange[i];
        await expect(repository.search(item.params)).resolves.toEqual(
          item.result
        );
      }
    });

    it('should search using filter, sort and paginate', async () => {
      const defaultProps = {
        description: null,
        isActive: true,
        createdAt: new Date()
      };
      const categoriesProp = [
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'test'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'aa'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'TEST'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'ae'
        },
        {
          ...defaultProps,
          id: chance.guid({ version: 4 }),
          name: 'TeSt'
        }
      ];

      const categories = await CategoryModel.bulkCreate(categoriesProp);

      const arrange = [
        {
          params: new SearchParams({
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: 'a'
          }),
          result: new SearchResult({
            total: 2,
            items: [
              CategoryModelMapper.toEntity(categories[3]),
              CategoryModelMapper.toEntity(categories[1])
            ],
            page: 1,
            limit: 2,
            sortBy: 'name',
            sortDir: 'desc',
            filter: 'a'
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 4,
            sortBy: 'name',
            filter: 't'
          }),
          result: new SearchResult({
            total: 3,
            items: [
              CategoryModelMapper.toEntity(categories[2]),
              CategoryModelMapper.toEntity(categories[4]),
              CategoryModelMapper.toEntity(categories[0])
            ],
            page: 1,
            limit: 4,
            sortBy: 'name',
            sortDir: 'asc',
            filter: 't'
          })
        },
        {
          params: new SearchParams({
            page: 1,
            limit: 4,
            sortBy: 'name',
            filter: 'e'
          }),
          result: new SearchResult({
            total: 4,
            items: [
              CategoryModelMapper.toEntity(categories[2]),
              CategoryModelMapper.toEntity(categories[4]),
              CategoryModelMapper.toEntity(categories[3]),
              CategoryModelMapper.toEntity(categories[0])
            ],
            page: 1,
            limit: 4,
            sortBy: 'name',
            sortDir: 'asc',
            filter: 'e'
          })
        }
      ];

      expect.assertions(arrange.length);

      for (let i = 0; i < arrange.length; i++) {
        const item = arrange[i];
        await expect(repository.search(item.params)).resolves.toEqual(
          item.result
        );
      }
    });
  });
});
