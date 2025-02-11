import {SortableTable as SortableTableClassic} from '../1-sortable-table-v2/index.js';


export default class SortableTable extends  SortableTableClassic{
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);
  }
}
