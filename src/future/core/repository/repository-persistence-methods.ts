import { RemoveOptions } from "../../../repository/RemoveOptions"
import { SaveOptions } from "../../../repository/SaveOptions"
import { AnyDataSource, DataSourceEntity } from "../data-source"
import {
  EntityDefaultColumnValueMap,
  EntityModelPartial,
  EntityPrimaryColumnValueMap,
} from "../entity"
import { FindReturnType } from "../find-options"
import { SelectAll } from "../selection"

/**
 * Interface for repositories that implement persistence / alteration operations.
 *
 * todo: check if we can implement proper typing for save(models), remove(models), etc.
 */
export interface RepositoryPersistenceMethods<
  Source extends AnyDataSource,
  Entity extends DataSourceEntity<Source>
> {
  /**
   * Saves one or many given entities in the database.
   * If entity does not exist in the database then inserts, otherwise updates.
   */
  save<Model extends EntityModelPartial<Source, Entity>>(
    model: Model,
    options?: SaveOptions,
  ): Promise<
    Model &
      FindReturnType<
        Source,
        Entity,
        SelectAll<
          EntityPrimaryColumnValueMap<Entity> &
            EntityDefaultColumnValueMap<Entity>
        >,
        false
      >
  >

  /**
   * Removes one or many given entities from the database.
   */
  remove<Model extends EntityModelPartial<Source, Entity>>(
    model: Model,
    options?: RemoveOptions,
  ): Promise<void>

  /**
   * Marks given one or many entities as "soft deleted".
   */
  softRemove<Model extends EntityModelPartial<Source, Entity>>(
    model: Model,
    options?: SaveOptions,
  ): Promise<void>

  /**
   * Recovers given one or many entities previously removed by "softRemove" operation.
   */
  recover<Model extends EntityModelPartial<Source, Entity>>(
    model: Model,
    options?: SaveOptions,
  ): Promise<void>
}