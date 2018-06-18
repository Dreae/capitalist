<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key" @click="sortBy(column.key)">
                    {{ column.name }}
                    <span v-if="sort[column.key]" class="icon">
                        <i v-if="sort[column.key] === 2" class="ion-md-arrow-round-up"></i>
                        <i v-else class="ion-md-arrow-round-down"></i>
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <td v-for="column in columns" :key="column.key">{{ getDisplayValue(row, column) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
const defaultFormatters = {
    isk: (value) => {
        return defaultFormatters.number(value);
    },
    number: (value) => {
        return Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value);
    },
    integer: (value) => {
        return Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(value);
    }
}

export default {
    name: "Table",
    props: ['columns', 'rows'],
    data: function() {
        return {
            sort: {},
        }
    },
    methods: {
        sortBy: function(columnKey) {
            if (this.sort[columnKey]) {
                this.rows.reverse();
                if (this.sort[columnKey] === 2) {
                    this.sort[columnKey] = 1;
                } else {
                    this.sort[columnKey] = 2;
                }
            } else {
                this.sort = {};

                this.rows.sort((rowA, rowB) => {
                    if (rowA[columnKey] < rowB[columnKey]) {
                        return 1;
                    } else if (rowA[columnKey] > rowB[columnKey]) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                this.sort[columnKey] = 1;
            }
        },
        getDisplayValue: function(row, column) {
            const value = row[column.key];
            if (column.formatter) {
                if (typeof column.formatter === 'function') {
                    return column.formatter(value);
                } else if (defaultFormatters[column.formatter]) {
                    return defaultFormatters[column.formatter](value);
                }
            }

            return value;
        }
    }
}
</script>
