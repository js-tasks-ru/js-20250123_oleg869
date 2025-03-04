const header = [
    { id: 'id', title: 'ID', sortable: true, dataType: 'number' },
    { id: 'user', title: 'Client', sortable: true, dataType: 'string' },
    {
        id: 'createdAt', title: 'Date', sortable: true, template: (value) => {
            const date = new Date(value);
            return `
          <div class="sortable-table__cell">
            ${new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }).format(date)}
          </div>
        `;
        },
        dataType: 'date'
    },
    { id: 'totalCost', title: 'Price', sortable: true, dataType: 'number' },
    { id: 'delivery', title: 'Delivery Status', sortable: true, dataType: 'string' }
];

export default header;
