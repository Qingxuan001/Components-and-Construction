<template>
    <div class="page bg_F7F7F7">
        <hi-header
            title="首页"
            leftIcon="ic-back"
            rightIcon="ic-more"
            :showAppTitle="true"
            devType="2"
        ></hi-header>
        <hi-errtip tip="ssss"></hi-errtip>
        <main>
            <hi-product
                prdClass="ic-product"
                logoClass="ic-logo"
                :isWhitePrd="true"
            ></hi-product>
            <hi-card1
                leftTxt="已开启"
                midTxt="10:20:10"
                midMsg="倒计时关"
                rightIcon="ic-switch-on"
            ></hi-card1>
            <slider20
                leftTxt="亮度"
                unit="%"
                step="20"
                :percent="setSliderValue"
                @handleTouchEnd="getSliderValue($event)"
            ></slider20>
            <hi-card2
                class="mt8"
                leftTxt="在线"
                rightIcon="ic_dianliang"
                rightTxt="90%"
                rightTxt2="重新连接"
                status="2"
            ></hi-card2>
            <hi-card4 class="mt8" :cardData="cardData"></hi-card4>
            <hi-card3
                class="bg_card mt8"
                leftTxt="在线"
                rightIcon="ic_dianliang"
                leftMsg="111"
                needSwitch
                :selected="true"
            ></hi-card3>
            <hi-slider-card
                class="bg_card mt8"
                leftTxt="在线"
                :percent="percent"
                @sliderTouchEnd="sliderTouchEnd"
            ></hi-slider-card>
            <hi-card3
                class="bg_card mt8"
                leftTxt="在线"
                rightIcon="ic_dianliang"
                leftMsg="111"
                smallCard
                @cardClick="add"
            ></hi-card3>
            <hi-cardShift class="mt8" :shiftList="shiftTest"></hi-cardShift>
            <hi-button
                class="mt8"
                buttonText="添加"
                red
                @buttonClick="test"
            ></hi-button>
            <hi-time-item
                class="mt8"
                timeSelected="03:30"
                daySelected="啦啦啦,我是帅帅的小前端啦！"
                :listSwitch="listSwitch"
                @listSwitchClick="moretest()"
                @listClick="test"
            ></hi-time-item>
            <hi-range-card
                class="bg_card mt8"
                leftTxt="亮度"
                step="20"
                :percent="showVal"
                unit="%"
                @sliderTouchEnd="handleTouchEnd"
            ></hi-range-card>
            <hi-more-control class="mb8 mt8"></hi-more-control>
        </main>
    </div>
</template>

<script>
export default {
    data () {
        return {
            percent: '10',
            cardData: [
                {
                    name: '空气',
                    unit: '%',
                    num: '2',
                },
                {
                    name: '空气',
                    unit: '%',
                    num: '2',
                },
                {
                    name: '空气',
                    unit: '%',
                    num: '2',
                },
            ],
            shiftTest: [
                { name: '自动', selected: false },
                { name: '低速', selected: false },
                { name: '中速', selected: true },
                { name: '高速', selected: false },
            ],
            listSwitch: false,
            showVal: 60,
            setSliderValue: 20
        }
    },
    methods: {
        add () {
            this.$dialog({
                component: 'picker',
            })
        },
        sliderTouchEnd (val) {
            this.percent = val
        },
        test () {
            console.log('这是一个可爱的测试哦！！！')
        },
        moretest () {
            this.listSwitch = !this.listSwitch
            console.log('再来一个小可爱！！！', this.listSwitch)
        },
        handleTouchEnd (val) {
            this.showVal = val * 10
            console.log(this.showVal)
        },
        getSliderValue (e) {
            console.log('11111', e);
        }
    },
}
</script>

<style lang="less" scoped>
.page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    main {
        flex: 1;
        overflow-y: auto;
        padding: 0 16/36rem;
    }
    .mt8 {
        margin-top: 8/36rem;
    }
    .mb8 {
        margin-bottom: 8/36rem;
    }
}
</style>