import stringHelpers from '@adonisjs/core/helpers/string'
import db from '@adonisjs/lucid/services/db'
import { LucidModel } from '@adonisjs/lucid/types/model'

export class SlugifyService {
  public static separator = '-'
  public static counterName = 'lucid_slugify_counter'

  public static async make<Model extends LucidModel>(
    model: Model,
    field: Extract<keyof InstanceType<Model>, string>,
    slug: string
  ) {
    model.boot()

    slug = stringHelpers.slug(slug, {
      replacement: this.separator,
      lower: true,
      strict: true,
    })

    const rows = await model
      .query()
      .select(db.raw(`SUBSTRING(${field} from '[0-9]+$')::INTEGER as ${this.counterName}`))
      .whereRaw(`?? ~* ?`, [field, `^${slug}(${this.separator}[0-9]*)?$`])
      .orderBy(this.counterName, 'desc')

    if (!rows.length) {
      return slug
    }

    let counter = rows[0].$extras[this.counterName]
    if (counter) {
      return `${slug}${this.separator}${counter + 1}`
    }

    if (rows[1]) {
      counter = rows[1].$extras[this.counterName]
      return `${slug}${this.separator}${counter + 1}`
    }

    return `${slug}${this.separator}1`
  }
}
