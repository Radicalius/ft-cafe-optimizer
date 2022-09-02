import { getCombos, getMenu } from '../lib/data';

export default async function handler(req, res) {
  res.status(200).json({ items: (await getCombos()).slice(0,25) })
}
