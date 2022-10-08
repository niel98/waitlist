import * as moment from "moment";

export const search = async(params: any) => {
    const query = {};
    for (const value in params) {
      if (value.match(/date|Date|createdAt/g)) {
        const date = new Date(params[value]);
        const endDate = moment(date).add(1, 'day').format();
        query['createdAt'] = { $gte: date, $lte: new Date(endDate) };
      } else {
        query[value] = params[value];
      }
    }
    return query;
  }