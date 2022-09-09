import { getCombos, getMenu } from '../../lib/data';

export default async function handler(req, res) {
  var menu = await getMenu();
  var combos = await getCombos();

  if (req.query.distinct === 'true') {
    combos = combos.filter(x => (new Set(x[0])).size == x[0].length);
  }

  if (req.query.includeLunch === 'false') {
    combos = combos.filter(x => x[0].every(y => menu[y-1].mealName !== 'Lunch'));
  }

  if (req.query.includeBreakfast === 'false') {
    combos = combos.filter(x => x[0].every(y => menu[y-1].mealName !== 'Breakfast'));
  }

  if (req.query.tags) {
    if (req.query.tags.push) {
      combos = combos.filter(x => x[0].every(y => req.query.tags.every(z => menu[y-1].tags.includes(z))));
    }
    else {
      combos = combos.filter(x => x[0].every(y => menu[y-1].tags.includes(req.query.tags)));
    }
  }

  if (req.query.contains) {
    if (!req.query.contains.push) {
      req.query.contains = [req.query.contains];
    }
    combos = combos.filter(x => req.query.contains.every(y => x[0].includes(Number.parseInt(y))));
  }

  var page = 1;
  var pageSize = 25;
  if (req.query.page) {
    page = Number.parseInt(req.query.page);
  }
  if (req.query.pagesize !== undefined) {
    pageSize = Number.parseInt(req.query.pagesize);
  }
  const maxPage = Math.ceil(combos.length / pageSize);
  combos = combos.slice((page - 1) * pageSize, page * pageSize);

  res.status(200).json({ 
    combos,
    page,
    pageSize,
    maxPage
  })
}
