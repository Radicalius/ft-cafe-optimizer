import { getCombos, getMenu } from '../../lib/data';
import { filterTags, filterMeal, filterDistinct, filterContains, filterPriceMax } from '../../lib/filters';
import { getNextWeekdayDateString } from '../../lib/dateUtil';

export default async function handler(req, res) {

  var ds = getNextWeekdayDateString();
  if (req.query.ds !== undefined) {
    ds = req.query.ds;
  }

  var menu = await getMenu(ds);
  var combos = await getCombos(ds);

  if (req.query.distinct === 'true') {
    combos = filterDistinct(combos);
  }

  if (req.query.includeLunch === 'false') {
    combos = filterMeal(combos, 'Lunch', menu);
  }

  if (req.query.includeBreakfast === 'false') {
    combos = filterMeal(combos, 'Breakfast', menu);
  }

  if (req.query.tags) {
    if (!req.query.tags.push) {
      req.query.tags = [req.query.tags];
    }
    combos = filterTags(combos, req.query.tags, menu);
  }

  if (req.query.contains) {
    if (!req.query.contains.push) {
      req.query.contains = [req.query.contains];
    }
    combos = filterContains(combos, req.query.contains);
  }

  if (req.query.maxPrice) {
    combos = filterPriceMax(combos, Number.parseFloat(req.query.maxPrice));
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
    maxPage,
    ds
  })
}
