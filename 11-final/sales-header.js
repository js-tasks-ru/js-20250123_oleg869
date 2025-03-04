const header = [
    {
        id: 'id',
        title: 'ID',
        sortable: false,
        sortable: true,
        sortType: 'number'
    },
    {
        id: 'client',
        title: 'Client',
        sortable: true,
        sortType: 'string'
    },
    {
        id: 'date',
        title: 'Date',
        sortable: true,
        sortType: 'date'
    },
    {
        id: 'price',
        title: 'Price',
        sortable: true,
        sortType: 'number'
    },
    {
        id: 'status',
        title: 'Status',
        sortable: true,
        sortType: 'number',
        template: data => {
            return `<div class="sortable-table__cell">
            ${data > 0 ? 'Delivered' : 'On the way'}
          </div>`;
        }
    },
];

export default header;