<template>
    <div class="market-details">
        <div class="tabs">
            <ul>
                <li class="is-active"><a>Orders</a></li>
                <li><a>Price History</a></li>
            </ul>
        </div>
        <div v-if="activeTab === 0" class="active-tab">
            <Table
                :columns='[
                    {
                        name: "Station",
                        key: "station"
                    },
                    {
                        name: "Price",
                        key: "price",
                        formatter: "isk"
                    },
                    {
                        name: "Volume",
                        key: "volumeRemaining",
                        formatter: "integer"
                    }
                ]'
                :rows="orders.sell"
            />
        </div>
        <div v-else class="active-tab">

        </div>
    </div>
</template>

<script>
import ESI from '../ESI';
import { getLocationNameForId } from '../Util';
import Table from './Table';

export default {
    name: "MarketTypeDetail",
    props: ["typeId"],
    data: function() {
        return {
            priceHistory: [],
            orders: {
                buy: [],
                sell: []
            },
            activeTab: 0
        };
    },
    created: function() {
        ESI.getRegionTypeMarketOrders(10000002, this.typeId).then((data) => {
            data.forEach((order) => {
                const newOrder = {
                    station: order.location_id,
                    volumeRemaining: order.volume_remain,
                    volume: order.volume_total,
                    price: order.price,
                    issued: order.issued,
                    duration: order.duration,
                    range: order.range,
                    id: order.order_id
                };

                getLocationNameForId(order.location_id).then((name) => {
                    newOrder.station = name;
                });

                if (order.is_buy_order) {
                    this.orders.buy.push(newOrder);
                } else {
                    this.orders.sell.push(newOrder);
                }
            })
        });
    },
    components: { Table }
}
</script>
