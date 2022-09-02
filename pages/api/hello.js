import { scrapeMenu } from '../lib/scraper';

export default async function handler(req, res) {
  res.status(200).json({ items: await scrapeMenu() })
}
