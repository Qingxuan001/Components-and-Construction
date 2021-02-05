<template>
    <div class="hi-dialog" v-show="visible">
        <div class="mask" @click="close()"></div>
        <div class="container">
            <div class="content bgffffff">
                <div class="content-top" v-if="showTitle" :class="{'large-content-top': subTitle}">
                    <div class="title cb90">{{title}}</div>
                    <div class="sub-title cb60" v-if="subTitle">{{subTitle}}</div>
                </div>
                <div class="body cb90">
                    <Picker ref="picker" class="mtb8" v-if="component === 'picker' && visible" :dateData="pickList" :infinite="pickerInfinite"></Picker>
                </div>
                <div class="btns">
                    <div class="btn cancel bdr" v-if="showCancelBtn" :class="cancelBtnClass" @click="cancelBtnClick()">{{cancelBtnTxt}}</div>
                    <div class="btn confirm" v-if="showConfirmBtn" :class="confirmBtnClass" @click="confirmBtnClick()">{{confirmBtnTxt}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Picker from './picker.vue';
export default {
    name: 'HiDialog',
    data () {
        return {
            showTitle: true, // 显示弹窗头部
            visible: true, // 显示弹窗
            title: this.$t('dialog.title'), // 弹窗主标题
            subTitle: '', // 弹窗副标题
            showConfirmBtn: true, // 显示确认按钮
            showCancelBtn: true, // 显示取消按钮
            confirmBtnTxt: this.$t('dialog.confirm'), // 确认按钮文案 一个按钮时隐藏取消按钮
            cancelBtnTxt: this.$t('dialog.cancel'), // 取消按钮文案
            confirmBtnColor: '', // 确认按钮字体颜色类名
            cancelBtnColor: '', // 取消按钮字体颜色类名
            component: '', // 组件名称
            pickList: [ // 选择器参数
                {
                    list: new Array(24).fill(0).map((item, index) => index < 10 ? `0${index}` : `${index}`)
                },
                {
                    list: new Array(60).fill(0).map((item, index) => index < 10 ? `0${index}` : `${index}`)
                }
            ],
            pickerInfinite: true // 无限滚动
        };
    },
    methods: {
        close () {
            this.visible = false;
        },
        cancelBtnClick () {
            this.close();
            this.cancel && this.cancel();
        },
        confirmBtnClick () {
            this.close();
            let data;
            if (this.component === 'picker') {
                data = this.$refs.picker.getPickerData();
            }
            this.confirm && this.confirm(data);
        }
    },
    computed: {
        cancelBtnClass () {
            return this.cancelBtnColor ? this.cancelBtnColor : 'c007dff';
        },
        confirmBtnClass () {
            return this.confirmBtnColor ? this.confirmBtnColor : 'c007dff';
        }
    },
    components: {
        Picker
    }
};
</script>

<style lang="less" scoped>
.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .2);
}
.container {
    position: absolute;
    margin: 0 auto;
    bottom: 16/36rem;
    width: 100vw;
    padding: 0 16/36rem;
}
.content {
    border-radius: 16/36rem;
    font-size: 16/36rem;
}
.content-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 56/36rem;
    padding: 0 24/36rem;
}
.large-content-top {
    height: 72/36rem;
}
.title {
    font-size: 20/36rem;
    line-height: 20*1.33/36rem;
}
.sub-title {
    font-size: 14/36rem;
    line-height: 14*1.33/36rem;
    margin-top: 2/36rem;
}
.body {
    font-size: 16/36rem;
    line-height: 16*1.33/36rem;
    padding: 0 24/36rem;
}
.btns {
    display: flex;
    align-items: center;
    height: 56/36rem;
    padding: 0 12/36rem;
}
.btn {
    flex: 1;
    text-align: center;
    font-size: 16/36rem;
    line-height: 16*1.33/36rem;
}
.mb8 {
    margin-bottom: 8/36rem;
}
.mtb8 {
    margin: 8/36rem 0;
}
.cb90 {
    color: rgba(0, 0, 0, .9);
}
.cb60 {
    color: rgba(0, 0, 0, .6);
}
.c007dff {
    color: #007dff;
}
.cfa2a2d {
    color: #fa2a2d;
}
.bgffffff {
    background-color: #ffffff;
}
.bdr {
    border-right: 0.25/36rem solid rgba(0, 0, 0, .2);
}
.theme-dark {
    .cb90 {
        color: rgba(255, 255, 255, .86);
    }
    .cb60 {
        color: rgba(255, 255, 255, .60);
    }
    .c007dff {
        color: #3f97e9;
    }
    .cfa2a2d {
        color: #e64548;
    }
    .bgffffff {
        background-color: #262626;
    }
    .bdr {
        border-right: 0.25/36rem solid rgba(255, 255, 255, .2);
    }
}
</style>
