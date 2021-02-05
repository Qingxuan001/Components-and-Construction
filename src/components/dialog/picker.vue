<template>
    <div class="hi-picker">
        <div class="hi-picker-wrapper" v-for="(item, i) in list" :key="i" ref="wrapper">
            <ul class="hi-wheel-scroll">
                <li
                    class="hi-wheel-item"
                    v-for="(v, index) in item.list"
                    :class="{
                        'hi-picker-selected': index === selectedIndex[i],
                        'hi-picker-sibling1': index + 2 === selectedIndex[i],
                        'hi-picker-sibling2': index + 1 === selectedIndex[i],
                        'hi-picker-sibling3': index - 1 === selectedIndex[i],
                        'hi-picker-sibling4': index - 2 === selectedIndex[i]
                    }"
                    :key="index"
                >
                    <span>{{v}}</span><span class="unit" v-if="index === selectedIndex[i] && item.text">{{item.text}}</span>
                </li>
            </ul>
            <div class="hi-picker-cutline">
                <div class="line top"></div>
                <div class="line bottom"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import Wheel from '@better-scroll/wheel';
BScroll.use(Wheel);

const arrMinLen = 180;

export default {
    name: 'HiPicker',
    props: {
        dateData: {
            type: Array,
            default: () => []
        },
        infinite: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            wheelArr: [],
            list: [],
            pickerDom: [],
            selectedIndex: []
        };
    },
    mounted () {
        this.$nextTick(() => {
            this.createWheel();
        });
    },
    methods: {
        getPickerData () {
            let arr = [];
            for (let i = 0; i < this.wheelArr.length; i++) {
                let index = this.wheelArr[i].getSelectedIndex();
                arr[i] = this.list[i].list[index];
            }
            return arr;
        },
        createWheel () {
            if (!this.list.length) return;
            let len = this.list.length;
            this.pickerDom = this.$refs.wrapper;
            this.setWheelMargin();
            for (let i = 0; i < len; i++) {
                if (!this.wheelArr[i]) {
                    this.wheelArr[i] = new BScroll(this.pickerDom[i], {
                        wheel: {
                            selectedIndex: this.list[i].initIndex || 0,
                            wheelWrapperClass: 'hi-wheel-scroll',
                            wheelItemClass: 'hi-wheel-item',
                            rotate: 0
                        },
                        useTransition: false,
                        probeType: 3,
                        deceleration: 0.01,
                        swipeTime: 200
                    });
                    this.$set(this.selectedIndex, i, this.list[i].initIndex || 0);
                    // this.wheelArr[i].on('scroll', () => {
                    //     this.$set(this.selectedIndex, i, this.wheelArr[i].getSelectedIndex());
                    // });
                    this.wheelArr[i].on('scrollStart', () => {
                        this.$set(this.selectedIndex, i, 0);
                    });
                    if (this.infinite) {
                        this.wheelArr[i].on('scrollEnd', () => {
                            let index = this.wheelArr[i].getSelectedIndex();
                            this.$set(this.selectedIndex, i, index);
                            let remainder = index % this.list[i].originaLen;
                            if (index < this.list[i].init || index > this.list[i].init + this.list[i].originaLen) {
                                this.wheelArr[i].wheelTo(remainder + this.list[i].init, 0);
                            }
                        });
                    }
                } else {
                    this.wheelArr[i].refresh();
                }
            }
        },
        setWheelMargin () {
            this.pickerDom.forEach(item => {
                if (!item.children[0]) return;
                let h = item.children[0].children && item.children[0].children[0] && item.children[0].children[0].offsetHeight;
                item.children[0].style.marginTop = `${2 * h}px`;
            });
        },
        handleInfiniteData (list) {
            let len = list.length;
            let _list = JSON.parse(JSON.stringify(list));
            for (let i = 0; i < len; i++) {
                let item = _list[i];
                let arr = item.list || [];
                let count = arr.length ? Math.ceil(arrMinLen / arr.length) : 0;
                count = count % 2 === 0 ? count + 1 : count;
                item.init = ((count - 1) / 2) * arr.length;
                item.initIndex = item.init + +(item.default || 0);
                item.originaLen = arr.length;
                item.list = [].concat.apply([], Array.apply(null, {length: count}).map(() => arr));
            }
            return _list;
        }
    },
    watch: {
        dateData: {
            handler: function (val) {
                let _val = val || [];
                this.list = this.infinite ? this.handleInfiniteData(_val) : _val;
            },
            immediate: true,
            deep: true
        }
    }
};
</script>

<style lang="less" scoped>
.hi-picker {
    display: flex;
    justify-content: space-between;
    .hi-picker-wrapper {
        flex: 1;
        height: 200/36rem;
        overflow: hidden;
        position: relative;
        .hi-wheel-item {
            height: 40/36rem;
            line-height: 36/36rem;
            font-size: 16/36rem;
            color: rgba(0, 0, 0, .6);
            display: flex;
            justify-content: center;
            span{
                display: block;
                line-height: 16/36rem;
                height: 16/36rem;
            }
            .unit {
                padding-left: 4/36rem;
            }
        }
        .hi-picker-selected {
            font-size: 18/36rem;
            color: #007DFF;
            align-items: center;
        }
        .hi-picker-sibling2, .hi-picker-sibling3 {
            color: rgba(0, 0, 0, .9);
        }
        .hi-picker-sibling1 {
            padding-top: 4/36rem;
        }
        .hi-picker-sibling3 {
            padding-top: 24/36rem;
        }
        .hi-picker-sibling4 {
            padding-top: 20/36rem;
        }
    }
    .hi-picker-cutline {
        height: 56/36rem;
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .line {
            width: 100%;
            height: 0.5/36rem;
            border-bottom: 0.25/36rem solid rgba(0, 0, 0, .2);
        }
    }
}
.theme-dark {
    .hi-picker {
        .hi-picker-wrapper {
            .hi-wheel-item {
                color: rgba(255, 255, 255, .6);
            }
            .hi-picker-sibling2, .hi-picker-sibling3 {
                color: rgba(255, 255, 255, .86);
            }
            .hi-picker-selected {
                color: #3F97E9;
            }
        }
        .hi-picker-cutline {
            .line {
                border-bottom: 0.25/36rem solid rgba(255, 255, 255, .2);
            }
        }
    }
}
</style>
