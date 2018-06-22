<template>
    <div class="market-details">
        <div class="tabs">
            <ul>
                <li :class="{'is-active': activeTab === 1}" @click="activeTab = 1"><a>Orders</a></li>
                <li :class="{'is-active': activeTab === 2}" @click="activeTab = 2"><a>Price History</a></li>
            </ul>
        </div>
        <div v-if="activeTab === 1" class="active-tab">
            <div class="content">
                <h4>Sell Orders</h4>
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
                <h4>Buy Orders</h4>
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
                            name: "Range",
                            key: "range"
                        },
                        {
                            name: "Volume",
                            key: "volumeRemaining",
                            formatter: "integer"
                        }
                    ]'
                    :rows="orders.buy"
                />
            </div>
        </div>
        <div v-else class="active-tab">
            <MarketHistoryChart :data="priceHistory" />
        </div>
    </div>
</template>

<script>
import ESI from '../ESI';
import { getLocationNameForId, formatOrderRange } from '../Util';
import Table from './Table';
import MarketHistoryChart from './charts/MarketHistoryChart';

export default {
    name: "MarketTypeDetail",
    props: ["typeId"],
    data: function() {
        return {
            priceHistory: [],
            priceHistoryWindowed: [],
            orders: {
                buy: [],
                sell: []
            },
            activeTab: 1
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
                    range: formatOrderRange(order.range),
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
            });
        });

        ESI.getRegionTypeMarketHistory(10000002, this.typeId).then((data) => {
            this.priceHistory.push(...data);
        });
    },
    components: { Table, MarketHistoryChart }
}
</script>
