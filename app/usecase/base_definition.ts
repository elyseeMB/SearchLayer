import { LucidModel, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export class BaseDefinition<Model extends LucidModel, Row extends LucidRow> {
  query: ModelQueryBuilderContract<Model, Row>

  constructor(readonly model: Model) {
    const query = model.query<Model, Row>()
    this.query = query
  }
}
