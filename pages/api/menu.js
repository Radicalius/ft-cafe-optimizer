import { getMenu } from '../../lib/data';
import { getNextWeekdayDateString } from '../../lib/dateUtil';

export default async function handler(req, res) {
    var ds = getNextWeekdayDateString();
    if (req.query.ds !== undefined) {
        ds = req.query.ds;
    }

    res.status(200).json({
        menu: await getMenu(ds),
        ds
    });
}