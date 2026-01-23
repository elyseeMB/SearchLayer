import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { parseCsv } from '#helpers/csv'
import { DateTime } from 'luxon'
import Product from '#models/product'
import Brand from '#models/brand'
import Seller from '#models/seller'
import Category from '#models/category'

export default class MainSeeder extends BaseSeeder {
  async run() {
    // On ne lance plus la transaction globale ici
    await this.seedData()
  }

  async seedData() {
    const rawData = await parseCsv('products.csv')

    // ⚠️ TEST: On prend seulement les 100 premiers pour vérifier que ça marche
    const data = rawData.slice(0, 100)

    console.log(`Processing ${data.length} items from CSV...`)
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      // ✅ CORRECTION CRITIQUE : Une transaction par item
      // Si l'item 50 plante, les 49 d'avant sont sauvés et le 51 peut continuer.
      const trx = await db.transaction()
      try {
        // Sanitize data upfront
        const sanitizedItem = this.sanitizeItem(item)

        // 1. UNIQUE ENTITIES
        const brand = await Brand.firstOrCreate(
          { name: sanitizedItem.brand || 'Generic' },
          { name: sanitizedItem.brand || 'Generic' },
          { client: trx }
        )

        const seller = await Seller.firstOrCreate(
          { sellerId: sanitizedItem.seller_id },
          { sellerName: sanitizedItem.seller_name || 'Unknown', sellerId: sanitizedItem.seller_id },
          { client: trx }
        )

        // 2. HIERARCHICAL CATEGORIES
        const catArray = this.safeJsonParse(sanitizedItem.categories || '[]', [])
        let currentParentId: number | null = null

        for (let j = 0; j < catArray.length; j++) {
          const catName = this.sanitizeString(catArray[j])
          if (!catName) continue

          const category: Category = await Category.firstOrCreate(
            { name: catName, parentId: currentParentId },
            { name: catName, parentId: currentParentId, level: j },
            { client: trx }
          )
          currentParentId = category.id
        }

        // 3. PRODUCT CREATION
        // ✅ SÉCURITÉ : .substring(0, 255) empêche l'erreur "value too long"
        const product = await Product.create(
          {
            title: (item.title || '').substring(0, 255),
            description: item.description,
            // SÉCURITÉ : substring pour éviter le "value too long"
            modelNumber: (item.model_number || '').substring(0, 99),
            rating: this.safeParseFloat(item.rating),
            reviewsCount: this.safeParseInt(item.reviews_count),
            rootBsRank: this.safeParseInt(item.root_bs_rank),
            imagesCount: this.safeParseInt(item.images_count),
            availability: (item.availability || '').substring(0, 99),
            isAvailable: item.availability === 'In Stock' || item.is_available === 'true',

            // SÉCURITÉ : Date parsing blindé
            dateFirstAvailable: this.safeParseDate(item.date_first_available),

            url: (item.url || '').substring(0, 255),
            imageUrl: (item.image_url || '').substring(0, 255),
            brandId: brand.id,
            sellerId: seller.id,
            scrapedAt: this.safeParseTimestamp(item.timestamp),
          },
          { client: trx }
        )

        // 4. SATELLITE DATA
        await this.seedChildren(product, sanitizedItem, trx)

        // 5. ATTACH CATEGORY
        if (currentParentId) {
          await product.related('categories').attach([currentParentId], trx)
        }

        // ✅ SUCCÈS : On valide la transaction pour cet item
        await trx.commit()
        successCount++

        if (i % 10 === 0) console.log(`Processed item ${i + 1}/${data.length}`)
      } catch (itemError: any) {
        // ❌ ÉCHEC : On annule seulement cet item
        await trx.rollback()
        errorCount++
        console.error(
          `❌ Error on item #${i} (Title: ${item.title || 'No Title'}): ${itemError.message}`
        )
      }
    }

    console.log(`Seeding completed! Success: ${successCount}, Errors: ${errorCount}`)
  }

  private safeParseDate(dateStr: string) {
    if (!dateStr || dateStr === 'null') return null
    try {
      const parsed = DateTime.fromFormat(dateStr, 'MMMM d, yyyy')
      return parsed.isValid ? parsed : null
    } catch {
      return null // Si format bizarre, on met null au lieu de faire planter le produit
    }
  }

  private safeParseTimestamp(ts: string) {
    if (!ts || ts === 'null') return DateTime.now()
    try {
      const parsed = DateTime.fromFormat(ts, 'yyyy-MM-dd HH:mm:ss.SSS')
      return parsed.isValid ? parsed : DateTime.now()
    } catch {
      return DateTime.now()
    }
  }

  private async seedChildren(product: Product, item: any, trx: TransactionClientContract) {
    const finalPrice = this.safeParseFloat(item.final_price?.toString().replace(/"/g, ''))

    await product.related('prices').create(
      {
        finalPrice,
        initialPrice:
          this.safeParseFloat(item.initial_price?.toString().replace(/"/g, '')) || finalPrice || 0,
        currency: item.currency || 'USD',
        discount: item.discount || '0%',
        priceDate: DateTime.now(),
      },
      { client: trx }
    )

    const rawFeatures = this.safeJsonParse(item.features, [])
    const features = Array.isArray(rawFeatures) ? rawFeatures : []

    if (features.length > 0) {
      await product.related('features').createMany(
        features.map((text: string, k: number) => ({
          featureText: (text || '').substring(0, 255),
          order: k,
        })),
        { client: trx }
      )
    }
  }

  private sanitizeItem(item: any): any {
    return {
      ...item,
      title: this.sanitizeString(item.title, 255),
      description: this.sanitizeString(item.description, 1000), // Allow longer for TEXT
      url: this.sanitizeString(item.url, 500), // URLs can be long
      imageUrl: this.sanitizeString(item.image_url, 500),
      brand: this.sanitizeString(item.brand),
      seller_name: this.sanitizeString(item.seller_name),
      categories: item.categories, // Handled separately
      features: item.features, // Handled separately
      rating: this.safeParseFloat(item.rating),
      reviews_count: this.safeParseInt(item.reviews_count),
      root_bs_rank: this.safeParseInt(item.root_bs_rank) || undefined,
      images_count: this.safeParseInt(item.images_count),
    }
  }

  private sanitizeString(value: any, maxLength?: number): string | undefined {
    if (!value) return undefined
    const str = String(value).trim()
    const sanitized = str.replace(/[^\x20-\x7E\xA0-\xFF]/g, '') // Keep printable ASCII and Latin-1
    return maxLength ? sanitized.substring(0, maxLength) : sanitized
  }

  private safeParseFloat(val: any): number {
    const parsed = parseFloat(val)
    return isNaN(parsed) ? 0 : parsed
  }

  private safeParseInt(val: any): number {
    const parsed = parseInt(val)
    return isNaN(parsed) ? 0 : parsed
  }

  private safeJsonParse(val: string, defaultVal: any): any {
    try {
      return JSON.parse(val)
    } catch {
      return defaultVal
    }
  }
}
